'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, AlertCircle, ExternalLink, Printer, CheckCircle2 } from 'lucide-react';
import { DiplomaData } from '@/lib/types';
import { BOT_CHAIN_MAINNET } from '@/lib/constants';

interface VerificationResultProps {
  result: DiplomaData | null;
  searchedNumber: string;
  hasSearched: boolean;
}

export const VerificationResult: React.FC<VerificationResultProps> = ({
  result,
  searchedNumber,
  hasSearched,
}) => {
  useEffect(() => {
    if (result && result.isValid) {
      // Trigger celebration confetti
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#10b981', '#f59e0b'],
      });
    }
  }, [result]);

  if (!hasSearched) return null;

  // State: Diploma Not Found or Invalid
  if (!result || !result.isValid) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-red-50/80 border-2 border-red-200 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-extrabold text-red-900">
            Ijazah Tidak Ditemukan / Tidak Valid
          </h3>
          <p className="text-red-700 max-w-md mx-auto font-medium text-sm">
            Nomor Ijazah <span className="font-mono font-bold bg-red-100 px-2 py-0.5 rounded text-red-900">&quot;{searchedNumber}&quot;</span> tidak terdaftar dalam Smart Contract BOT Chain. Mohon periksa kembali nomor ijazah yang diinput.
          </p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(result.issueDate * 1000).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Helper pintar untuk memformat letak Gelar (Depan vs Belakang Nama)
  const formatFullNameWithDegree = (name: string, degree: string) => {
    if (!degree) return name;
    
    const cleanDegree = degree.trim();
    const prefixTitles = ['ir', 'ir.', 'dr', 'dr.', 'drs', 'drs.', 'prof', 'prof.', 'h', 'h.', 'hj', 'hj.'];
    const firstWord = cleanDegree.toLowerCase().split(' ')[0];

    // Jika Gelar Depan (misal Ir. / Dr. / Drs. / Prof.) -> ditaruh di depan nama
    if (prefixTitles.includes(firstWord) || cleanDegree.toLowerCase().startsWith('ir') || cleanDegree.toLowerCase().startsWith('dr')) {
      return `${cleanDegree} ${name}`;
    }

    // Jika Gelar Belakang (misal S.Hut. / S.Kom / M.T.) -> ditaruh di belakang nama dengan koma
    return `${name}, ${cleanDegree}`;
  };

  const formattedFullName = formatFullNameWithDegree(result.studentName, result.degree);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-400">
      
      {/* Container Utuh Hasil Verifikasi */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden">
        
        {/* Banner Top Status: VERIFIED */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase bg-white/20 text-emerald-100 px-3 py-1 rounded-full inline-block mb-1">
                STATUS: VALID ON-CHAIN
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                IJAZAH TERVERIFIKASI SAH
              </h2>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-center sm:text-right">
            <span className="text-[10px] text-emerald-100 uppercase block font-semibold">JARINGAN BLOCKCHAIN</span>
            <span className="font-mono text-sm font-bold text-white">{BOT_CHAIN_MAINNET.chainName}</span>
          </div>
        </div>

        {/* MODEL IJAZAH DIGITAL RESMI (TANPA LOGO, DENGAN FRAME BORDER ELEGAN) */}
        <div className="p-6 sm:p-10 bg-slate-100">
          
          <div id="printable-certificate" className="bg-[#fffdf9] border-8 border-double border-amber-800/30 rounded-2xl p-8 sm:p-12 shadow-inner relative overflow-hidden space-y-8">
            
            {/* Header Model Ijazah (Tanpa Logo) */}
            <div className="text-center space-y-2 relative z-10 border-b-2 border-amber-900/20 pb-6">
              <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-wide uppercase">
                IJAZAH AKADEMIK
              </h1>
              <p className="text-xs text-slate-600 font-mono font-bold tracking-widest">
                NOMOR DOKUMEN: <span className="text-blue-700 font-extrabold">{result.diplomaNumber}</span>
              </p>
            </div>

            {/* Body Model Ijazah */}
            <div className="text-center space-y-6 relative z-10 py-4">
              <p className="text-sm font-serif italic text-slate-700">
                Dengan ini menyatakan bahwa:
              </p>

              {/* Nama Lengkap & Gelar (Pintar Membedakan Depan vs Belakang) */}
              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                  {formattedFullName}
                </h3>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                  (NAMA LENGKAP MAHASISWA & GELAR)
                </p>
              </div>

              <p className="text-sm font-serif text-slate-700 leading-relaxed max-w-2xl mx-auto">
                Telah menyelesaikan secara sah seluruh beban studi dan memenuhi syarat akademik pada Program Studi <strong className="text-slate-900 font-bold underline decoration-blue-500 decoration-2">{result.major}</strong> pada Tahun Kelulusan <strong className="text-slate-900 font-bold">{result.graduationYear}</strong>.
              </p>
            </div>

            {/* Footer Model Ijazah & On-Chain Verification Stamp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t-2 border-amber-900/20 relative z-10 items-end">
              
              {/* Left Side: Stempel Digital On-Chain */}
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-2 rounded-xl text-xs font-bold shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>TERDAFTAR PERMANEN ON-CHAIN</span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Smart Contract Address:<br />
                  <span className="font-bold text-slate-800 break-all">{BOT_CHAIN_MAINNET.rpcUrl}</span>
                </p>
              </div>

              {/* Right Side: Tanggal Issuance & Wallet Signer */}
              <div className="text-center md:text-right space-y-1 text-xs text-slate-700">
                <p className="font-semibold">Tanggal Terbit On-Chain:</p>
                <p className="font-bold text-slate-900">{formattedDate}</p>
                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Wallet Issuer:</span>
                  <span className="font-mono text-xs font-bold text-blue-700 break-all">
                    {result.issuer}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Action Links & Print Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl transition-all shadow-md hover:shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF Ijazah</span>
            </button>

            <a
              href={`${BOT_CHAIN_MAINNET.blockExplorerUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Verifikasi di BOT Chain Explorer</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
