'use client';

import React from 'react';
import Image from 'next/image';
import { Wallet, ChevronDown } from 'lucide-react';

interface NavbarProps {
  userAddress: string;
  isOwner: boolean;
  onOpenConnectModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userAddress,
  onOpenConnectModal,
}) => {
  const truncatedAddress = userAddress
    ? `${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}`
    : null;

  return (
    <header className="sticky top-0 z-40 bg-[#f6f6f6] border-b border-[#e5e5e5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        
        {/* Pojok Kiri Atas: Logo jokowi.webp + Teks Nama Aplikasi (Besar & Seimbang) */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src="/jokowi.webp"
              alt="Ijazah Verifier Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-black text-3xl sm:text-4xl tracking-tight text-slate-900 block leading-tight">
              Ijazah<span className="text-blue-600">Verifier</span>
            </span>
            <p className="text-sm sm:text-base text-slate-600 font-semibold tracking-wide">
              Verifikasi Ijazah On-Chain
            </p>
          </div>
        </div>

        {/* Pojok Kanan Atas: Connect Wallet Button & Address Display */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConnectModal}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm ${
              userAddress
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20'
            }`}
          >
            <Wallet className="w-4 h-4" />
            {userAddress ? (
              <span className="font-mono">{truncatedAddress}</span>
            ) : (
              <span>Connect Wallet</span>
            )}
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>
        </div>

      </div>
    </header>
  );
};
