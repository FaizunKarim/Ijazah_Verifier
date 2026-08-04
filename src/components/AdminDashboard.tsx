'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Award, FilePlus, List, CheckCircle2, RefreshCw } from 'lucide-react';
import { DiplomaData } from '@/lib/types';
import { BOT_CHAIN_MAINNET, DEFAULT_CONTRACT_ADDRESS } from '@/lib/constants';
import { Language, translations } from '@/lib/translations';

interface AdminDashboardProps {
  isOwner: boolean;
  userAddress: string;
  onIssueDiploma: (
    diplomaNumber: string,
    studentName: string,
    major: string,
    degree: string,
    graduationYear: number
  ) => Promise<boolean>;
  issuedDiplomas: DiplomaData[];
  isLoading: boolean;
  onRefreshList: () => void;
  lang: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOwner,
  userAddress,
  onIssueDiploma,
  issuedDiplomas,
  isLoading,
  onRefreshList,
  lang,
}) => {
  const t = translations[lang];

  // Helper generator ID Ijazah Unik (IDN-XXXX-XXXX)
  const generateUniqueDiplomaID = (): string => {
    let newId = '';
    let isDuplicate = true;

    while (isDuplicate) {
      const part1 = Math.floor(1000 + Math.random() * 9000).toString();
      const part2 = Math.floor(1000 + Math.random() * 9000).toString();
      newId = `IDN-${part1}-${part2}`;

      if (newId === 'IDN-0000-0000') continue;

      const exists = issuedDiplomas.some(
        (d) => d.diplomaNumber.toUpperCase() === newId.toUpperCase()
      );
      if (!exists) {
        isDuplicate = false;
      }
    }

    return newId;
  };

  // Form State
  const [diplomaNumber, setDiplomaNumber] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [degree, setDegree] = useState<string>('S.Kom');
  const [graduationYear, setGraduationYear] = useState<number>(new Date().getFullYear());

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Inisialisasi ID Ijazah otomatis saat pertama kali dibuka atau setelah terbit
  useEffect(() => {
    setDiplomaNumber(generateUniqueDiplomaID());
    // eslint-disable-next-deps
  }, [issuedDiplomas.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!diplomaNumber || !studentName || !major || !degree || !graduationYear) {
      setMsg({ type: 'error', text: lang === 'id' ? 'Mohon lengkapi seluruh field form penerbitan ijazah.' : 'Please fill in all diploma form fields.' });
      return;
    }

    const isDuplicate = issuedDiplomas.some(
      (d) => d.diplomaNumber.toUpperCase() === diplomaNumber.trim().toUpperCase()
    );
    if (isDuplicate) {
      setMsg({
        type: 'error',
        text: `${lang === 'id' ? 'Nomor Ijazah' : 'Diploma Number'} "${diplomaNumber}" ${lang === 'id' ? 'sudah terdaftar di Smart Contract!' : 'is already registered in Smart Contract!'}`,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onIssueDiploma(
        diplomaNumber.trim(),
        studentName.trim(),
        major.trim(),
        degree.trim(),
        Number(graduationYear)
      );

      if (success) {
        setMsg({
          type: 'success',
          text: `${lang === 'id' ? 'Ijazah' : 'Diploma'} "${diplomaNumber}" ${lang === 'id' ? 'berhasil diterbitkan ke BOT Chain!' : 'successfully issued to BOT Chain!'}`,
        });
        setDiplomaNumber(generateUniqueDiplomaID());
        setStudentName('');
        setMajor('');
      } else {
        setMsg({ type: 'error', text: lang === 'id' ? 'Gagal menerbitkan ijazah. Periksa transaksi MetaMask Anda.' : 'Failed to issue diploma. Check your MetaMask transaction.' });
      }
    } catch (err: unknown) {
      console.error('Error issuing diploma:', err);
      setMsg({
        type: 'error',
        text: lang === 'id'
          ? 'Transaksi Dibatalkan / Gagal: Saldo BOT tidak mencukupi untuk Gas Fee atau transaksi ditolak di MetaMask.'
          : 'Transaction Canceled / Failed: Insufficient BOT balance for Gas Fee or transaction rejected in MetaMask.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const truncatedUserAddress = userAddress
    ? `${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}`
    : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner Access Status */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-blue-500/30">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full border border-blue-400/20 inline-block mb-1">
              {t.adminBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.adminTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              {t.adminWalletStatus} <span className="text-emerald-400 font-bold">{truncatedUserAddress}</span> ({isOwner ? 'Owner' : 'Authorized Signer'})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10 w-full md:w-auto justify-between md:justify-end">
          <div className="bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">{t.totalIssued}</span>
            <span className="text-2xl font-black text-amber-400 font-mono">{issuedDiplomas.length}</span>
          </div>

          <button
            onClick={onRefreshList}
            disabled={isLoading}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-2xl transition-all border border-slate-700 cursor-pointer disabled:opacity-50"
            title="Refresh List"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Grid: Form Left (col-5) & Table Right (col-7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Penerbitan Ijazah (Issue Diploma Form) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
          
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FilePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{t.formIssueTitle}</h3>
              <p className="text-xs text-slate-500">{t.formIssueDesc}</p>
            </div>
          </div>

          {/* Feedback Alert Message */}
          {msg && (
            <div
              className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-3 ${
                msg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {msg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
              )}
              <span>{msg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            
            {/* Field 1: Nomor Ijazah Unik (Ter-generate & Terkunci) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  {t.diplomaNumLabel}
                </label>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  {t.lockedBadge}
                </span>
              </div>
              <input
                type="text"
                value={diplomaNumber}
                readOnly
                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-mono font-bold text-sm cursor-not-allowed select-none"
              />
            </div>

            {/* Field 2: Nama Mahasiswa */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                {t.studentNameLabel}
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="misal: Ir. Joko Widodo / Joko Widodo"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
              />
            </div>

            {/* Field 3 & 4: Prodi & Gelar */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  {t.majorLabel}
                </label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="misal: Kehutanan"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  {t.degreeLabel}
                </label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                >
                  <option value="Ir.">Ir. (Insinyur)</option>
                  <option value="Dr.">Dr. (Doktor)</option>
                  <option value="Drs.">Drs. (Drs)</option>
                  <option value="S.Hut.">S.Hut. (Sarjana Kehutanan)</option>
                  <option value="S.Kom">S.Kom (Sarjana Komputer)</option>
                  <option value="S.T">S.T (Sarjana Teknik)</option>
                  <option value="S.E">S.E (Sarjana Ekonomi)</option>
                  <option value="M.T.">M.T. (Magister Teknik)</option>
                  <option value="M.Kom">M.Kom (Magister Komputer)</option>
                </select>
              </div>
            </div>

            {/* Field 5: Tahun Lulus */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                {t.gradYearLabel}
              </label>
              <input
                type="number"
                value={graduationYear}
                onChange={(e) => setGraduationYear(Number(e.target.value))}
                min="1950"
                max="2100"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2 text-sm pt-4"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>{t.issueSubmittingBtn}</span>
                </>
              ) : (
                <>
                  <FilePlus className="w-4 h-4" />
                  <span>{t.issueSubmitBtn}</span>
                </>
              )}
            </button>

          </form>

        </div>

        {/* Tabel Daftar Ijazah Terbit (Issued Diploma List) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <List className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t.issuedListTitle}</h3>
                <p className="text-xs text-slate-500">{t.issuedListDesc}</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {issuedDiplomas.length} Record{issuedDiplomas.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-mono tracking-wider">
                  <th className="p-3.5 font-bold">{t.colNum}</th>
                  <th className="p-3.5 font-bold">{t.colName}</th>
                  <th className="p-3.5 font-bold">{t.colMajor}</th>
                  <th className="p-3.5 font-bold">{t.colYear}</th>
                  <th className="p-3.5 font-bold">{t.colStatus}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {issuedDiplomas.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 italic">
                      {t.emptyList}
                    </td>
                  </tr>
                ) : (
                  issuedDiplomas.map((d, index) => (
                    <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-blue-600">{d.diplomaNumber}</td>
                      <td className="p-3.5 font-bold text-slate-900">{d.studentName}</td>
                      <td className="p-3.5">{d.major}</td>
                      <td className="p-3.5 font-mono">{d.graduationYear}</td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md font-bold text-[10px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {t.statusValid}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
};
