'use client';

import React, { useState } from 'react';
import { X, Wallet } from 'lucide-react';

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

  if (!isOpen) return null;

  const handleSaveManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualAddrInput.trim()) {
      onSaveManualAddress(manualAddrInput.trim());
    }
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
            <h3 className="text-xl font-bold text-slate-900">Input Wallet Address</h3>
            <p className="text-xs text-slate-500 font-medium">Masukkan alamat wallet untuk terhubung</p>
          </div>
        </div>

        {/* Literal Manual Wallet Address Form Field */}
        <form onSubmit={handleSaveManual} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              WALLET ADDRESS (0x...)
            </label>
            <input
              type="text"
              value={manualAddrInput}
              onChange={(e) => setManualAddrInput(e.target.value)}
              placeholder="Masukkan Wallet Address (0x...)"
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!manualAddrInput.trim()}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-2xl text-sm transition-all shadow-md shadow-blue-500/20"
          >
            Simpan & Hubungkan Wallet
          </button>
        </form>

      </div>
    </div>
  );
};
