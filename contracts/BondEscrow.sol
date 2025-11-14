// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract BondEscrow is ReentrancyGuard, Pausable, AccessControl {
    IERC20 public immutable cesnToken;
    address public finalityEngine;        // ✅ Removed immutable
    address public disputeModule;         // ✅ Removed immutable
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    struct MarketBonds {
        address proposer;
        uint256 proposerBond;
        address challenger;
        uint256 challengerBond;
        bool finalized;
    }

    mapping(bytes32 => MarketBonds) public marketBonds;
    mapping(bytes32 => uint256) public finalizationTime;

    event BondDeposited(bytes32 indexed marketID, address sender, uint256 amount, bool isChallenger);
    event BondReleased(bytes32 indexed marketID, address recipient, uint256 amount);
    event MarketCleanup(bytes32 indexed marketID);

    constructor(address _cesnToken, address _finalityEngine, address _disputeModule, address pauser) {
        require(_cesnToken != address(0) && _finalityEngine != address(0) && _disputeModule != address(0), "Invalid");
        cesnToken = IERC20(_cesnToken);
        finalityEngine = _finalityEngine;
        disputeModule = _disputeModule;
        _grantRole(PAUSER_ROLE, pauser);
    }

    // ✅ NEW: Setter functions (only admin, only once)
    function setFinalityEngine(address _finalityEngine) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(finalityEngine == address(0), "Already set");
        require(_finalityEngine != address(0), "Invalid address");
        finalityEngine = _finalityEngine;
    }

    function setDisputeModule(address _disputeModule) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(disputeModule == address(0), "Already set");
        require(_disputeModule != address(0), "Invalid address");
        disputeModule = _disputeModule;
    }

    modifier onlyAuthorized() {
        require(
            msg.sender == finalityEngine || 
            msg.sender == disputeModule,
            "Unauthorized"
        );
        _;
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function depositProposerBond(bytes32 marketID, uint256 amount) external onlyAuthorized whenNotPaused nonReentrant {
        require(marketID != bytes32(0), "Invalid marketID");
        require(amount > 0, "Amount must be positive");
        require(marketBonds[marketID].proposer == address(0), "Proposer exists");
        require(cesnToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        marketBonds[marketID] = MarketBonds(msg.sender, amount, address(0), 0, false);
        emit BondDeposited(marketID, msg.sender, amount, false);
    }

    function depositChallengerBond(bytes32 marketID, uint256 amount) external onlyAuthorized whenNotPaused nonReentrant {
        require(marketID != bytes32(0), "Invalid marketID");
        require(amount > 0, "Amount must be positive");
        MarketBonds storage bonds = marketBonds[marketID];
        require(bonds.challenger == address(0), "Challenger exists");
        require(bonds.proposer != address(0), "No proposer");
        require(cesnToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        bonds.challenger = msg.sender;
        bonds.challengerBond = amount;
        emit BondDeposited(marketID, msg.sender, amount, true);
    }

    function releaseProposerBond(bytes32 marketID) external onlyAuthorized whenNotPaused nonReentrant returns (uint256) {
        MarketBonds storage bonds = marketBonds[marketID];
        require(bonds.proposer != address(0), "No proposer");
        require(!bonds.finalized, "Already finalized");
        bonds.finalized = true;
        finalizationTime[marketID] = block.timestamp;
        uint256 amount = bonds.proposerBond;
        cesnToken.transfer(bonds.proposer, amount);
        emit BondReleased(marketID, bonds.proposer, amount);
        return amount;
    }

    function slashAndTransfer(
        bytes32 marketID,
        address winner,
        uint256 slashAmount
    ) external onlyAuthorized whenNotPaused nonReentrant returns (uint256) {
        MarketBonds storage bonds = marketBonds[marketID];
        uint256 maxSlash = bonds.proposerBond + bonds.challengerBond;
        require(slashAmount <= maxSlash, "Slash exceeds deposits");
        require(slashAmount > 0, "Invalid slash amount");
        require(bonds.challenger != address(0), "Not disputed");
        require(!bonds.finalized, "Already finalized");
        
        bonds.finalized = true;
        finalizationTime[marketID] = block.timestamp;
        delete marketBonds[marketID];
        
        cesnToken.transfer(winner, slashAmount);
        emit BondReleased(marketID, winner, slashAmount);
        return slashAmount;
    }

    function cleanupMarket(bytes32 marketID) external {
        require(finalizationTime[marketID] != 0, "Market not finalized");
        require(block.timestamp > finalizationTime[marketID] + 30 days, "Too early");
        delete finalizationTime[marketID];
        emit MarketCleanup(marketID);
    }
}