# UI/UX Specification: Ijazah Verifier DApp

Dokumen spesifikasi antarmuka, aset brand, metadata SEO, dan sistem desain untuk aplikasi **Ijazah Verifier**. Desain dirancang agar terlihat modern, tepercaya, bersih, dan jauh dari kesan generik/AI slop.

---

## 1. Brand Identity, Logo, & Website Icon

### A. Logo Navbar (Pojok Kiri Atas)
* **Image Logo:** `/jokowi.webp` (Avatar/Logo gambar lingkaran bulat bersih).
* **Teks Nama Aplikasi:** `Ijazah Verifier` (Bold, font sans-serif modern `text-slate-900`).
* **Layout:** Flexbox horizontal `items-center gap-3`, gambar logo dipadu dengan badge status blockchain.

### B. Favicon & Website Icon
* **Favicon URL:** `/jokowi.webp` (Diatur sebagai `<link rel="icon" href="/jokowi.webp" type="image/webp" />`).

---

## 2. Meta Property & SEO Configuration

Dokumen HTML & metadata aplikasi dikonfigurasi lengkap dengan tag Open Graph dan Twitter Card:

```html
<!-- Primary Meta Tags -->
<title>Ijazah Verifier - Verifikasi Keaslian Ijazah On-Chain BOT Chain</title>
<meta name="title" content="Ijazah Verifier - Verifikasi Keaslian Ijazah On-Chain BOT Chain" />
<meta name="description" content="Platform verifikasi keaslian ijazah berbasis blockchain BOT Chain (EVM). Cepat, transparan, permanen, dan dapat diverifikasi oleh publik tanpa wallet." />
<meta name="keywords" content="ijazah verifier, bot chain, blockchain education, verifikasi ijazah, smart contract" />

<!-- Favicon -->
<link rel="icon" href="/jokowi.webp" type="image/webp" />
<link rel="apple-touch-icon" href="/jokowi.webp" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://ijazah-verifier.vercel.app/" />
<meta property="og:title" content="Ijazah Verifier - Verifikasi Keaslian Ijazah On-Chain" />
<meta property="og:description" content="Verifikasi data ijazah secara transparan & instan yang diterbitkan langsung di BOT Chain Smart Contract." />
<meta property="og:image" content="/jokowi.webp" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://ijazah-verifier.vercel.app/" />
<meta property="twitter:title" content="Ijazah Verifier - Verifikasi Keaslian Ijazah On-Chain" />
<meta property="twitter:description" content="Verifikasi data ijazah secara transparan & instan yang diterbitkan langsung di BOT Chain Smart Contract." />
<meta property="twitter:image" content="/jokowi.webp" />
```

---

## 3. Design System & Tokens

### Palette Color

| Elemen | Color Hex / Tailwind Class | Deskripsi / Penggunaan |
| :--- | :--- | :--- |
| **Top Navbar** | `#FFFFFF` (`bg-white`) | Putih bersih dengan `border-b border-slate-100` & shadow sangat tipis. |
| **Main Background** | `#F8FAFC` (`bg-slate-50`) | Soft Off-White agar elemen kartu tampak mengapung (*elevated*). |
| **Primary Accent** | `#2563EB` (`bg-blue-600`) | Biru profesional untuk tombol utama, sorotan, dan brand identity. |
| **Primary Hover** | `#1D4ED8` (`bg-blue-700`) | State hover interaktif. |
| **Verified Green** | `#10B981` (`emerald-500`) | Khusus badge status **"TERVERIFIKASI SAH ON-CHAIN"**. |
| **Warning Red** | `#EF4444` (`red-500`) | Khusus badge status **"IJAZAH TIDAK DITEMUKAN / PALSU"**. |
| **Card Surface** | `#FFFFFF` (`bg-white`) | Kartu konten dengan `border border-slate-200/80` dan `rounded-2xl`. |
| **Text Primary** | `#0F172A` (`text-slate-900`) | Teks judul utama berdaya baca tinggi. |
| **Text Secondary** | `#64748B` (`text-slate-500`) | Label, deskripsi pendukung, dan timestamp. |

---

## 4. Struktur Komponen & Layout Halaman

### A. Top Navbar (Header Putih Bersih)
* **Pojok Kiri Atas:** Logo Image `jokowi.webp` + Nama Aplikasi `Ijazah Verifier`.
* **Tengah:** Jaringan Status Badge (`BOT Chain Testnet / Mainnet` dengan dot hijau indikator aktif).
* **Pojok Kanan Atas:** Tombol **Connect Wallet**
  * **Mekanisme Pop-up Modal / Field Wallet Address:**
    Saat tombol **"Connect Wallet"** diklik, memunculkan modal / field khusus yang memungkinkan user:
    1. Melakukan otomatisasi koneksi MetaMask (*Injected Provider*).
    2. **Field Form Wallet Address:** Input manual alamat wallet (`0x...`) untuk kemudahan penguji/user saat verifikasi role Admin tanpa harus ganti akun wallet.

---

### B. Halaman Publik: Verifikasi Ijazah

```
+-----------------------------------------------------------------------+
|  NAVBAR (LEFT: LOGO jokowi.webp + Ijazah Verifier | RIGHT: CONNECT)   |
+-----------------------------------------------------------------------+
|                                                                       |
|  [HERO SECTION - DENGAN ELEMEN DESAIN 3D MEMUKAU]                     |
|  +-----------------------------------------------------------------+  |
|  |  [Kiri: Teks Headline]              [Kanan: Visual 3D Hero]     |  |
|  |  Verifikasi Keaslian Ijazah         * Floating 3D Gold Ribbon    |  |
|  |  Instan & Permanen                  * Glassmorphism Shield 3D   |  |
|  |  Berbasis BOT Chain                 * Blockchain Node Orbit 3D  |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  [FORM CARI IJAZAH - DI BAWAH HERO PAGE]                              |
|  +-----------------------------------------------------------------+  |
|  |  Input Ijazah ID: [ IJZ-2026-001                           ]    |  |
|  |  -------------------------------------------------------------  |  |
|  |  Dropdown Rekomendasi Contoh (Muncul saat field diklik):        |  |
|  |  💡 Contoh Ijazah Pertama: "IJZ-2026-001" (Klik untuk pilih)    |  |
|  |                                                                 |  |
|  |  [ Tombol: Verifikasi Sekarang -> ]                              |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  [RESULT CARD - JIKA HASIL VERIFIKASI DITEMUKAN]                      |
|  +-----------------------------------------------------------------+  |
|  |  (✓) TERVERIFIKASI DI BOT CHAIN                                 |  |
|  |                                                                 |  |
|  |  Nama Mahasiswa   : Budi Santoso                                |  |
|  |  Nomor Ijazah     : IJZ-2026-001                                |  |
|  |  Program Studi    : Teknik Informatika                          |  |
|  |  Gelar Academic   : Sarjana Komputer (S.Kom)                    |  |
|  |  Tahun Lulus      : 2026                                        |  |
|  |  Tanggal Terbit   : 26 Juli 2026, 15:30 WIB                      |  |
|  |  Wallet Penerbit  : 0xAbC...123 (Verified Institution)          |  |
|  |                                                                 |  |
|  |  [ Lihat Transaksi di BOTScan Explorer ↗ ]                       |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
+-----------------------------------------------------------------------+
```

---

### C. Halaman Admin Dashboard (Owner Contract)

Hanya tampil utuh apabila wallet yang terkoneksi sesuai dengan `owner` di Smart Contract.

1. **Stat Cards Top Overview:**
   * Total Ijazah Diterbitkan (e.g. `142 Ijazah`).
   * Jaringan Aktif (`Chain ID: 968 / 677`).
   * Alamat Smart Contract (Klik untuk Copy / View di Explorer).

2. **Form Penerbitan Ijazah Baru (`Issue Diploma`):**
   * Field 1: **Nomor Ijazah** (Unik, misal: `IJZ-2026-002`)
   * Field 2: **Nama Lengkap Mahasiswa**
   * Field 3: **Program Studi / Jurusan**
   * Field 4: **Gelar Akademik** (misal: `S.Kom`, `S.T`, `S.E`)
   * Field 5: **Tahun Kelulusan** (misal: `2026`)
   * Tombol Utama: **`Terbitkan ke Blockchain`** (Trigger transaksi MetaMask).

3. **Daftar Ijazah Terbit (`Issued Diploma Table`):**
   * Tabel interaktif dengan kolom: *Nomor Ijazah*, *Nama*, *Jurusan*, *Tahun*, *Tanggal Issuance*, dan *Aksi (Lihat Detail)*.
