'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, PlusCircle, ListFilter, CheckCircle2, AlertTriangle, RefreshCw, Send, Sparkles } from 'lucide-react';
import { DiplomaData } from '@/lib/types';

interface AdminDashboardProps {
  isOwner: boolean;
  userAddress: string;
  onIssueDiploma: (
    diplomaNumber: string,
    studentName: string,
    major: string,
    degree: string,
    graduationYear: number
  ) => Promise<boolean>;
  issuedDiplomas: DiplomaData[];
  isLoading: boolean;
  onRefreshList: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOwner,
  userAddress,
  onIssueDiploma,
  issuedDiplomas,
  isLoading,
  onRefreshList,
}) => {
  // Helper to generate a unique 12-character numeric Diploma ID with duplicate check
  const generateUniqueDiplomaID = () => {
    const chars = '0123456789';
    let candidate = '';
    const existingSet = new Set(issuedDiplomas.map((d) => d.diplomaNumber.toUpperCase()));

    do {
      candidate = '';
      for (let i = 0; i < 8; i++) {
        candidate += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      candidate = `IDN-${candidate.substring(0, 4)}-${candidate.substring(4, 8)}`;
    } while (candidate === 'IDN-0000-0000' || existingSet.has(candidate)); // Anti-duplikat & tidak boleh IDN-0000-0000

    return candidate;
  };

  const [diplomaNumber, setDiplomaNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [major, setMajor] = useState('');
  const [degree, setDegree] = useState('S.Kom');
  const [graduationYear, setGraduationYear] = useState<number>(2026);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Auto-generate initial ID when component mounts
  useEffect(() => {
    setDiplomaNumber(generateUniqueDiplomaID());
  }, []);

  const handleGenerateNewID = () => {
    setDiplomaNumber(generateUniqueDiplomaID());
  };

  if (!userAddress) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-12">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-amber-900">Koneksi Wallet Diperlukan</h3>
          <p className="text-amber-800 text-sm max-w-md mx-auto">
            Silakan klik tombol **Connect Wallet** di pojok kanan atas untuk mengakses Admin Dashboard penerbitan ijazah.
          </p>
        </div>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-12">
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-red-900">Akses Ditolak: Khusus Admin / Owner</h3>
          <p className="text-red-700 text-sm max-w-lg mx-auto">
            Wallet kamu (<span className="font-mono font-bold text-red-900">{userAddress.substring(0, 8)}...</span>) bukan merupakan **Owner Smart Contract**. Hanya pemilik contract yang dapat menerbitkan ijazah baru ke BOT Chain.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!diplomaNumber || !studentName || !major || !degree) {
      setMsg({ type: 'error', text: 'Mohon lengkapi seluruh field form di bawah.' });
      return;
    }

    const isDuplicate = issuedDiplomas.some(
      (d) => d.diplomaNumber.toUpperCase() === diplomaNumber.trim().toUpperCase()
    );

    if (isDuplicate) {
      setMsg({ type: 'error', text: `Nomor Ijazah "${diplomaNumber}" sudah pernah diterbitkan di blockchain!` });
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onIssueDiploma(
        diplomaNumber.trim(),
        studentName.trim(),
        major.trim(),
        degree.trim(),
        Number(graduationYear)
      );

      if (success) {
        setMsg({
          type: 'success',
          text: `Ijazah "${diplomaNumber}" berhasil diterbitkan ke BOT Chain!`,
        });
        // Generate new unique ID for the next issue
        setDiplomaNumber(generateUniqueDiplomaID());
        setStudentName('');
        setMajor('');
      } else {
        setMsg({ type: 'error', text: 'Gagal menerbitkan ijazah. Periksa transaksi MetaMask Anda.' });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan sistem';
      setMsg({ type: 'error', text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 my-12 space-y-10 animate-in fade-in duration-300">
      
      {/* Header Admin */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-wider bg-blue-600 text-white px-3 py-1 rounded-full inline-block">
            ADMIN DASHBOARD INSTITUSI
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">Penerbitan Ijazah On-Chain</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Status Wallet Admin: <span className="font-mono text-emerald-400 font-bold">{userAddress}</span>
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
          <div>
            <span className="text-2xl font-black text-amber-400 block">{issuedDiplomas.length}</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Ijazah Terbit</span>
          </div>
          <button
            onClick={onRefreshList}
            className="p-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-all"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Form Issue Diploma & List Table Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Issue Diploma (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Form Terbitkan Ijazah</h3>
              <p className="text-xs text-slate-500">Nomor Ijazah otomatis ter-generate secara unik (12 Karakter)</p>
            </div>
          </div>

          {msg && (
            <div
              className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
                msg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-red-50 text-red-900 border border-red-200'
              }`}
            >
              {msg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
              )}
              <span>{msg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Nomor Ijazah Unik (12 Karakter)
                </label>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                  🔒 TERKUNCI OTOMATIS
                </span>
              </div>

              <input
                type="text"
                value={diplomaNumber}
                readOnly
                tabIndex={-1}
                className="w-full px-4 py-3 rounded-xl bg-slate-100/90 border border-slate-300 text-blue-700 font-mono text-sm font-bold tracking-wide cursor-not-allowed select-none shadow-inner"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Nama Lengkap Siswa / Mahasiswa
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="misal: Ahmad Faizun"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Program Studi / Jurusan
              </label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="misal: Teknik Informatika"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                  Gelar Akademik
                </label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="misal: S.Kom / S.T"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                  Tahun Lulus
                </label>
                <input
                  type="number"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(parseInt(e.target.value))}
                  placeholder="2026"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2 text-sm mt-4"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Memproses Transaksi On-Chain...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Terbitkan Ijazah ke BOT Chain</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* List Table of Issued Diplomas (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                <ListFilter className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Daftar Ijazah Terbit</h3>
                <p className="text-xs text-slate-500">Ijazah terverifikasi dalam smart contract</p>
              </div>
            </div>
            <span className="text-xs bg-slate-100 font-bold px-3 py-1 rounded-full text-slate-600">
              {issuedDiplomas.length} Record
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Nomor Ijazah</th>
                  <th className="py-3 px-3">Nama Mahasiswa</th>
                  <th className="py-3 px-3">Prodi</th>
                  <th className="py-3 px-3">Tahun</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {issuedDiplomas.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      Belum ada ijazah yang diterbitkan.
                    </td>
                  </tr>
                ) : (
                  issuedDiplomas.map((d, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-blue-600">{d.diplomaNumber}</td>
                      <td className="py-3.5 px-3 text-slate-900">{d.studentName}</td>
                      <td className="py-3.5 px-3">{d.major} ({d.degree})</td>
                      <td className="py-3.5 px-3">{d.graduationYear}</td>
                      <td className="py-3.5 px-3 text-right">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Valid
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
};
