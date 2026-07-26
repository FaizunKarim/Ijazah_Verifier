Hackathon Guidebook. BOTChain Build Week

Welcome to the Build Week Hackathon! The goal is simple: Build something real. Deploy it. Let people use it.

Timeline Registration Opens Wednesday, July 15, 2026 Registration Closes
Wednesday, July 29, 2026 Building Starts Thursday, July 30, 2026
Building Ends Sunday, August 2, 2026 Submission Deadline Tuesday, August
4, 2026 --- 11:59 PM Winners Announced Thursday, August 6, 2026 Rules &
Eligibility Team Size: 1 - 3 people. You can go solo or form a team.
Chain: BOT Chain (EVM). All smart contracts must be deployed on the BOT
Chain testnet/mainnet. Cost: 100% Free. AI Tools: Allowed! Claude,
ChatGPT, Cursor --- use whatever helps. Paste error messages and ask for
fixes. Vibe code the whole thing if you want. The only requirement is
that it works and you can explain what it does in your demo. What You
Are Building A DApp (Decentralized Application) in plain language has
two parts that work together:

Smart Contract: The rules of who can do what. It holds BOT or data
on-chain. Written in Solidity. Deployed once via Remix IDE. It cannot be
faked or changed. Frontend (Website): The page people see and use.
Buttons, layout, your design. One HTML file is enough! Hosted on GitHub
Pages and served from your own live domain (a cheap \$1 -- \$1.50 one is
fine --- we reimburse it), and it connects to MetaMask. Submission
Requirements Submit all four items via the submission form by 11:59 PM
on August 4. If any item is missing your project will not be judged. No
late submissions accepted.

Contract Address: Your deployed smart contract address on BOT Chain.
Example: 0xAbC123... Judges will check it on the block explorer to
confirm it is real and has on-chain activity. Live Website Link: Your
project must run on a live domain --- it doesn't have to be a .com, any
live domain works. Choose one in the \$1 -- \$1.50 range (plenty of
registrars offer first-year domains this cheap), and we'll reimburse
your purchase once you've submitted. Judges will open this link and try
to connect their wallet and interact with your project during
evaluation. GitHub Repository: Must contain your .sol contract file and
a README.md written in plain English explaining what your project does
and how someone would use it. X Post: Post and share your project on X
and tag @BOTChain_ai. Show what you built --- a short clip or
screenshots of your live page work great. Paste the link to your post in
the submission form. What We Look For You do not need a perfect project.
One feature done well beats five features that are broken. Judges open
your link and try to use it --- if the main action works, you are in
good shape.

Good --- Will be judged One feature that works completely end to end
Project shared on X with @BOTChain_ai tagged README explains the project
clearly Can demo it live without it breaking Submitted before the 11:59
PM deadline Not Acceptable --- Disqualified Contract deployed but
frontend does not connect No X post sharing your project No frontend at
all (Remix is not a product) Copied project with zero changes or
explanation Submitted after the deadline Judging Criteria Contract
deployed and working on BOT Chain 35 pts Anyone can connect wallet and
the main action works 30 pts Use case clarity and originality 20 pts X
post --- project shared with @BOTChain_ai tagged 15 pts TOTAL 100 pts
Day 1 Guide --- Step by Step The full guide: from MetaMask to BOT Chain
Mainnet smart contract deployment --- a complete, general-purpose
walkthrough to go from zero to a deployed smart contract on BOT Chain
Mainnet.

Good to know --- BOT Chain is EVM-compatible, so this workflow is nearly
identical to a standard Ethereum deployment. The main differences are
the network details (Chain ID, RPC URL, explorer) and the native token
(BOT instead of ETH). BOTChain full documentation here Phase 1 ---
Install & Set Up MetaMask (or BO Wallet) Step 1: Install a Wallet
MetaMask: go to metamask.io → Click "Download" → choose your browser
(Chrome, Firefox, Brave, Edge) → "Add to Chrome" (or your browser) →
"Add Extension" BO Wallet (BOT Chain's native wallet): go to
wallet.bohr.life and follow the install instructions there The wallet
icon will appear in your browser toolbar Step 2: Create a New Wallet
Click the wallet icon → "Get Started" Choose "Create a new wallet" Agree
to the terms Create a strong password (used to unlock the app locally)
CRITICAL --- Write down your Secret Recovery Phrase (12 words) on paper
Never store it digitally Never share it with anyone This is the only way
to recover your wallet Confirm the phrase by selecting words in order →
Click "Confirm" Your wallet is now created Caution --- Your Secret
Recovery Phrase = full access to your funds. Losing it = losing
everything. Store it offline, physically. Phase 2 --- Add BOT Chain
Testnet Step 3: Add BOT Chain Testnet Manually We test on testnet first
before spending real BOT on mainnet.

Open MetaMask → Click the network dropdown (top left) Click "Add a
network" → "Add a network manually" Fill in these details: Field Value
Network Name BOT Chain Testnet New RPC URL https://rpc.bohr.life Chain
ID 968 Currency Symbol BOT Block Explorer URL https://scan.bohr.life/
Click "Save" → Switch to BOT Chain Testnet.

Phase 3 --- Get Testnet BOT (Faucet) Step 4: Get Free Testnet BOT You
need BOT to pay for gas (transaction fees), even on testnet.

Copy your wallet address from MetaMask (click your account name at the
top) Go to the official BOT Chain testnet faucet:
faucet.botchain.ai/basic Paste your wallet address → request test BOT
Wait 1--2 minutes → Check your wallet balance Note --- Faucet tokens
have no real value. They're for testing only. Phase 4 --- Write Your
Smart Contract in Remix Step 5: Open Remix IDE Go to remix.ethereum.org
--- since BOT Chain is EVM-compatible, Remix works exactly as it does
for Ethereum.

Step 6: Create Your Contract File In the file explorer, click the "+"
icon to create a new file Name it something like MyCertificate.sol Write
your Solidity smart contract. Example: // SPDX-License-Identifier: MIT
pragma solidity \^0.8.20;

contract MyCertificate { address public owner;

    struct Certificate {
        string recipientName;
        string courseName;
        uint256 issueDate;
        bool isValid;
    }

    mapping(bytes32 => Certificate) public certificates;

    event CertificateIssued(bytes32 indexed certId, string recipientName);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function issueCertificate(
        bytes32 certId,
        string memory recipientName,
        string memory courseName
    ) public onlyOwner {
        certificates[certId] = Certificate(
            recipientName,
            courseName,
            block.timestamp,
            true
        );
        emit CertificateIssued(certId, recipientName);
    }

    function verifyCertificate(bytes32 certId) public view returns (bool) {
        return certificates[certId].isValid;
    }

} Step 7: Compile the Contract Click the "Solidity Compiler" icon (left
sidebar --- looks like `<S>`{=html}) Select compiler version matching
your pragma (e.g., 0.8.20) Click "Compile MyCertificate.sol" Green
checkmark = compiled successfully Red = fix the errors shown below Phase
5 --- Deploy to BOT Chain Testnet Step 8: Connect Remix to Your Wallet
Click the "Deploy & Run Transactions" icon (left sidebar) Under
"Environment", select "Injected Provider - MetaMask" Your wallet will
pop up → Click "Connect" → Select your account → "Next" → "Connect" You
should see your wallet address and testnet BOT balance in Remix Step 9:
Deploy to BOT Chain Testnet Make sure BOT Chain Testnet (Chain ID 968)
is selected in your wallet In Remix, under "Contract", select your
compiled contract Click the orange "Deploy" button Your wallet will pop
up showing the transaction → Review gas fees (paid in BOT) → Click
"Confirm" Wait for confirmation Your contract address appears in Remix
under "Deployed Contracts" Step 10: Verify on Testnet Explorer Copy the
deployed contract address from Remix Go to scan.bohr.life Paste the
address in the search bar You'll see your contract transaction Phase 6
--- Prepare for Mainnet Step 11: Add BOT Chain Mainnet In your wallet,
click the network dropdown → "Add a network manually" Fill in these
details: Field Value Network Name BOT Chain Mainnet New RPC URL
https://rpc.botchain.ai Chain ID 677 Currency Symbol BOT Block Explorer
URL https://scan.botchain.ai Switch to BOT Chain Mainnet --- your
balance will show (starts at 0 if new).

Step 12: Get Real BOT for Mainnet You need real BOT to pay gas fees on
mainnet. Contact the organizer for a BOT allocation to cover your gas
fees.

For Mainnet Deployment: Contact the organizer for BOT allocation to
cover gas fees. Share your wallet address with the organizer ahead of
time so they can allocate mainnet BOT for your deployment. Wait for
confirmation, then check your wallet --- your BOT balance should appear.

Phase 7 --- Deploy to Mainnet Step 13: Connect Remix to Mainnet Wallet
Make sure your wallet is on BOT Chain Mainnet In Remix, go to "Deploy &
Run Transactions" Environment = "Injected Provider - MetaMask" Confirm
the network shows BOT Chain Mainnet and your real BOT balance Step 14:
Deploy Contract to Mainnet In Remix, select your compiled contract Click
"Deploy" Your wallet pops up --- carefully review: The contract being
deployed Gas fee (in BOT) Total cost If everything looks correct → Click
"Confirm" Wait for the transaction to be mined Contract address appears
in Remix Step 15: Verify on BOTScan (Mainnet) Copy your deployed
contract address Go to scan.botchain.ai Paste the address → You'll see
your live contract Step 16: Verify & Publish Contract Source Code
(Optional but Recommended) Verifying makes your contract transparent and
trustworthy.

On BOTScan, go to your contract page Click "Contract" tab → "Verify and
Publish" (if supported by the explorer's current interface) Select:
Compiler Type: Solidity (Single file) Compiler Version: same as Remix
(e.g., v0.8.20) License: MIT Paste your full Solidity source code Click
"Verify and Publish" Anyone can now read your source code Phase 8 ---
Post-Deployment Step 17: Save Important Info Create a record of:

Contract Address: 0x... Network: BOT Chain Mainnet (Chain ID 677)
Deployed By: 0x... (your wallet) Transaction Hash: 0x... Deployment
Date: YYYY-MM-DD Compiler Version: 0.8.20 Step 18: Interact with Your
Live Contract You can call your contract functions from:

Remix (still connected to BOT Chain Mainnet) BOTScan → Contract → Write
Contract (connect wallet) Your frontend app using ethers.js or web3.js,
both of which work with BOT Chain since its JSON-RPC API is
Geth-compatible Step 19: Get a Cheap Domain and Go Live Your final
submission needs to run on a live domain --- it doesn't have to be a
.com, any live domain works. Buy one in the \$1 -- \$1.50 range, then
point it at your GitHub Pages site (repo → Settings → Pages → Custom
domain, adding the DNS records your registrar shows). Keep your purchase
receipt: we reimburse it once you've submitted.

Quick Reference Checklist Setup MetaMask or BO Wallet installed Wallet
created + seed phrase backed up BOT Chain Testnet added (Chain ID 968)
Testnet Got testnet BOT from faucet.botchain.ai/basic Contract written
in Remix Contract compiled (no errors) Contract deployed to BOT Chain
Testnet All functions tested on testnet Mainnet Prep BOT Chain Mainnet
added (Chain ID 677) Contacted organizer for BOT allocation to cover gas
fees Real BOT in wallet (via organizer allocation or B DEX, enough for
gas) Contract code double-checked Mainnet Deploy Contract deployed to
BOT Chain Mainnet Contract visible on scan.botchain.ai Source code
verified on BOTScan Contract address saved Network Reference Testnet
Mainnet Chain ID 968 677 RPC URL https://rpc.bohr.life
https://rpc.botchain.ai Native Token BOT BOT Explorer
https://scan.bohr.life/ https://scan.botchain.ai Get Tokens
https://faucet.botchain.ai/basic https://dex.botchain.ai/#/swap Tip ---
Always test on testnet first. Smart contracts are immutable --- once
deployed, the code cannot be changed. Bugs on mainnet cost real BOT and
cannot be undone. Sourced from the official BOT Chain Developer Docs.

Project Ideas Pick one of these ideas and build it well, or come up with
your own!

1.  Token Presale / Launchpad (DeFi) Your project lists a token at a
    fixed price. Users connect and buy tokens with BOT. A progress bar
    shows how many are left.

2.  Certificate Issuer (Education) The project owner issues certificates
    to any wallet address. Anyone can look up a certificate to verify
    it.

3.  Community Tip Board (Social) Users post a message on-chain and
    optionally tip another wallet at the same time. A leaderboard shows
    top tippers.

4.  On-Chain Petition (Advocacy) Create a petition around any topic.
    People sign with their wallet and leave an optional comment.
    Signatures can never be deleted or faked.

5.  Wish Board (Social) Users pay a tiny amount of BOT to post a public
    message on the blockchain. All wishes appear on your page
    permanently.

6.  Community Poll (Governance) Create a question with 2 to 4 options.
    Anyone votes once using their wallet. Real wallets mean nobody can
    vote twice.

# =============================================================================

# PROJECT NOTES - IJAZAH VERIFIER

# =============================================================================

## Project Name

Ijazah Verifier

## Category

Education DApp

## Blockchain

BOT Chain (EVM)

## Goal

Create a decentralized diploma verification system where only the
contract owner can issue diploma records while anyone can verify them
without connecting a wallet.

## MVP Features

### Public

-   Verify Diploma
-   View Verification Result

### Admin

-   Connect MetaMask
-   Dashboard
-   Issue Diploma
-   Diploma List
-   Diploma Detail

## Tech Stack

-   Next.js
-   TypeScript
-   Tailwind CSS
-   ethers.js
-   Solidity
-   BOT Chain
-   MetaMask
-   Vercel

## Smart Contract

``` solidity
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

address public owner;
mapping(string => Diploma) public diplomas;
```

Functions

-   issueDiploma()
-   getDiploma()
-   verifyDiploma()

Modifier

``` solidity
onlyOwner
```

## Architecture

Public User ↓ Next.js ↓ ethers.js ↓ BOT Chain Smart Contract

## Submission Checklist

-   [ ] Smart Contract deployed
-   [ ] Website deployed
-   [ ] README completed
-   [ ] GitHub repository public
-   [ ] X post published
-   [ ] Demo tested
