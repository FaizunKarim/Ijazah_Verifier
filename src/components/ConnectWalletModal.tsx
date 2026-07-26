'use client';

import React, { useState } from 'react';
import { X, Wallet, Shield, CheckCircle2, Copy, AlertCircle } from 'lucide-react';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAddress: string;
  contractAddress: string;
  onConnectMetaMask: () => Promise<void>;
  onSaveManualAddress: (address: string) => void;
  onSaveContractAddress: (contractAddr: string) => void;
  isOwner: boolean;
}

export const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
  userAddress,
  contractAddress,
  onConnectMetaMask,
  onSaveManualAddress,
  onSaveContractAddress,
  isOwner,
}) => {
  const [manualAddrInput, setManualAddrInput] = useState<string>(userAddress || '');
  const [contractAddrInput, setContractAddrInput] = useState<string>(contractAddress || '');
  const [copied, setCopied] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleMetaMask = async () => {
    setIsConnecting(true);
    try {
      await onConnectMetaMask();
    } catch (err) {
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSaveManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualAddrInput.trim()) {
      onSaveManualAddress(manualAddrInput.trim());
    }
    if (contractAddrInput.trim()) {
      onSaveContractAddress(contractAddrInput.trim());
    }
    onClose();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <h3 className="text-xl font-bold text-slate-900">Koneksi Wallet</h3>
            <p className="text-xs text-slate-500 font-medium">MetaMask & Wallet Address Field</p>
          </div>
        </div>

        {/* Option 1: Automatic MetaMask Connection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            METODE 1: KONEKSI METAMASK OTOMATIS
          </label>
          <button
            onClick={handleMetaMask}
            disabled={isConnecting}
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                🦊
              </span>
              <span>{isConnecting ? 'Menghubungkan...' : 'Connect dengan MetaMask'}</span>
            </div>
            <span className="text-xs bg-white/20 px-2.5 py-1 rounded-lg group-hover:bg-white/30">
              Auto Detect
            </span>
          </button>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase">atau</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Option 2: Manual Wallet Address Form Field */}
        <form onSubmit={handleSaveManual} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              METODE 2: INPUT FORM WALLET ADDRESS
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Masukkan alamat wallet Anda (`0x...`) untuk verifikasi identitas atau testing role Admin.
            </p>
            <input
              type="text"
              value={manualAddrInput}
              onChange={(e) => setManualAddrInput(e.target.value)}
              placeholder="Masukkan Wallet Address (0x...)"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              ALAMAT SMART CONTRACT DEPLOYED (BOT CHAIN)
            </label>
            <input
              type="text"
              value={contractAddrInput}
              onChange={(e) => setContractAddrInput(e.target.value)}
              placeholder="Masukkan Deployed Contract Address (0x...)"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-sm"
          >
            Simpan Alamat & Terhubung
          </button>
        </form>

        {/* Status Indicator */}
        {userAddress && (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Wallet Terhubung:
              </span>
              <button
                onClick={() => copyToClipboard(userAddress)}
                className="text-[10px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                {copied ? 'Tercopy!' : 'Copy'}
              </button>
            </div>
            <p className="font-mono text-xs text-blue-800 break-all font-semibold bg-white p-2 rounded-lg border border-blue-100">
              {userAddress}
            </p>
            {isOwner ? (
              <span className="inline-block text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                👑 Status: OWNER / ADMIN CONTRACT
              </span>
            ) : (
              <span className="inline-block text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                👤 Status: Publik User / Guest Wallet
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
