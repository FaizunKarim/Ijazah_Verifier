'use client';

import React from 'react';
import Image from 'next/image';
import { Wallet, ChevronDown, Globe } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

interface NavbarProps {
  userAddress: string;
  isOwner: boolean;
  onOpenConnectModal: () => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userAddress,
  onOpenConnectModal,
  lang,
  onToggleLang,
}) => {
  const t = translations[lang];
  const truncatedAddress = userAddress
    ? `${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}`
    : null;

  return (
    <header className="sticky top-0 z-40 bg-[#f6f6f6] border-b border-[#e5e5e5] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 md:h-24 flex items-center justify-between gap-2 md:gap-4">
        
        {/* Pojok Kiri Atas: Logo jokowi.webp + Teks Nama Aplikasi */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
          <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 flex-shrink-0">
            <Image
              src="/jokowi.webp"
              alt="Ijazah Verifier Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-black text-lg sm:text-2xl md:text-4xl tracking-tight text-slate-900 block leading-tight truncate sm:whitespace-normal">
              Ijazah<span className="text-blue-600">Verifier</span>
            </span>
            <p className="text-[10px] sm:text-xs md:text-base text-slate-600 font-semibold tracking-wide truncate">
              {t.navSubtitle}
            </p>
          </div>
        </div>

        {/* Pojok Kanan Atas: Language Switcher & Connect Wallet Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
          
          {/* Language Switcher Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 md:px-3.5 md:py-2.5 bg-white border border-slate-200 rounded-lg md:rounded-xl text-[11px] md:text-xs font-bold text-slate-800 hover:bg-slate-100 transition-all shadow-xs cursor-pointer"
            title="Switch Language / Ganti Bahasa"
          >
            <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
            <span className={lang === 'id' ? 'text-blue-600 font-extrabold' : 'text-slate-400'}>ID</span>
            <span className="text-slate-300">|</span>
            <span className={lang === 'en' ? 'text-blue-600 font-extrabold' : 'text-slate-400'}>EN</span>
          </button>

          {/* Connect Wallet Button */}
          <button
            onClick={onOpenConnectModal}
            className={`flex items-center gap-1.5 md:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all duration-200 shadow-sm ${
              userAddress
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20'
            }`}
          >
            <Wallet className="w-3.5 h-3.5 md:w-4 md:h-4" />
            {userAddress ? (
              <span className="font-mono">{truncatedAddress}</span>
            ) : (
              <span>{t.connectWallet}</span>
            )}
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

        </div>

      </div>
    </header>
  );
};
