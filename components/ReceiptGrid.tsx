'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Receipt {
  tokenId: string;
  orderId: string;
  store: string;
  product: string;
  date: string;
  category: 'physical' | 'digital' | 'virtual';
  ipfsUrl: string;
  proofHash: string;
}

interface ReceiptGridProps {
  address: string;
  searchQuery: string;
}

export function ReceiptGrid({ address, searchQuery }: ReceiptGridProps) {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [filteredReceipts, setFilteredReceipts] = useState<Receipt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch from the contract and Supabase
    async function fetchReceipts() {
      try {
        // Simulate API call - replace with actual contract/Supabase queries
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockReceipts: Receipt[] = [
          {
            tokenId: '1',
            orderId: 'AMZ-112-8475638',
            store: 'Amazon',
            product: 'MacBook Pro 16"',
            date: '2026-03-01',
            category: 'physical',
            ipfsUrl: 'ipfs://...',
            proofHash: '0x1234...',
          },
          {
            tokenId: '2',
            orderId: 'STM-991-2847391',
            store: 'Steam',
            product: 'Cyberpunk 2077',
            date: '2026-02-28',
            category: 'digital',
            ipfsUrl: 'ipfs://...',
            proofHash: '0x5678...',
          },
        ];
        
        setReceipts(mockReceipts);
        setFilteredReceipts(mockReceipts);
      } catch (error) {
        console.error('Failed to fetch receipts:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReceipts();
  }, [address]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredReceipts(receipts);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = receipts.filter(
      (receipt) =>
        receipt.orderId.toLowerCase().includes(query) ||
        receipt.store.toLowerCase().includes(query) ||
        receipt.product.toLowerCase().includes(query) ||
        receipt.date.includes(query)
    );
    setFilteredReceipts(filtered);
  }, [searchQuery, receipts]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physical':
        return 'from-blue-500 to-cyan-500';
      case 'digital':
        return 'from-green-500 to-emerald-500';
      case 'virtual':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-muted-foreground">Loading your receipts...</p>
        </div>
      </div>
    );
  }

  if (filteredReceipts.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-lg text-muted-foreground">
            {searchQuery ? 'No receipts match your search' : 'No receipts yet'}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {!searchQuery && 'Mint your first receipt to get started'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredReceipts.map((receipt, index) => (
        <motion.div
          key={receipt.tokenId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="glass-effect group relative overflow-hidden rounded-2xl p-6 transition-all hover:scale-105 hover:shadow-2xl"
        >
          <div
            className={`mb-4 h-12 w-12 rounded-full bg-gradient-to-br ${getCategoryColor(
              receipt.category
            )}`}
          />
          
          <h3 className="mb-2 text-xl font-bold line-clamp-2">{receipt.product}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{receipt.store}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono">{receipt.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span>{receipt.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Token ID</span>
              <span className="font-mono">#{receipt.tokenId}</span>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 p-3 text-center text-xs font-bold text-white">
            VERIFIED BY VLAYER
          </div>

          <a
            href={receipt.ipfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400 opacity-0 transition-opacity group-hover:opacity-100"
          >
            View on IPFS
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      ))}
    </div>
  );
}
