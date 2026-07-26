# 🎓 Ijazah Verifier - On-Chain Diploma Verification DApp

**Ijazah Verifier** is a decentralized application (DApp) built on **BOT Chain (EVM)** that enables educational institutions to issue tamper-proof diploma records on-chain while allowing anyone (employers, HRDs, alumni, and the public) to instantly verify their authenticity without requiring a crypto wallet.

---

## 📌 Problem & Solution

* **The Problem:** Traditional diploma verification relies on centralized university databases, physical certificates susceptible to forgery, and slow manual background checks.
* **The Solution:** By recording diploma issuance immutably onto the **BOT Chain Smart Contract**, diplomas become permanent, instantly verifiable, and 100% tamper-proof.

---

## ✨ Features

### 🔍 For Public Users & Employers (No Wallet Required)
* **Instant Verification:** Input a Diploma ID (e.g., `IJZ-2026-001`) or click the quick sample option.
* **On-Chain Truth:** View complete student metadata (Name, Major, Degree, Graduation Year, Issue Timestamp, Issuer Wallet Address).
* **Block Explorer Link:** Directly verify the transaction on the BOT Chain Block Explorer (`scan.bohr.life`).

### 🛡️ For Educational Institutions (Admin / Contract Owner)
* **Secure Access Control (`onlyOwner`):** Only the wallet that deployed the Smart Contract can issue diplomas.
* **Issue New Diploma:** Intuitive 2-column form for registering student diploma records directly to the blockchain.
* **Issued Diploma Dashboard:** Interactive table showing all registered on-chain records.
* **Dual Wallet Connection:** Automatic MetaMask detection + manual Wallet Address input field.

---

## 🛠️ Smart Contract Details

* **File Path:** [`IjazahVerifier.sol`](./IjazahVerifier.sol)
* **Solidity Version:** `^0.8.20`
* **Target Blockchain:** BOT Chain (EVM)
  * **Testnet Chain ID:** `968` | RPC: `https://rpc.bohr.life` | Explorer: `https://scan.bohr.life`
  * **Mainnet Chain ID:** `677` | RPC: `https://rpc.botchain.ai` | Explorer: `https://scan.botchain.ai`

### Core Smart Contract Data Structure & Functions

```solidity
struct Diploma {
    string diplomaNumber;
    string studentName;
    string major;
    string degree;
    uint16 graduationYear;
    uint256 issueDate;
    address issuer;
    bool isValid;
}

// Key Functions
function issueDiploma(string diplomaNumber, string studentName, string major, string degree, uint16 graduationYear) public onlyOwner
function verifyDiploma(string diplomaNumber) public view returns (bool isValid, string studentName, string major, string degree, uint16 graduationYear, uint256 issueDate, address issuer)
function getDiploma(string diplomaNumber) public view returns (Diploma memory)
function getAllDiplomaNumbers() public view returns (string[] memory)
```

---

## 💻 Tech Stack

* **Frontend Framework:** Next.js 15 (App Router, TypeScript)
* **Styling & Design System:** Tailwind CSS v3, Lucide Icons, Custom 3D Glassmorphism
* **Blockchain Interoperability:** ethers.js v6
* **Smart Contract:** Solidity `^0.8.20`, Remix IDE
* **Network:** BOT Chain Testnet / Mainnet (EVM Compatible)

---

## 🚀 Getting Started Locally

### Prerequisites
* Node.js v18.x or higher
* npm or yarn
* MetaMask Wallet Extension (Optional for Admin testing)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Ijazah_Verifier.git
   cd Ijazah_Verifier
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the live application.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
