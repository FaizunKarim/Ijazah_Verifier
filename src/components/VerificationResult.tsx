'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, AlertCircle, Calendar, User, GraduationCap, Building2, ExternalLink, Hash, Clock, Award } from 'lucide-react';
import { DiplomaData } from '@/lib/types';
import { BOT_CHAIN_TESTNET } from '@/lib/constants';

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
      // Trigger subtle celebration confetti
      confetti({
        particleCount: 50,
        spread: 60,
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-400">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden">
        
        {/* Banner Top Status: VERIFIED */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest uppercase bg-white/20 text-emerald-100 px-3 py-1 rounded-full inline-block mb-1">
                STATUS: VALID ON-CHAIN
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                IJAZAH TERVERIFIKASI SAH
              </h2>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-center sm:text-right">
            <span className="text-[10px] text-emerald-100 uppercase block font-semibold">JARINGAN BLOCKCHAIN</span>
            <span className="font-mono text-sm font-bold text-white">{BOT_CHAIN_TESTNET.chainName}</span>
          </div>
        </div>

        {/* Certificate Details Content Grid */}
        <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50">
          
          {/* Main Title Badge */}
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">NOMOR DOKUMEN / IJAZAH ID</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-blue-600 tracking-wide">
                {result.diplomaNumber}
              </span>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-extrabold shadow-xs">
              <Award className="w-6 h-6" />
            </div>
          </div>

          {/* Details 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Student Name */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase">NAMA LENGKAP MAHASISWA</span>
                <p className="text-lg font-bold text-slate-900">{result.studentName}</p>
              </div>
            </div>

            {/* Program Studi / Major */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase">PROGRAM STUDI / JURUSAN</span>
                <p className="text-lg font-bold text-slate-900">{result.major}</p>
              </div>
            </div>

            {/* Gelar Akademik */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase">GELAR AKADEMIK</span>
                <p className="text-lg font-bold text-slate-900">{result.degree}</p>
              </div>
            </div>

            {/* Tahun Kelulusan */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase">TAHUN KELULUSAN</span>
                <p className="text-lg font-bold text-slate-900">{result.graduationYear}</p>
              </div>
            </div>

          </div>

          {/* Additional On-Chain Issuer Metadata */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Tanggal Terbit On-Chain: <strong className="text-slate-800">{formattedDate}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Alamat Wallet Issuer: <strong className="font-mono text-slate-800">{result.issuer.substring(0, 10)}...{result.issuer.substring(result.issuer.length - 6)}</strong></span>
              </div>
            </div>
          </div>

          {/* Action Link to Block Explorer */}
          <div className="pt-2 flex justify-center">
            <a
              href={`${BOT_CHAIN_TESTNET.blockExplorerUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Verifikasi di BOT Chain Explorer (scan.bohr.life)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
