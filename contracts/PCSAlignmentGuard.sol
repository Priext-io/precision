

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract PCSAlignmentGuard is AccessControl {
    using ECDSA for bytes32;

    struct PCSData {
        uint256 score;
        uint256 uncertainty;
        address feedSource;
        uint256 timestamp;
    }

    bytes32 private constant DOMAIN_TYPEHASH = keccak256(
        "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
    );
    bytes32 private DOMAIN_SEPARATOR;
    bytes32 public constant ORACLE_MANAGER_ROLE = keccak256("ORACLE_MANAGER_ROLE");

    mapping(bytes32 => uint256) public nonce;
    mapping(bytes32 => PCSData) public pcsData;
    mapping(address => bool) public authorizedOracles;
    mapping(address => uint256) public oracleIndex; // ✅ Index for bitmap
    address[] public oracleSet;

    uint256 public constant REQUIRED_SIGNATURES = 2; // ✅ 2-of-3 threshold

    event PCSUpdated(bytes32 indexed marketID, uint256 score, address feedSource);

    constructor(address[] memory _oracles) {
        DOMAIN_SEPARATOR = keccak256(abi.encode(
            DOMAIN_TYPEHASH,
            keccak256("PrecisionPCS"),
            keccak256("1"),
            block.chainid,
            address(this)
        ));
        for (uint256 i = 0; i < _oracles.length; i++) {
            require(_oracles[i] != address(0), "Invalid oracle");
            authorizedOracles[_oracles[i]] = true;
            oracleIndex[_oracles[i]] = i;
            oracleSet.push(_oracles[i]);
        }
        _grantRole(ORACLE_MANAGER_ROLE, msg.sender);
    }

    function rotateOracle(uint256 index, address newOracle) external onlyRole(ORACLE_MANAGER_ROLE) {
        require(index < oracleSet.length, "Invalid index");
        require(newOracle != address(0), "Invalid oracle");
        address oldOracle = oracleSet[index];
        authorizedOracles[oldOracle] = false;
        authorizedOracles[newOracle] = true;
        oracleIndex[oldOracle] = 0;
        oracleIndex[newOracle] = index;
        oracleSet[index] = newOracle;
    }

    function updatePCS(
        bytes32 marketID,
        uint256 score,
        uint256 uncertainty,
        address feedSource,
        uint256 deadline,
        uint8[] calldata v,
        bytes32[] calldata r,
        bytes32[] calldata s
    ) external {
        require(v.length == REQUIRED_SIGNATURES, "Require 2 signatures");
        require(block.timestamp <= deadline, "Signature expired");
        require(score <= 100, "Invalid score");

        bytes32 digest = keccak256(abi.encodePacked(
            "\x19\x01",
            DOMAIN_SEPARATOR,
            keccak256(abi.encode(
                keccak256("UpdatePCS(bytes32,uint256,uint256,address,uint256)"),
                marketID,
                score,
                uncertainty,
                feedSource,
                deadline
            ))
        ));

        uint256 signedBitmap;
        for (uint256 i = 0; i < REQUIRED_SIGNATURES; i++) {
            address signer = digest.recover(v[i], r[i], s[i]);
            require(authorizedOracles[signer], "Invalid oracle");
            uint256 index = oracleIndex[signer];
            require(index < oracleSet.length, "Invalid oracle index");
            require(signedBitmap & (1 << index) == 0, "Duplicate signer");
            signedBitmap |= (1 << index);
        }

        pcsData[marketID] = PCSData(score, uncertainty, feedSource, block.timestamp);
        emit PCSUpdated(marketID, score, feedSource);
    }

    function checkAlignment(bytes32 marketID, uint8 outcome) external view returns (bool) {
        require(outcome <= 2, "Invalid outcome");
        PCSData memory pcs = pcsData[marketID];
        require(pcs.score > 0, "Invalid PCS");
        if (uint256(outcome) == 1 && pcs.score < 30) return false;
        return true;
    }
}