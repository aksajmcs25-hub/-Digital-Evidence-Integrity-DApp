# Digital Evidence Integrity

### Blockchain-Based Evidence Verification System

## 1. Project Description

Digital Evidence Integrity is a decentralized application (DApp) developed to protect the integrity of digital evidence using blockchain technology.

The system generates a unique SHA-256 cryptographic hash for a digital file and stores that hash on the Ethereum Sepolia test network through a smart contract.

When the same file is uploaded again for verification, the application generates its hash and compares it with the hash registered on the blockchain. If both hashes match, the evidence is considered unchanged. If the file has been modified, the hash will be different.

**Important:** Original files remain on the user's device. Only their cryptographic hashes are stored on the blockchain.

## 2. Project Objectives

- To maintain the integrity of digital evidence.
- To generate unique SHA-256 hashes for digital files.
- To store evidence hashes securely on the blockchain.
- To verify whether a digital file has been modified.
- To demonstrate the use of blockchain technology in digital evidence management.

## 3. Features

- **SHA-256 Hash Generation:** Generates a cryptographic fingerprint for uploaded files.
- **MetaMask Wallet Connection:** Allows users to connect their Ethereum wallet.
- **Evidence Registration:** Registers the file hash on the Ethereum blockchain.
- **Evidence Verification:** Checks whether a file's hash matches a previously registered hash.
- **Blockchain-Based Storage:** Stores evidence hashes on the Sepolia test network.
- **File Privacy:** Original files are not uploaded to the blockchain.
- **Transaction Confirmation:** Uses MetaMask to approve blockchain transactions.

## 4. Technologies Used

| Technology         | Purpose                                    |
| ------------------ | ------------------------------------------ |
| HTML               | Frontend structure                         |
| CSS                | User interface and styling                 |
| JavaScript         | Frontend functionality                     |
| Solidity           | Smart contract development                 |
| Ethereum Sepolia   | Blockchain test network                    |
| Remix IDE          | Smart contract compilation and deployment  |
| MetaMask           | Wallet connection and transaction approval |
| Ethers.js v6       | Frontend-to-blockchain communication       |
| SHA-256            | Digital file hashing                       |
| Python HTTP Server | Local frontend hosting                     |

## 5. Smart Contract Details

- **Contract Name:** EvidenceIntegrity
- **Solidity File:** `EvidenceIntegrity.sol`
- **Network:** Ethereum Sepolia Testnet
- **Chain ID:** `11155111`
- **Contract Address:** `0x0fF8b9411EDA054B86751F0AbDaDB4325CE4365B`

### Smart Contract Functions

| Function                             | Description                                          |
| ------------------------------------ | ---------------------------------------------------- |
| `registerEvidence(bytes32 fileHash)` | Registers a digital evidence hash on the blockchain. |
| `verifyEvidence(bytes32 fileHash)`   | Checks whether the hash is registered.               |
| `getEvidence(bytes32 fileHash)`      | Retrieves the evidence registration details.         |

## 6. Steps to Deploy the Smart Contract

1. Open [Remix IDE](https://remix.ethereum.org/).
2. Create a new Solidity file named `EvidenceIntegrity.sol`.
3. Copy the smart contract source code into the file.
4. Open the Solidity Compiler section.
5. Select the compatible Solidity compiler version.
6. Click **Compile EvidenceIntegrity.sol**.
7. Open the **Deploy & Run Transactions** section.
8. Connect MetaMask using the **Browser Extension** environment.
9. Select the **Sepolia Test Network** in MetaMask.
10. Select the `EvidenceIntegrity` contract.
11. Click **Deploy** and confirm the transaction in MetaMask.
12. After deployment, copy the deployed contract address and configure it in the frontend `app.js` file.

**Note:** The contract used for this project has already been deployed on Sepolia. The address above refers to the deployed project contract.

## 7. Steps to Run the Frontend

### Prerequisites

- A web browser such as Google Chrome.
- MetaMask browser extension.
- Sepolia test network configured in MetaMask.
- Python installed.

### Execution Steps

1. Clone or download this GitHub repository.
2. Open the project folder in Visual Studio Code.
3. Make sure the frontend files are present:
   - `index.html`
   - `dashboard.html`
   - `style.css`
   - `app.js`
4. Open the VS Code terminal.
5. Navigate to the project directory.
6. Start the local Python HTTP server:

```bash
python -m http.server 8000
```

7. Open your browser and visit:

```text
http://localhost:8000/index.html
```

8. Connect your MetaMask wallet.
9. Make sure MetaMask is connected to the **Sepolia Test Network**.
10. Select a digital evidence file to register or verify.
11. Approve the registration transaction in MetaMask when prompted.

## 8. How the Application Works

### Evidence Registration

1. The user selects a digital file.
2. The application generates its SHA-256 hash.
3. The hash is converted into the required format for the smart contract.
4. The user approves the transaction through MetaMask.
5. The smart contract records the hash on the Sepolia blockchain.

### Evidence Verification

1. The user selects the file for verification.
2. The application generates its SHA-256 hash again.
3. The hash is checked against the blockchain record.
4. If the hash is registered, the application displays a successful match.
5. If the file has been modified, its hash will differ and verification will fail.

## 9. Testing

The application was tested using a sample file named `evidence.txt`.

| Test Case                    | Expected Result                   |
| ---------------------------- | --------------------------------- |
| Register a new evidence file | Hash successfully registered      |
| Verify the original file     | Matching registered hash found    |
| Modify the original file     | No matching registered hash found |
| Verify an unregistered file  | No matching registered hash found |

These tests demonstrate that even a small modification to a file produces a different SHA-256 hash.

## 10. Application Screenshot

The screenshots contains the user interface of the Digital Evidence Integrity application.



## 11. Advantages

- Helps detect unauthorized modifications to digital files.
- Provides blockchain-based, publicly verifiable hash records.
- Keeps original evidence files on the user's device.
- Demonstrates a practical application of blockchain technology.
- Provides a simple interface for registering and verifying evidence.

## 12. Limitations

- The application records file hashes, not the original files.
- Verification confirms whether a file matches a registered hash; it does not independently prove the file's authenticity, authorship, or legal admissibility.
- The application currently uses the Sepolia test network, not Ethereum mainnet.
- Blockchain transactions require test ETH for gas fees.

## 13. Future Enhancements

- Add evidence search and history features.
- Support multiple file formats.
- Improve evidence metadata management.
- Add downloadable verification reports.
- Extend the application to other Ethereum-compatible networks.

## 14. Conclusion

Digital Evidence Integrity demonstrates how blockchain technology and cryptographic hashing can be combined to protect the integrity of digital evidence.

By storing SHA-256 hashes on the Ethereum Sepolia test network, the application provides a way to check whether a digital file has remained unchanged since its hash was registered.

The project demonstrates the practical use of smart contracts, decentralized applications, MetaMask, and cryptographic hashing in digital evidence integrity verification.

---

**Project:** Digital Evidence Integrity
**Blockchain Network:** Ethereum Sepolia Testnet
**Smart Contract:** EvidenceIntegrity
**Contract Address:** `0x0fF8b9411EDA054B86751F0AbDaDB4325CE4365B`
