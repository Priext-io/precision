 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CESNStaking is ReentrancyGuard {
    IERC20 public immutable cesnToken;
    mapping(address => uint256) public stakes;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    constructor(address _cesnToken) {
        cesnToken = IERC20(_cesnToken);
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount > 0");
        cesnToken.transferFrom(msg.sender, address(this), amount);
        stakes[msg.sender] += amount;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external nonReentrant {
        require(stakes[msg.sender] >= amount, "Insufficient stake");
        stakes[msg.sender] -= amount;
        cesnToken.transfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }
}