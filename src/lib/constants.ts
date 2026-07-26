export const BOT_CHAIN_TESTNET = {
  chainId: 968,
  chainIdHex: '0x3C8',
  chainName: 'BOT Chain Testnet',
  rpcUrl: 'https://rpc.bohr.life',
  currencySymbol: 'BOT',
  blockExplorerUrl: 'https://scan.bohr.life',
};

export const BOT_CHAIN_MAINNET = {
  chainId: 677,
  chainIdHex: '0x2A5',
  chainName: 'BOT Chain Mainnet',
  rpcUrl: 'https://rpc.botchain.ai',
  currencySymbol: 'BOT',
  blockExplorerUrl: 'https://scan.botchain.ai',
};

// Contract Address dipanggil dari env (mendukung NEXT_PUBLIC_CONTRACT_ADDRESS maupun CONTRACT_ADDRESS)
export const DEFAULT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

export const SAMPLE_FIRST_DIPLOMA = {
  diplomaNumber: "IJZ-2026-001",
  studentName: "Joko Widodo",
  major: "Kehutanan / Silvikultur",
  degree: "Insinyur (Ir.) / Sarjana",
  graduationYear: 1985,
  issueDate: 1753459200,
  issuer: "0x1234567890123456789012345678901234567890",
  isValid: true,
};
