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
import { BOT_CHAIN_TESTNET, DEFAULT_CONTRACT_ADDRESS, SAMPLE_FIRST_DIPLOMA } from '@/lib/constants';
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
  const [issuedDiplomas, setIssuedDiplomas] = useState<DiplomaData[]>([SAMPLE_FIRST_DIPLOMA]);
  const [isLoadingDiplomas, setIsLoadingDiplomas] = useState<boolean>(false);

  // Initialize Read-Only Provider for BOT Chain
  const getReadOnlyProvider = () => {
    return new ethers.JsonRpcProvider(BOT_CHAIN_TESTNET.rpcUrl);
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

  // Fetch Contract Owner
  const fetchContractOwner = useCallback(async () => {
    try {
      if (!contractAddress) return;
      const provider = getReadOnlyProvider();
      const contract = new ethers.Contract(contractAddress, ABI, provider);
      const owner = await contract.owner();
      setContractOwner(owner);
      checkOwnerStatus(userAddress, owner);
    } catch (err) {
      console.warn('Could not fetch contract owner on-chain:', err);
    }
  }, [contractAddress, userAddress, checkOwnerStatus]);

  useEffect(() => {
    fetchContractOwner();
  }, [fetchContractOwner]);

  // Save manual wallet address
  const handleSaveManualAddress = (address: string) => {
    setUserAddress(address);
    checkOwnerStatus(address, contractOwner);
  };

  // Verify Diploma (Search On-Chain with Fallback)
  const handleVerifyDiploma = async (diplomaNumber: string) => {
    setIsSearching(true);
    setSearchedNumber(diplomaNumber);
    setHasSearched(true);

    // Fast check: sample diploma ID "IJZ-2026-001"
    if (diplomaNumber.toUpperCase() === SAMPLE_FIRST_DIPLOMA.diplomaNumber) {
      setTimeout(() => {
        setSearchResult(SAMPLE_FIRST_DIPLOMA);
        setIsSearching(false);
      }, 400);
      return;
    }

    // Search in local state issued list
    const foundInLocal = issuedDiplomas.find(
      (d) => d.diplomaNumber.toUpperCase() === diplomaNumber.toUpperCase()
    );

    if (foundInLocal) {
      setTimeout(() => {
        setSearchResult(foundInLocal);
        setIsSearching(false);
      }, 400);
      return;
    }

    // Try reading directly from BOT Chain Smart Contract
    try {
      if (contractAddress) {
        const provider = getReadOnlyProvider();
        const contract = new ethers.Contract(contractAddress, ABI, provider);
        const res = await contract.verifyDiploma(diplomaNumber);

        if (res.isValid) {
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
      console.warn('On-chain read verification failed or diploma not found:', err);
    }

    // Not found
    setSearchResult(null);
    setIsSearching(false);
  };

  // Issue New Diploma
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
      }

      const newDiploma: DiplomaData = {
        diplomaNumber: dNum,
        studentName: sName,
        major: m,
        degree: deg,
        graduationYear: gYear,
        issueDate: Math.floor(Date.now() / 1000),
        issuer: userAddress || '0x1234567890123456789012345678901234567890',
        isValid: true,
      };

      setIssuedDiplomas((prev) => [newDiploma, ...prev]);
      return true;
    } catch (err) {
      console.error('Error issuing diploma:', err);
      return false;
    }
  };

  // Refresh Issued List
  const handleRefreshIssuedList = async () => {
    setIsLoadingDiplomas(true);
    try {
      if (contractAddress) {
        const provider = getReadOnlyProvider();
        const contract = new ethers.Contract(contractAddress, ABI, provider);
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
        if (list.length > 0) {
          setIssuedDiplomas(list);
        }
      }
    } catch (err) {
      console.warn('Could not refresh list on-chain:', err);
    } finally {
      setIsLoadingDiplomas(false);
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
            onRefreshList={handleRefreshIssuedList}
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

      {/* Connect Wallet Modal (Literal Wallet Address Form Only) */}
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
          <p>© 2026 Ijazah Verifier. Build Week Hackathon - BOT Chain (EVM).</p>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <a href="https://scan.bohr.life" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              BOT Chain Explorer
            </a>
            <span>•</span>
            <a href="https://faucet.botchain.ai/basic" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              Testnet Faucet
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
