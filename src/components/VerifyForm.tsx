'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, BookOpen, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

interface VerifyFormProps {
  onSearch: (diplomaNumber: string) => void;
  isLoading: boolean;
  lang: Language;
}

export const VerifyForm: React.FC<VerifyFormProps> = ({ onSearch, isLoading, lang }) => {
  const t = translations[lang];
  const [inputVal, setInputVal] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setIsDropdownOpen(false);
    onSearch(inputVal.trim());
  };

  const handleSelectDropdownItem = (sampleId: string) => {
    setInputVal(sampleId);
    setIsDropdownOpen(false);
    onSearch(sampleId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              {t.formTitle}
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {t.formPublicBadge}
          </span>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          {t.formDesc}
        </p>

        {/* Form Input Container with Dropdown */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col sm:flex-row gap-3">

            {/* Input Field with Dropdown Anchor */}
            <div className="relative flex-1" ref={containerRef}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <BookOpen className="w-5 h-5" />
              </div>

              <input
                type="text"
                value={inputVal}
                onFocus={() => setIsDropdownOpen(true)}
                onClick={() => setIsDropdownOpen(true)}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setIsDropdownOpen(true);
                }}
                placeholder={t.inputPlaceholder}
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-base sm:text-lg font-mono"
              />

              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </div>

              {/* DROPDOWN MENU (Muncul Otomatis Saat Field Input Diklik / Ditekan) */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {t.dropdownHeader}
                    </span>
                    <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
                      {t.dropdownBadge}
                    </span>
                  </div>

                  <div className="p-1.5">
                    <button
                      type="button"
                      onClick={() => handleSelectDropdownItem('IDN-2789-3245')}
                      className="w-full text-left p-3 rounded-xl hover:bg-blue-50/80 transition-all flex items-center justify-between group cursor-pointer border border-transparent hover:border-blue-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-blue-600 group-hover:text-blue-700">
                              IDN-2789-3245
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                              {t.dropdownItemStatus}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium">
                            {t.dropdownItemDesc}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                        {t.dropdownSelectBtn}
                      </span>
                    </button>
                  </div>
                </div>
              )}
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
                  <span>{t.verifyingBtn}</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>{t.verifyBtn}</span>
                </>
              )}
            </button>

          </div>
        </form>

      </div>
    </section>
  );
};
