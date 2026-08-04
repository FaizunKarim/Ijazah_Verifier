# 🎓 Ijazah Verifier - On-Chain Diploma Verification DApp

**Ijazah Verifier** is a decentralized application (DApp) built on **BOT Chain Mainnet (EVM)** that enables educational institutions to issue tamper-proof diploma records on-chain while allowing anyone (employers, HRDs, alumni, and the public) to instantly verify their authenticity without requiring a crypto wallet.

---

## 📌 Problem & Solution

* **The Problem:** Traditional diploma verification relies on centralized university databases, physical certificates susceptible to forgery, and slow manual background checks.
* **The Solution:** By recording diploma issuance immutably onto the **BOT Chain Smart Contract**, diplomas become permanent, instantly verifiable, and 100% tamper-proof.

---

## ✨ Features

### 🔍 For Public Users & Employers (No Wallet Required)
* **Instant On-Chain Verification:** Input a 12-digit Diploma ID (e.g., `IDN-8492-3019`).
* **Official Digital Diploma Certificate View:** Renders an elegant academic certificate format with double gold border styling, smart degree positioning (e.g., `Ir. Joko Widodo` or `Joko Widodo, S.Hut.`), and an on-chain verification stamp.
* **Print & Export PDF:** Built-in PDF print stylesheet (`@media print`) allowing users to download or print clean, standalone official digital diploma certificates.
* **Direct Explorer Verification:** Direct link to inspect the deployed smart contract on BOT Chain Explorer (`https://scan.botchain.ai/address/0x9513aCa0BaFAdD3fB9E8eDE9550352F2E3b9a053`).

### 🛡️ For Educational Institutions (Admin / Contract Owner)
* **Secure Dual-Layer Authentication (`onlyOwner` + Passkey):** Access requires both the contract owner's wallet address and the admin passkey (`PASSKEY`).
* **Auto-Generated Locked Diploma ID:** System automatically generates unique 12-character numeric IDs (`IDN-XXXX-XXXX`), locked against manual editing and guaranteed duplicate-free.
* **Automatic MetaMask Network Switcher:** Automatically prompts MetaMask to switch to **BOT Chain Mainnet (Chain ID 677)** with native **BOT Token** gas fee.
* **On-Chain Event Filter & Local Storage Sync:** Real-time synchronization of `DiplomaIssued` events and `getAllDiplomaNumbers()` with LocalStorage fallback, ensuring issued records never disappear on refresh.

---

## 🛠️ Smart Contract Details

* **File Path:** [`IjazahVerifier.sol`](./IjazahVerifier.sol)
* **Solidity Version:** `^0.8.20`
* **Deployed Contract Address:** [`0x9513aCa0BaFAdD3fB9E8eDE9550352F2E3b9a053`](https://scan.botchain.ai/address/0x9513aCa0BaFAdD3fB9E8eDE9550352F2E3b9a053)
* **Target Blockchain:** BOT Chain Mainnet (EVM)
  * **Chain ID:** `677` (`0x2A5`)
  * **RPC URL:** `https://rpc.botchain.ai`
  * **Block Explorer:** `https://scan.botchain.ai`

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

* **Frontend Framework:** Next.js 16 (App Router, TypeScript)
* **Styling & Design System:** Tailwind CSS, Lucide Icons, Canvas Confetti
* **Blockchain Interoperability:** ethers.js v6
* **Smart Contract:** Solidity `^0.8.20`, Remix IDE
* **Network:** BOT Chain Mainnet (EVM Compatible)

---

## 🚀 Getting Started Locally

### Prerequisites
* Node.js v18.x or higher
* npm or yarn

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Ijazah_Verifier.git
   cd Ijazah_Verifier
   ```

2. **Configure Environment Variables (`.env.local`):**
   ```env
   CONTRACT_ADDRESS=0x9513aCa0BaFAdD3fB9E8eDE9550352F2E3b9a053
   PASSKEY=Izunkarim1
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
