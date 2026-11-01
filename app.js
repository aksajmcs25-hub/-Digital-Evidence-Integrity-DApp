
const CONTRACT_ADDRESS = "0x0fF8b9411EDA054B86751F0AbDaDB4325CE4365B";

const SEPOLIA_CHAIN_ID = 11155111n;
const SEPOLIA_CHAIN_HEX = "0xaa36a7";

const CONTRACT_ABI = [
  "function registerEvidence(bytes32 fileHash) public",
  "function verifyEvidence(bytes32 fileHash) public view returns (bool)",
  "function getEvidence(bytes32 fileHash) public view returns (address, uint256, bool)"
];

let provider = null;
let signer = null;
let contract = null;

const connectButton = document.getElementById("connectWallet");
const walletAddress = document.getElementById("walletAddress");
const statusBox = document.getElementById("status");

function showStatus(message) {
  statusBox.textContent = message;
}

async function connectWallet() {
  try {
    if (typeof window.ethereum === "undefined") {
      showStatus(
        "MetaMask was not detected. Open this website in Chrome and enable the MetaMask extension."
      );
      return;
    }

    if (typeof ethers === "undefined") {
      showStatus(
        "The ethers.js library did not load. Check your internet connection and refresh the page."
      );
      return;
    }

    showStatus("Connecting to MetaMask...");

    // Ask the user to connect their wallet.
    await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    let currentChainId = await window.ethereum.request({
      method: "eth_chainId"
    });

    // Request a switch to Sepolia if another network is selected.
    if (currentChainId !== SEPOLIA_CHAIN_HEX) {
      showStatus("Please approve the switch to Sepolia in MetaMask.");

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_HEX }]
      });

      currentChainId = await window.ethereum.request({
        method: "eth_chainId"
      });
    }

    if (currentChainId !== SEPOLIA_CHAIN_HEX) {
      throw new Error("Please select Sepolia in MetaMask.");
    }

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    const address = await signer.getAddress();

    walletAddress.textContent = "Connected wallet: " + address;
    connectButton.textContent = "Wallet Connected";

    showStatus("Successfully connected to MetaMask on Sepolia!");

  } catch (error) {
    if (error.code === 4001) {
      showStatus("Connection or network switch was rejected in MetaMask.");
    } else if (error.code === 4902) {
      showStatus(
        "Sepolia is not available in MetaMask. Enable test networks and add Sepolia, then try again."
      );
    } else {
      showStatus(
        "Connection failed: " + (error.shortMessage || error.message)
      );
    }
  }
}

async function calculateFileHash(file) {
  const fileBuffer = await file.arrayBuffer();

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    fileBuffer
  );

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hashHex = hashArray
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");

  return "0x" + hashHex;
}

async function registerEvidence() {
  try {
    if (!contract) {
      showStatus("Please connect MetaMask first.");
      return;
    }

    const fileInput = document.getElementById("registerFile");
    const file = fileInput.files[0];

    if (!file) {
      showStatus("Please select a file to register.");
      return;
    }

    showStatus("Calculating the file's SHA-256 hash...");

    const fileHash = await calculateFileHash(file);

    showStatus(
      "File hash calculated:\n" + fileHash +
      "\nPlease confirm the registration transaction in MetaMask."
    );

    const transaction = await contract.registerEvidence(fileHash);

    showStatus("Transaction submitted. Waiting for blockchain confirmation...");

    const receipt = await transaction.wait();

    if (!receipt || receipt.status !== 1) {
      throw new Error("The blockchain transaction did not succeed.");
    }

    showStatus(
      "EVIDENCE REGISTERED SUCCESSFULLY!\n\n" +
      "File: " + file.name + "\n" +
      "SHA-256 hash: " + fileHash + "\n" +
      "Transaction: " + transaction.hash + "\n\n" +
      "Only the hash is stored on the blockchain."
    );

  } catch (error) {
    if (error.code === 4001) {
      showStatus("You rejected the registration transaction.");
    } else {
      showStatus(
        "Registration failed: " +
        (error.shortMessage || error.reason || error.message)
      );
    }
  }
}

async function verifyEvidence() {
  try {
    if (!contract) {
      showStatus("Please connect MetaMask first.");
      return;
    }

    const fileInput = document.getElementById("verifyFile");
    const file = fileInput.files[0];

    if (!file) {
      showStatus("Please select a file to verify.");
      return;
    }

    showStatus("Calculating the selected file's SHA-256 hash...");

    const fileHash = await calculateFileHash(file);

    const exists = await contract.verifyEvidence(fileHash);

    if (!exists) {
      showStatus(
        "NO MATCHING REGISTERED HASH FOUND.\n\n" +
        "File: " + file.name + "\n" +
        "SHA-256 hash: " + fileHash + "\n\n" +
        "This hash has not been registered in this contract."
      );
      return;
    }

    const record = await contract.getEvidence(fileHash);

    const registeredTime = new Date(
      Number(record[1]) * 1000
    ).toLocaleString();

    showStatus(
      "REGISTERED HASH FOUND!\n\n" +
      "File: " + file.name + "\n" +
      "SHA-256 hash: " + fileHash + "\n" +
      "Registered by: " + record[0] + "\n" +
      "Registration time: " + registeredTime + "\n" +
      "Record exists: " + record[2] + "\n\n" +
      "The file's hash matches a registered record."
    );

  } catch (error) {
    showStatus(
      "Verification failed: " +
      (error.shortMessage || error.reason || error.message)
    );
  }
}

// Connect the buttons to their functions.
connectButton.addEventListener("click", connectWallet);

document.getElementById("registerButton")
  .addEventListener("click", registerEvidence);

document.getElementById("verifyButton")
  .addEventListener("click", verifyEvidence);

// Handle network or account changes in MetaMask.
if (window.ethereum) {
  window.ethereum.on("chainChanged", () => {
    provider = null;
    signer = null;
    contract = null;
    walletAddress.textContent = "Wallet not connected";
    connectButton.textContent = "Connect MetaMask";
    showStatus("Network changed. Click Connect MetaMask again.");
  });

  window.ethereum.on("accountsChanged", () => {
    provider = null;
    signer = null;
    contract = null;
    walletAddress.textContent = "Wallet not connected";
    connectButton.textContent = "Connect MetaMask";
    showStatus("Account changed. Click Connect MetaMask again.");
  });
}
