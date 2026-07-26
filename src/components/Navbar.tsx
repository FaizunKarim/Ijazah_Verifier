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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Pojok Kiri Atas: Logo (jokowi.webp) + Nama Aplikasi */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-blue-600/30 shadow-md transition-transform hover:scale-105">
            <Image
              src="/jokowi.webp"
              alt="Ijazah Verifier Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 block leading-tight">
              Ijazah<span className="text-blue-600">Verifier</span>
            </span>
            <p className="text-xs text-slate-500 font-medium">Verifikasi Ijazah On-Chain</p>
          </div>
        </div>

        {/* Pojok Kanan Atas: Connect Wallet Button & Address Display */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConnectModal}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm ${
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
