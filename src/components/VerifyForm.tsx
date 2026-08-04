'use client';

import React, { useState } from 'react';
import { Search, BookOpen, Sparkles } from 'lucide-react';

interface VerifyFormProps {
  onSearch: (diplomaNumber: string) => void;
  isLoading: boolean;
}

export const VerifyForm: React.FC<VerifyFormProps> = ({ onSearch, isLoading }) => {
  const [inputVal, setInputVal] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onSearch(inputVal.trim());
  };

  const handleSelectSample = (sampleId: string) => {
    setInputVal(sampleId);
    onSearch(sampleId);
  };

  return (
    <section className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 -mt-6 mb-12">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/80 border border-slate-200/90 relative">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Form Cari & Verifikasi Ijazah On-Chain
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Publik Access
          </span>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          Masukkan Nomor / ID Ijazah yang tertera pada dokumen untuk melakukan verifikasi langsung ke Smart Contract BOT Chain Mainnet.
        </p>

        {/* Form Input Container */}
        <form onSubmit={handleSubmit} className="relative space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">

            {/* Input Field */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Masukkan Nomor Ijazah (misal: IDN-2789-3245)..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-base sm:text-lg font-mono"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-2xl transition-all shadow-md shadow-blue-500/20 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[200px] text-base"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Memeriksa On-Chain...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Verifikasi Sekarang</span>
                </>
              )}
            </button>

          </div>

          {/* Dropdown / Quick Sample Mockup Option */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Contoh Nomor Ijazah Mockup:
            </span>
            <button
              type="button"
              onClick={() => handleSelectSample('IDN-2789-3245')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-mono font-bold transition-all shadow-xs group cursor-pointer"
              title="Klik untuk memilih contoh nomor ijazah"
            >
              <span>IDN-2789-3245</span>
              <span className="text-[10px] text-blue-500 font-sans font-normal group-hover:underline">
                (Klik untuk verifikasi)
              </span>
            </button>
          </div>

        </form>

      </div>
    </section>
  );
};
