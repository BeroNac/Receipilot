import { http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

if (!projectId) {
  console.warn('WalletConnect Project ID not found. Please add it to .env');
}

export const config = getDefaultConfig({
  appName: 'Receipilot',
  projectId,
  chains: [base, baseSepolia],
  ssr: true,
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  },
});
