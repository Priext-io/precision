
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract DisputeModule is ReentrancyGuard, Pausable, AccessControl {
    FinalityEngine public immutable finalityEngine;
    BondEscrow public immutable bondEscrow;
    PCSAlignmentGuard public immutable pcsGuard;
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    mapping(bytes32 => uint256) public disputeStartTime;
    uint256 public constant RESOLUTION_WINDOW = 7 days;

    event OutcomeDisputed(bytes32 indexed marketID, address indexed challenger, address indexed proposer, uint256 bond, uint256 marketSize);
    event SlashingExecuted(bytes32 indexed marketID, address indexed winner, address indexed loser, uint256 amount);

    constructor(
        address _finalityEngine,
        address _bondEscrow,
        address _pcsGuard,
        address pauser
    ) {
        require(_finalityEngine != address(0) && _bondEscrow != address(0) && 
                _pcsGuard != address(0), "Invalid");
        finalityEngine = FinalityEngine(_finalityEngine);
        bondEscrow = BondEscrow(_bondEscrow);
        pcsGuard = PCSAlignmentGuard(_pcsGuard);
        _grantRole(PAUSER_ROLE, pauser);
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function disputeOutcome(bytes32 marketID, uint256 bond) external whenNotPaused nonReentrant {
        require(finalityEngine.marketStatus(marketID) == FinalityEngine.Status.PENDING, "Not disputable");
        uint256 proposerBond = bondEscrow.marketBonds(marketID).proposerBond;
        require(proposerBond <= type(uint256).max / 2, "Proposer bond too large");
        require(bond >= proposerBond * 2, "Bond <2x");
        require(bond > 0, "Invalid bond");
        bondEscrow.depositChallengerBond(marketID, bond);
        disputeStartTime[marketID] = block.timestamp;
        finalityEngine.markAsDisputed(marketID, msg.sender);
        emit OutcomeDisputed(
            marketID, 
            msg.sender, 
            bondEscrow.marketBonds(marketID).proposer,
            bond, 
            finalityEngine.marketSize(marketID)
        );
    }

    function executeSlashing(bytes32 marketID, bool proposerWasWrong) external whenNotPaused nonReentrant {
        require(finalityEngine.marketStatus(marketID) == FinalityEngine.Status.DISPUTED, "Not disputed");
        require(msg.sender == finalityEngine.challengers(marketID), "Not the challenger");
        require(block.timestamp >= disputeStartTime[marketID] + RESOLUTION_WINDOW, "Resolution period active");

        address proposer = bondEscrow.marketBonds(marketID).proposer;
        address winner = proposerWasWrong ? msg.sender : proposer;
        address loser = proposerWasWrong ? proposer : msg.sender;

        uint256 baseAmount = proposerWasWrong ? 
            bondEscrow.marketBonds(marketID).proposerBond : 
            bondEscrow.marketBonds(marketID).challengerBond;

        require(baseAmount <= type(uint256).max / 3, "Amount too large");

        uint256 slashAmount = baseAmount;
        if (pcsGuard.pcsData(marketID).score < 30) {
            slashAmount = (baseAmount * 3) / 2; // +50%
        }

        bondEscrow.slashAndTransfer(marketID, winner, slashAmount);
        emit SlashingExecuted(marketID, winner, loser, slashAmount);
    }
}