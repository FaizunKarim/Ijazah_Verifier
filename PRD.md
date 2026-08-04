# Product Requirements Document (PRD)

## Project Information

- **Project Name:** Ijazah Verifier
- **Version:** 1.0 (Build Week Hackathon)
- **Platform:** BOT Chain Mainnet (EVM) - Chain ID 677
- **Contract Address:** `0x9513aCa0BaFAdD3fB9E8eDE9550352F2E3b9a053`
- **Application Type:** Decentralized Application (DApp)

---

# 1. Overview

## Description

Ijazah Verifier adalah aplikasi berbasis blockchain yang memungkinkan institusi pendidikan menerbitkan data ijazah ke BOT Chain Mainnet dan memungkinkan siapa pun memverifikasi keaslian ijazah melalui website tanpa perlu mengoneksikan wallet.

Seluruh data ijazah disimpan di Smart Contract secara tak terubah (*immutable*).

---

# 2. Objectives & Key Improvements

- Menerbitkan data ijazah ke BOT Chain Mainnet dengan jaminan transaksi gas fee koin BOT.
- Proteksi ganda Admin via Autentikasi Wallet Owner (`onlyOwner`) + Passkey (`PASSKEY`).
- Generator otomatis Nomor Ijazah Unik 12 Karakter Angka (`IDN-XXXX-XXXX`) yang terkunci (*read-only*) dan bebas dari duplikasi.
- Menampilkan hasil verifikasi berbentuk **Model Sertifikat Ijazah Digital Resmi** dengan pemformatan gelar pintar (Gelar Depan seperti `Ir.` vs Gelar Belakang seperti `S.Hut.`).
- Fitur Ekspor & Cetak PDF Ijazah secara bersih menggunakan stylesheet `@media print`.

---

# 3. User Flow

## Public User
```text
Home Page -> Input Nomor Ijazah (IDN-XXXX-XXXX) -> Verifikasi On-Chain -> Model Sertifikat Ijazah Digital -> Cetak PDF / Verifikasi di Explorer
```

## Admin (Institusi)
```text
Home Page -> Connect Wallet Modal -> Input Wallet Address + Sandi Admin (PASSKEY) -> Pengecekan Owner & Passkey -> Admin Dashboard (Terbitkan Ijazah Unik Terkunci)
```

---

# 4. Functional Requirements

- **Connect Wallet & Passkey Auth:** Autentikasi ganda wallet address owner + Passkey env.
- **Auto Network Switcher:** Beralih otomatis ke BOT Chain Mainnet (Chain ID 677).
- **Auto-Generate Locked Diploma ID:** Menghasilkan nomor unik 12-digit `IDN-XXXX-XXXX` tanpa duplikasi.
- **Issue Diploma On-Chain:** Mengirim data ijazah ke Smart Contract `0x9513aCa0BaFAdD3fB9E8eDE9550352F2E3b9a053`.
- **Public Verification & PDF Export:** Pencarian publik tanpa wallet, menampilkan sertifikat digital resmi dan opsi cetak PDF.

---

# 5. Smart Contract Specifications

- **Contract Name:** `IjazahVerifier`
- **Address:** `0x9513aCa0BaFAdD3fB9E8eDE9550352F2E3b9a053`
- **Functions:** `issueDiploma()`, `verifyDiploma()`, `getDiploma()`, `getAllDiplomaNumbers()`, `getDiplomaCount()`
