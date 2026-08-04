'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Navbar } from '@/components/Navbar';
import { Hero3D } from '@/components/Hero3D';
import { VerifyForm } from '@/components/VerifyForm';
import { VerificationResult } from '@/components/VerificationResult';
import { ConnectWalletModal } from '@/components/ConnectWalletModal';
import { AdminDashboard } from '@/components/AdminDashboard';
import { DiplomaData } from '@/lib/types';
import { BOT_CHAIN_MAINNET, DEFAULT_CONTRACT_ADDRESS } from '@/lib/constants';
import { Language } from '@/lib/translations';
import ABI from '@/contracts/IjazahVerifierABI.json';

export default function Home() {
  // Language State: 'id' (Indonesia) | 'en' (English)
  const [lang, setLang] = useState<Language>('id');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  // Wallet State
  const [userAddress, setUserAddress] = useState<string>('');
  const [contractAddress] = useState<string>(DEFAULT_CONTRACT_ADDRESS);
  const [contractOwner, setContractOwner] = useState<string>('');
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);

  // Verification Search State
  const [searchResult, setSearchResult] = useState<DiplomaData | null>(null);
  const [searchedNumber, setSearchedNumber] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Admin Issued Diplomas List
  const [issuedDiplomas, setIssuedDiplomas] = useState<DiplomaData[]>([]);
  const [isLoadingDiplomas, setIsLoadingDiplomas] = useState<boolean>(false);

  // Initialize Read-Only Provider for BOT Chain Mainnet
  const getReadOnlyProvider = () => {
    return new ethers.JsonRpcProvider(BOT_CHAIN_MAINNET.rpcUrl);
  };

  // Helper to switch MetaMask network to BOT Chain Mainnet automatically
  const switchToBotChain = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: BOT_CHAIN_MAINNET.chainIdHex }], // '0x2A5' (Chain ID 677)
        });
      } catch (switchError: unknown) {
        const errObj = switchError as { code?: number };
        if (errObj && errObj.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: BOT_CHAIN_MAINNET.chainIdHex,
                  chainName: BOT_CHAIN_MAINNET.chainName,
                  rpcUrls: [BOT_CHAIN_MAINNET.rpcUrl],
                  nativeCurrency: {
                    name: 'BOT Token',
                    symbol: BOT_CHAIN_MAINNET.currencySymbol,
                    decimals: 18,
                  },
                  blockExplorerUrls: [BOT_CHAIN_MAINNET.blockExplorerUrl],
                },
              ],
            });
          } catch (addError) {
            console.error('Failed to add BOT Chain to MetaMask', addError);
          }
        }
      }
    }
  };

  // Check if connected address is owner dynamically from Smart Contract
  const checkOwnerStatus = useCallback((addr: string, ownerAddr: string) => {
    if (!addr || !ownerAddr) {
      setIsOwner(false);
      return;
    }
    if (addr.toLowerCase() === ownerAddr.toLowerCase()) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, []);

  // Fetch Contract Owner & All Issued Diplomas On-Chain (Strict On-Chain Source of Truth)
  const fetchContractData = useCallback(async () => {
    let onChainList: DiplomaData[] = [];
    try {
      if (contractAddress) {
        const provider = getReadOnlyProvider();
        const contract = new ethers.Contract(contractAddress, ABI, provider);
        
        // Fetch owner on-chain
        const owner = await contract.owner();
        setContractOwner(owner);
        checkOwnerStatus(userAddress, owner);

        setIsLoadingDiplomas(true);

        // 1. Direct query via getAllDiplomaNumbers()
        try {
          const allNumbers: string[] = await contract.getAllDiplomaNumbers();
          for (const dNum of allNumbers) {
            try {
              const d = await contract.getDiploma(dNum);
              if (d && (d.isValid || d[7])) {
                onChainList.push({
                  diplomaNumber: d.diplomaNumber || d[0] || dNum,
                  studentName: d.studentName || d[1],
                  major: d.major || d[2],
                  degree: d.degree || d[3],
                  graduationYear: Number(d.graduationYear || d[4]),
                  issueDate: Number(d.issueDate || d[5]),
                  issuer: d.issuer || d[6],
                  isValid: true,
                });
              }
            } catch (e) {}
          }
        } catch (e) {}

        // 2. Query historical DiplomaIssued events on-chain
        try {
          const events = await contract.queryFilter(contract.filters.DiplomaIssued(), 0, 'latest');
          events.forEach((ev: unknown) => {
            const eventObj = ev as { args?: Record<string, unknown> };
            if (eventObj && eventObj.args) {
              const a = eventObj.args;
              const dNum = (a.diplomaNumber as string) || (a[1] as string);
              if (dNum) {
                onChainList.push({
                  diplomaNumber: dNum,
                  studentName: (a.studentName as string) || (a[2] as string),
                  major: (a.major as string) || (a[3] as string),
                  degree: (a.degree as string) || (a[4] as string),
                  graduationYear: Number(a.graduationYear || a[5]),
                  issueDate: Number(a.issueDate || a[6]),
                  issuer: (a.issuer as string) || (a[7] as string),
                  isValid: true,
                });
              }
            }
          });
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Could not fetch contract data on-chain:', err);
    } finally {
      setIsLoadingDiplomas(false);
    }

    // Deduplicate on-chain records
    const combinedMap = new Map<string, DiplomaData>();
    onChainList.forEach((d) => combinedMap.set(d.diplomaNumber.toUpperCase(), d));
    const finalList = Array.from(combinedMap.values());

    setIssuedDiplomas(finalList);

    // Sync clean list to LocalStorage (clears out any old failed records)
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('IJAZAH_VERIFIER_ISSUED_DIPLOMAS', JSON.stringify(finalList));
      }
    } catch (e) {}
  }, [contractAddress, userAddress, checkOwnerStatus]);

  useEffect(() => {
    fetchContractData();
  }, [fetchContractData]);

  // Save manual wallet address
  const handleSaveManualAddress = (address: string) => {
    setUserAddress(address);
    checkOwnerStatus(address, contractOwner);
  };

  // Pure On-Chain Verification + Fallback Local Check
  const handleVerifyDiploma = async (diplomaNumber: string) => {
    setIsSearching(true);
    setSearchedNumber(diplomaNumber);
    setHasSearched(true);

    try {
      if (contractAddress) {
        const provider = getReadOnlyProvider();
        const contract = new ethers.Contract(contractAddress, ABI, provider);
        const res = await contract.verifyDiploma(diplomaNumber);

        const isValid = Boolean(res.isValid ?? res[0]);
        const studentName = res.studentName || res[1];
        const major = res.major || res[2];
        const degree = res.degree || res[3];
        const graduationYear = Number(res.graduationYear || res[4]);
        const issueDate = Number(res.issueDate || res[5]);
        const issuer = res.issuer || res[6];

        if (isValid) {
          const data: DiplomaData = {
            diplomaNumber: diplomaNumber,
            studentName: studentName,
            major: major,
            degree: degree,
            graduationYear: graduationYear,
            issueDate: issueDate,
            issuer: issuer,
            isValid: true,
          };
          setSearchResult(data);
          setIsSearching(false);
          return;
        }
      }
    } catch (err) {
      console.warn('On-chain verification query fallback:', err);
    }

    // Check LocalStorage fallback if RPC query doesn't find it
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('IJAZAH_VERIFIER_ISSUED_DIPLOMAS');
        if (cached) {
          const list: DiplomaData[] = JSON.parse(cached);
          const match = list.find((d) => d.diplomaNumber.toUpperCase() === diplomaNumber.trim().toUpperCase());
          if (match) {
            setSearchResult(match);
            setIsSearching(false);
            return;
          }
        }
      }
    } catch (e) {}

    // Check Mockup IDN-2789-3245 fallback for quick demo
    if (diplomaNumber.trim().toUpperCase() === 'IDN-2789-3245') {
      setSearchResult({
        diplomaNumber: 'IDN-2789-3245',
        studentName: 'Joko Widodo',
        major: lang === 'id' ? 'Kehutanan' : 'Forestry',
        degree: 'Ir.',
        graduationYear: 1986,
        issueDate: 1785814680, // 4 Agustus 2026 pukul 10.38
        issuer: '0x383326ad73B522D82889d41BE9a71DA16f8EeC65',
        isValid: true,
      });
      setIsSearching(false);
      return;
    }

    setSearchResult(null);
    setIsSearching(false);
  };

  // Issue New Diploma On-Chain via Wallet / MetaMask (Strict Transaction Validation)
  const handleIssueDiploma = async (
    dNum: string,
    sName: string,
    m: string,
    deg: string,
    gYear: number
  ): Promise<boolean> => {
    const newDiploma: DiplomaData = {
      diplomaNumber: dNum,
      studentName: sName,
      major: m,
      degree: deg,
      graduationYear: gYear,
      issueDate: Math.floor(Date.now() / 1000),
      issuer: userAddress || contractOwner,
      isValid: true,
    };

    // If MetaMask is installed, execute transaction on-chain strictly
    if (
      typeof window !== 'undefined' &&
      window.ethereum &&
      contractAddress
    ) {
      try {
        // Automatically switch MetaMask network to BOT Chain Mainnet before transaction
        await switchToBotChain();

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        const tx = await contract.issueDiploma(dNum, sName, m, deg, gYear);
        
        // Wait for on-chain block mining confirmation
        const receipt = await tx.wait();
        if (!receipt || receipt.status !== 1) {
          throw new Error('Transaksi gagal di blockchain.');
        }

        // Save to state and LocalStorage ONLY IF transaction succeeded
        setIssuedDiplomas((prev) => {
          const updated = [newDiploma, ...prev.filter((x) => x.diplomaNumber.toUpperCase() !== dNum.toUpperCase())];
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem('IJAZAH_VERIFIER_ISSUED_DIPLOMAS', JSON.stringify(updated));
            }
          } catch (e) {}
          return updated;
        });

        // Refresh contract data
        await fetchContractData();
        return true;
      } catch (err: unknown) {
        console.error('MetaMask transaction failed or canceled:', err);
        throw err;
      }
    }

    // Manual Local Fallback mode (only if window.ethereum is not present)
    setIssuedDiplomas((prev) => {
      const updated = [newDiploma, ...prev.filter((x) => x.diplomaNumber.toUpperCase() !== dNum.toUpperCase())];
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('IJAZAH_VERIFIER_ISSUED_DIPLOMAS', JSON.stringify(updated));
        }
      } catch (e) {}
      return updated;
    });

    return true;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar with Language Switcher */}
      <Navbar
        userAddress={userAddress}
        isOwner={isOwner}
        onOpenConnectModal={() => setIsConnectModalOpen(true)}
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* Main Content Area: Automatic Switch based on Connect Wallet state */}
      <main className="flex-grow">
        {userAddress ? (
          /* Connect Wallet = true -> Otomatis Tampil Admin Dashboard */
          <AdminDashboard
            isOwner={isOwner}
            userAddress={userAddress}
            onIssueDiploma={handleIssueDiploma}
            issuedDiplomas={issuedDiplomas}
            isLoading={isLoadingDiplomas}
            onRefreshList={fetchContractData}
            lang={lang}
          />
        ) : (
          /* Connect Wallet = false -> Halaman Verifikasi Publik */
          <>
            <Hero3D lang={lang} />
            <VerifyForm onSearch={handleVerifyDiploma} isLoading={isSearching} lang={lang} />
            <VerificationResult
              result={searchResult}
              searchedNumber={searchedNumber}
              hasSearched={hasSearched}
              lang={lang}
            />
          </>
        )}
      </main>

      {/* Connect Wallet Modal */}
      <ConnectWalletModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        userAddress={userAddress}
        onSaveManualAddress={handleSaveManualAddress}
        isOwner={isOwner}
        contractOwner={contractOwner}
        lang={lang}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Ijazah Verifier. Build Week Hackathon - BOT Chain Mainnet.</p>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <a href="https://scan.botchain.ai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              BOT Chain Explorer
            </a>
            <span>•</span>
            <a href="https://dex.botchain.ai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              BOT DEX
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
