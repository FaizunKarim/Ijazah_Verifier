'use client';

import React, { useState } from 'react';
import { X, Wallet, Lock, AlertTriangle } from 'lucide-react';
import { ADMIN_PASSKEY } from '@/lib/constants';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAddress: string;
  onSaveManualAddress: (address: string) => void;
  isOwner: boolean;
}

export const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
  userAddress,
  onSaveManualAddress,
}) => {
  const [manualAddrInput, setManualAddrInput] = useState<string>(userAddress || '');
  const [passkeyInput, setPasskeyInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleSaveManual = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!manualAddrInput.trim()) {
      setErrorMsg('Mohon masukkan Wallet Address.');
      return;
    }

    // Passkey authentication check
    if (passkeyInput.trim() !== ADMIN_PASSKEY) {
      setErrorMsg('Sandi Admin / Passkey salah! Akses ditolak.');
      return;
    }

    onSaveManualAddress(manualAddrInput.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Login Admin & Wallet</h3>
            <p className="text-xs text-slate-500 font-medium">Masukkan Wallet Address & Sandi Admin</p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Manual Wallet Address & Passkey Form */}
        <form onSubmit={handleSaveManual} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-blue-600" />
              WALLET ADDRESS (0x...)
            </label>
            <input
              type="text"
              value={manualAddrInput}
              onChange={(e) => setManualAddrInput(e.target.value)}
              placeholder="Masukkan Wallet Address (0x...)"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              SANDI ADMIN / PASSKEY
            </label>
            <input
              type="password"
              value={passkeyInput}
              onChange={(e) => setPasskeyInput(e.target.value)}
              placeholder="Masukkan Sandi Admin..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!manualAddrInput.trim() || !passkeyInput.trim()}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-2xl text-sm transition-all shadow-md shadow-blue-500/20 mt-2"
          >
            Verifikasi Sandi & Masuk Admin
          </button>
        </form>

      </div>
    </div>
  );
};
