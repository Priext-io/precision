
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract FinalityEngine is ReentrancyGuard, Pausable, AccessControl {
    enum Status { PENDING, FINALIZED, DISPUTED }
    enum Outcome { NO, YES, INVALID }

    address public disputeModule;
    BondEscrow public immutable bondEscrow;
    PCSAlignmentGuard public immutable pcsGuard;
    mapping(bytes32 => Status) public marketStatus;
    mapping(bytes32 => Outcome) public marketOutcome;
    mapping(bytes32 => uint256) public marketSize;
    mapping(bytes32 => uint256) public proposalTime;
    mapping(bytes32 => address) public challengers;
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    uint256 public constant BASE_LIVENESS = 24 hours;
    uint256 public constant DISPUTE_GRACE_PERIOD = 2 minutes;
    uint256 public constant MAX_MARKET_SIZE = 1_000_000 * 1e18; // 1M CESN

    event OutcomeProposed(bytes32 indexed marketID, address indexed proposer, Outcome outcome, uint256 marketSize);
    event OutcomeFinalized(bytes32 indexed marketID, Outcome outcome);
    event MarketDisputed(bytes32 indexed marketID, address indexed challenger);

    modifier onlyDisputeModule() {
        require(msg.sender == disputeModule, "Not dispute module");
        _;
    }

    constructor(address _bondEscrow, address _pcsGuard, address pauser) {
        require(_bondEscrow != address(0) && _pcsGuard != address(0), "Invalid");
        bondEscrow = BondEscrow(_bondEscrow);
        pcsGuard = PCSAlignmentGuard(_pcsGuard);
        _grantRole(PAUSER_ROLE, pauser);
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function setDisputeModule(address _disputeModule) external {
        require(disputeModule == address(0), "Already set");
        require(_disputeModule != address(0), "Invalid");
        disputeModule = _disputeModule;
    }

    function proposeOutcome(
        bytes32 marketID,
        Outcome outcome,
        uint256 bond,
        uint256 size
    ) external whenNotPaused nonReentrant {
        require(marketID != bytes32(0), "Invalid marketID");
        require(marketSize[marketID] == 0, "Market exists");
        require(size >= 1e18 && size <= MAX_MARKET_SIZE, "Invalid size");
        require(bond >= (size * 1) / 100, "Bond <1%");
        require(uint8(outcome) <= 2, "Invalid outcome");
        bondEscrow.depositProposerBond(marketID, bond);
        require(pcsGuard.checkAlignment(marketID, uint8(outcome)), "PCS misaligned");
        marketStatus[marketID] = Status.PENDING;
        marketOutcome[marketID] = outcome;
        marketSize[marketID] = size;
        proposalTime[marketID] = block.timestamp;
        emit OutcomeProposed(marketID, msg.sender, outcome, size);
    }

    function finalizeOutcome(bytes32 marketID) external whenNotPaused nonReentrant {
        require(marketStatus[marketID] == Status.PENDING, "Not pending");
        uint256 liveness = BASE_LIVENESS;
        if (marketSize[marketID] > 1e5 ether) liveness += 24 hours;
        require(block.timestamp >= proposalTime[marketID] + liveness + DISPUTE_GRACE_PERIOD, "Grace period active");
        marketStatus[marketID] = Status.FINALIZED;
        bondEscrow.releaseProposerBond(marketID);
        emit OutcomeFinalized(marketID, marketOutcome[marketID]);
    }

    function markAsDisputed(bytes32 marketID, address challenger) external onlyDisputeModule whenNotPaused {
        require(marketStatus[marketID] == Status.PENDING, "Not pending");
        marketStatus[marketID] = Status.DISPUTED;
        challengers[marketID] = challenger;
        emit MarketDisputed(marketID, challenger);
    }
}
