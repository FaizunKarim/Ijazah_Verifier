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

// Contract Address dipanggil murni dari env
export const DEFAULT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
