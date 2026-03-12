'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { ReceiptGrid } from '@/components/ReceiptGrid';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function MyReceiptsPage() {
  const { address, isConnected } = useAccount();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-8">
            <svg
              className="mx-auto mb-4 h-20 w-20 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <h1 className="mb-4 text-4xl font-bold">My Receipts</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Connect your wallet to view your verified receipt NFTs
            </p>
          </div>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          My <span className="text-neon-glow text-neon-cyan">Receipts</span>
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          All your verified receipt NFTs in one place
        </p>
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <ReceiptGrid address={address!} searchQuery={searchQuery} />
    </div>
  );
}
