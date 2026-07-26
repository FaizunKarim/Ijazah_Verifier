'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, CheckCircle2, ChevronDown, BookOpen } from 'lucide-react';
import { SAMPLE_FIRST_DIPLOMA } from '@/lib/constants';

interface VerifyFormProps {
  onSearch: (diplomaNumber: string) => void;
  isLoading: boolean;
}

export const VerifyForm: React.FC<VerifyFormProps> = ({ onSearch, isLoading }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLFormElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setShowDropdown(false);
    onSearch(inputVal.trim());
  };

  const handleSelectSample = (sampleId: string) => {
    setInputVal(sampleId);
    setShowDropdown(false);
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
              Form Cari & Verifikasi Ijazah
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Publik Access (Tanpa Wallet)
          </span>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          Masukkan **Nomor / ID Ijazah** yang tertera pada dokumen fisik atau klik input di bawah untuk memilih contoh ijazah yang sudah diterbitkan.
        </p>

        {/* Form Input + Dropdown Container */}
        <form onSubmit={handleSubmit} className="relative" ref={dropdownRef}>
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Input Field */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Contoh Nomor Ijazah: IJZ-2026-001"
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-base sm:text-lg"
              />
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
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
                  <span>Memeriksa...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Verifikasi Sekarang</span>
                </>
              )}
            </button>

          </div>

          {/* Dropdown Rekomendasi 1 Contoh Ijazah Pertama */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Contoh Ijazah Pertama Diterbitkan (Klik untuk Menggunakan):</span>
              </div>

              <div
                onClick={() => handleSelectSample(SAMPLE_FIRST_DIPLOMA.diplomaNumber)}
                className="flex items-center justify-between p-3.5 rounded-xl hover:bg-blue-50/80 border border-slate-100 hover:border-blue-200 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                    IJZ
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 group-hover:text-blue-600">
                        {SAMPLE_FIRST_DIPLOMA.diplomaNumber}
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Valid On-Chain
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {SAMPLE_FIRST_DIPLOMA.studentName} — {SAMPLE_FIRST_DIPLOMA.major} ({SAMPLE_FIRST_DIPLOMA.degree})
                    </p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                  Pilih Contoh
                </span>
              </div>
            </div>
          )}

        </form>

      </div>
    </section>
  );
};
