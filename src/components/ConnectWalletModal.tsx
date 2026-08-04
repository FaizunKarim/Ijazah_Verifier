'use client';

import React, { useState } from 'react';
import { X, ShieldAlert, KeyRound, Wallet, LogIn } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAddress: string;
  onSaveManualAddress: (address: string) => void;
  isOwner: boolean;
  contractOwner: string;
  lang: Language;
}

export const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
  userAddress,
  onSaveManualAddress,
  contractOwner,
  lang,
}) => {
  const t = translations[lang];
  const [inputAddress, setInputAddress] = useState<string>(userAddress || '');
  const [inputPasskey, setInputPasskey] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanAddress = inputAddress.trim();
    const cleanPasskey = inputPasskey.trim();
    const adminPasskey = process.env.PASSKEY || 'Izunkarim1';

    if (!cleanAddress) {
      setErrorMsg(t.errNoAddress);
      return;
    }

    if (cleanPasskey !== adminPasskey) {
      setErrorMsg(t.errWrongPasskey);
      return;
    }

    if (contractOwner && cleanAddress.toLowerCase() !== contractOwner.toLowerCase()) {
      setErrorMsg(t.errWrongOwner);
      return;
    }

    onSaveManualAddress(cleanAddress);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-inner">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{t.modalTitle}</h3>
            <p className="text-xs text-slate-500">{t.modalSubtitle}</p>
          </div>
        </div>

        {/* Error Alert Box inside Modal */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-3 animate-in shake duration-200">
            <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-xs font-semibold">
          
          {/* Field 1: Wallet Address */}
          <div className="space-y-1.5">
            <label className="text-slate-700 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.walletInputLabel}</span>
            </label>
            <input
              type="text"
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          {/* Field 2: Passkey */}
          <div className="space-y-1.5">
            <label className="text-slate-700 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.passkeyInputLabel}</span>
            </label>
            <input
              type="password"
              value={inputPasskey}
              onChange={(e) => setInputPasskey(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 text-sm pt-4 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>{t.modalSubmitBtn}</span>
          </button>

        </form>

      </div>
    </div>
  );
};
