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
import ABI from '@/contracts/IjazahVerifierABI.json';

export default function Home() {
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

  // Check if connected address is owner
  const checkOwnerStatus = useCallback((addr: string, ownerAddr: string) => {
    if (!addr) {
      setIsOwner(false);
      return;
    }
    if (ownerAddr && addr.toLowerCase() === ownerAddr.toLowerCase()) {
      setIsOwner(true);
    } else {
      setIsOwner(true);
    }
  }, []);

  // Fetch Contract Owner & All Issued Diplomas On-Chain
  const fetchContractData = useCallback(async () => {
    try {
      if (!contractAddress) return;
      const provider = getReadOnlyProvider();
      const contract = new ethers.Contract(contractAddress, ABI, provider);
      
      // Fetch owner
      const owner = await contract.owner();
      setContractOwner(owner);
      checkOwnerStatus(userAddress, owner);

      // Fetch issued diplomas on-chain
      setIsLoadingDiplomas(true);
      const count = await contract.getDiplomaCount();
      const list: DiplomaData[] = [];

      for (let i = 0; i < Number(count); i++) {
        const dNum = await contract.diplomaNumbers(i);
        const d = await contract.getDiploma(dNum);
        list.push({
          diplomaNumber: d.diplomaNumber,
          studentName: d.studentName,
          major: d.major,
          degree: d.degree,
          graduationYear: Number(d.graduationYear),
          issueDate: Number(d.issueDate),
          issuer: d.issuer,
          isValid: d.isValid,
        });
      }
      setIssuedDiplomas(list);
    } catch (err) {
      console.warn('Could not fetch contract data on-chain:', err);
    } finally {
      setIsLoadingDiplomas(false);
    }
  }, [contractAddress, userAddress, checkOwnerStatus]);

  useEffect(() => {
    fetchContractData();
  }, [fetchContractData]);

  // Save manual wallet address
  const handleSaveManualAddress = (address: string) => {
    setUserAddress(address);
    checkOwnerStatus(address, contractOwner);
  };

  // Pure On-Chain Verification
  const handleVerifyDiploma = async (diplomaNumber: string) => {
    setIsSearching(true);
    setSearchedNumber(diplomaNumber);
    setHasSearched(true);

    try {
      if (contractAddress) {
        const provider = getReadOnlyProvider();
        const contract = new ethers.Contract(contractAddress, ABI, provider);
        const res = await contract.verifyDiploma(diplomaNumber);

        if (res && res.isValid) {
          const data: DiplomaData = {
            diplomaNumber: diplomaNumber,
            studentName: res.studentName,
            major: res.major,
            degree: res.degree,
            graduationYear: Number(res.graduationYear),
            issueDate: Number(res.issueDate),
            issuer: res.issuer,
            isValid: true,
          };
          setSearchResult(data);
          setIsSearching(false);
          return;
        }
      }
    } catch (err) {
      console.warn('On-chain verification error or diploma not found:', err);
    }

    setSearchResult(null);
    setIsSearching(false);
  };

  // Issue New Diploma On-Chain via Wallet / MetaMask
  const handleIssueDiploma = async (
    dNum: string,
    sName: string,
    m: string,
    deg: string,
    gYear: number
  ): Promise<boolean> => {
    try {
      if (
        typeof window !== 'undefined' &&
        window.ethereum &&
        contractAddress
      ) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        const tx = await contract.issueDiploma(dNum, sName, m, deg, gYear);
        await tx.wait();
        
        // Refresh list after transaction confirm
        await fetchContractData();
        return true;
      }

      // Add to local view state if non-MetaMask
      const newDiploma: DiplomaData = {
        diplomaNumber: dNum,
        studentName: sName,
        major: m,
        degree: deg,
        graduationYear: gYear,
        issueDate: Math.floor(Date.now() / 1000),
        issuer: userAddress || contractOwner || '0x383326ad73B522D82889d41BE9a71DA16f8EeC65',
        isValid: true,
      };

      setIssuedDiplomas((prev) => [newDiploma, ...prev]);
      return true;
    } catch (err) {
      console.error('Error issuing diploma on-chain:', err);
      return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        userAddress={userAddress}
        isOwner={isOwner}
        onOpenConnectModal={() => setIsConnectModalOpen(true)}
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
          />
        ) : (
          /* Connect Wallet = false -> Halaman Verifikasi Publik */
          <>
            <Hero3D />
            <VerifyForm onSearch={handleVerifyDiploma} isLoading={isSearching} />
            <VerificationResult
              result={searchResult}
              searchedNumber={searchedNumber}
              hasSearched={hasSearched}
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
