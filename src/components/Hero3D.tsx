'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Award, Sparkles, Database, CheckCircle2 } from 'lucide-react';

export const Hero3D: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-blue-50/50 via-slate-50 to-slate-50">
      {/* Background Decorative Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/15 via-indigo-300/10 to-amber-200/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-blue-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Teknologi Smart Contract BOT Chain (EVM)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Verifikasi{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
                Keaslian Ijazah
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Verifikasi Ijazah melalui On Chain. Mencegah pemalsuan dokumen akademik secara mutlak.
            </p>

            {/* Key Benefits Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-medium text-slate-700">
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Tanpa Login / Wallet (Publik)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Terdaftar di BOT Chain</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Tanda Tangan Kriptografi</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Floating Diploma Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* 3D Container Wrapper with Perspective */}
            <div className="relative w-full max-w-md aspect-[4/5] perspective-1000">
              
              {/* Floating Orbit Rings */}
              <div className="absolute inset-0 rounded-3xl border-2 border-blue-400/20 rotate-6 scale-105 animate-float-slow pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl border-2 border-amber-300/30 -rotate-3 scale-95 animate-float-slow pointer-events-none" style={{ animationDelay: '1.5s' }} />

              {/* Main 3D Glassmorphism Diploma Card */}
              <div className="relative w-full h-full bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-2xl shadow-blue-900/10 flex flex-col justify-between transform hover:rotate-1 hover:scale-102 transition-all duration-500 group">
                
                {/* Header Card with Logo */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-md relative">
                    <Image
                      src="/ugm.webp"
                      alt="Universitas Gadjah Mada Seal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Universitas Gadjah Mada</h4>
                    <p className="text-xs text-slate-500 font-mono">Fakultas Kehutanan</p>
                  </div>
                </div>

                {/* Body Card: Sample Diploma Visual */}
                <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-100/80 text-center space-y-2">
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-blue-600 uppercase bg-blue-100/60 px-2.5 py-1 rounded-md">
                    IJAZAH SARJANA ON-CHAIN
                  </span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Ir. Joko Widodo
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Program Studi Kehutanan (1986)
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Status: VERIFIED (IDN-2789-3245)</span>
                  </div>
                </div>

                {/* Footer Card: Blockchain Hash & QR Visual */}
                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <div>
                    <p className="text-[10px] text-slate-400">SMART CONTRACT</p>
                    <p className="font-semibold text-slate-800">BOT Chain Mainnet (#677)</p>
                  </div>
                  <div className="px-3 py-1 bg-slate-900 text-amber-400 rounded-lg text-[10px] font-bold tracking-wider">
                    EVM VALIDATED
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
