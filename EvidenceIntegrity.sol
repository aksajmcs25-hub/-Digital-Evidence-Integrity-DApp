
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EvidenceIntegrity {

    // Structure to store evidence information
    struct Evidence {
        address registeredBy;
        uint256 timestamp;
        bool exists;
    }

    // Mapping to store evidence records using file hashes
    mapping(bytes32 => Evidence) private evidenceRecords;

    // Event emitted when evidence is registered
    event EvidenceRegistered(
        bytes32 indexed fileHash,
        address indexed registeredBy,
        uint256 timestamp
    );

    // Function to register digital evidence
    function registerEvidence(bytes32 fileHash) public {
        require(fileHash != bytes32(0), "Invalid file hash");

        require(
            !evidenceRecords[fileHash].exists,
            "Evidence already registered"
        );

        evidenceRecords[fileHash] = Evidence({
            registeredBy: msg.sender,
            timestamp: block.timestamp,
            exists: true
        });

        emit EvidenceRegistered(
            fileHash,
            msg.sender,
            block.timestamp
        );
    }

    // Function to verify whether evidence is registered
    function verifyEvidence(bytes32 fileHash)
        public
        view
        returns (bool)
    {
        return evidenceRecords[fileHash].exists;
    }

    // Function to retrieve evidence registration details
    function getEvidence(bytes32 fileHash)
        public
        view
        returns (address, uint256, bool)
    {
        Evidence memory record = evidenceRecords[fileHash];

        return (
            record.registeredBy,
            record.timestamp,
            record.exists
        );
    }
}
