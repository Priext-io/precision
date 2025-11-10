

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CESNToken is ERC20, AccessControl {
    bytes32 public constant TREASURY_ROLE = keccak256("TREASURY_ROLE");

    constructor(address treasury) ERC20("Precision", "CESN") {
        _grantRole(TREASURY_ROLE, treasury);
        _mint(msg.sender, 100_000_000 * 1e18); // 100M supply
    }

    function mint(address to, uint256 amount) external onlyRole(TREASURY_ROLE) {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}