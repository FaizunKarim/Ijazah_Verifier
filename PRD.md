# Product Requirements Document (PRD)

## Project Information

-   **Project Name:** Ijazah Verifier
-   **Version:** 1.0 (MVP Hackathon)
-   **Platform:** BOT Chain (EVM)
-   **Application Type:** Decentralized Application (DApp)

------------------------------------------------------------------------

# 1. Overview

## Description

Ijazah Verifier adalah aplikasi berbasis blockchain yang memungkinkan
institusi pendidikan menerbitkan data ijazah ke BOT Chain dan
memungkinkan siapa pun memverifikasi keaslian ijazah melalui website.

Seluruh data ijazah disimpan di Smart Contract sehingga tidak dapat
diubah setelah diterbitkan.

------------------------------------------------------------------------

# 2. Problem Statement

Proses verifikasi ijazah masih bergantung pada institusi penerbit
sehingga membutuhkan waktu dan bergantung pada sistem terpusat.

Dengan blockchain, data ijazah dapat diterbitkan secara permanen
sehingga siapa pun dapat melakukan verifikasi secara mandiri melalui
website.

------------------------------------------------------------------------

# 3. Objectives

-   Menerbitkan data ijazah ke BOT Chain.
-   Memastikan hanya Admin yang dapat menerbitkan ijazah.
-   Memungkinkan publik memverifikasi ijazah.
-   Menampilkan hasil verifikasi langsung dari blockchain.

------------------------------------------------------------------------

# 4. Users

## Admin

Institusi pendidikan.

Pada MVP, Admin adalah wallet yang melakukan deploy Smart Contract.

## Public User

-   HRD
-   Perusahaan
-   Alumni
-   Masyarakat

Public User tidak memerlukan wallet.

------------------------------------------------------------------------

# 5. MVP Scope

## Public Features

-   Home Page
-   Verify Diploma
-   View Verification Result

## Admin Features

-   Connect Wallet
-   Admin Dashboard
-   Issue Diploma
-   Diploma List
-   Diploma Detail

------------------------------------------------------------------------

# 6. Out of Scope

-   Login / Register
-   Multi Admin
-   Multi University
-   Upload PDF
-   QR Code
-   OCR
-   AI Verification
-   Database
-   Backend API
-   Edit/Delete Diploma

------------------------------------------------------------------------

# 7. User Flow

## Public

``` text
Home
 ↓
Input Diploma Number
 ↓
Verify
 ↓
Read Smart Contract
 ↓
Result
```

## Admin

``` text
Home
 ↓
Connect Wallet
 ↓
Wallet == Owner ?
 ├── Yes → Dashboard
 └── No  → Access Denied
```

------------------------------------------------------------------------

# 8. Pages

## Home

-   Logo
-   Connect Wallet (Top Right)
-   Hero
-   Diploma Number Input
-   Verify Button
-   About Section

## Dashboard

-   Overview
-   Issue Diploma
-   Diploma List
-   Diploma Detail

------------------------------------------------------------------------

# 9. Functional Requirements

-   Connect MetaMask
-   Detect Owner Wallet
-   Issue Diploma
-   Verify Diploma
-   Read Diploma Detail
-   Public Read Access

------------------------------------------------------------------------

# 10. Smart Contract

## Struct

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
```

## Variables

``` solidity
address public owner;

mapping(string => Diploma) diplomas;
```

## Functions

``` solidity
issueDiploma()

getDiploma()

verifyDiploma()
```

## Modifier

``` solidity
onlyOwner
```

------------------------------------------------------------------------

# 11. Technology Stack

## Frontend

-   Next.js
-   TypeScript
-   Tailwind CSS
-   ethers.js

## Blockchain

-   Solidity
-   BOT Chain

## Wallet

-   MetaMask

## Deployment

-   Vercel
-   BOT Chain Mainnet

## Database

Tidak digunakan.

Blockchain menjadi satu-satunya source of truth.

------------------------------------------------------------------------

# 12. Success Criteria

-   Website online.
-   Wallet owner dapat login.
-   Admin dapat menerbitkan ijazah.
-   Data tersimpan di blockchain.
-   Publik dapat memverifikasi ijazah.
-   Demo berjalan tanpa error.

------------------------------------------------------------------------

# 13. Future Improvements

-   Multi University
-   Multi Admin
-   QR Code Verification
-   IPFS Integration
-   PDF Hash Storage
-   Batch Issuing
-   Diploma Revocation

------------------------------------------------------------------------

# 14. System Architecture

``` text
                 Public User
                      │
                      ▼
              Next.js Frontend
                      │
                 ethers.js
                      │
                      ▼
           BOT Chain Smart Contract
                      │
                      ▼
              Diploma Storage
```
