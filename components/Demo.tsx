'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ProofAnimation } from './ProofAnimation';
import { useToast } from './ui/use-toast';

export function Demo() {
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [nftMinted, setNftMinted] = useState(false);
  const { toast } = useToast();

  const mockWalletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0';

  const handleSimulate = () => {
    toast({
      title: 'Demo Mode Active',
      description: 'Simulating receipt email injection...',
    });

    setTimeout(() => {
      setIsGeneratingProof(true);
    }, 1000);
  };

  const handleProofComplete = () => {
    setIsGeneratingProof(false);
    setNftMinted(true);
    toast({
      title: 'Demo NFT Minted! 🎉',
      description: 'This was a simulated mint. Connect your real wallet to mint actual NFTs.',
    });
  };

  return (
    <div className="space-y-8">
      {/* Simulated Wallet Connection */}
      <div className="glass-effect rounded-2xl p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Demo Wallet Connected</p>
            <p className="font-mono text-sm">{mockWalletAddress}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          This is a simulated wallet for demo purposes only
        </p>
      </div>

      {/* Demo Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-12 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold">
          Experience the <span className="gradient-text">Full Flow</span>
        </h2>
        <p className="mb-8 text-muted-foreground">
          Click the button below to simulate a complete receipt verification and NFT minting
          process
        </p>

        <Button
          size="xl"
          variant="gradient"
          onClick={handleSimulate}
          disabled={isGeneratingProof || nftMinted}
          className="min-w-[300px]"
        >
          {nftMinted ? 'Demo Complete ✓' : 'Simulate Receipt Email (Demo Mode)'}
        </Button>

        {nftMinted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 rounded-xl border border-green-500/50 bg-green-500/10 p-6"
          >
            <h3 className="mb-2 text-xl font-bold text-green-500">Success!</h3>
            <p className="text-sm text-muted-foreground">
              In a real scenario, your NFT would now be visible in your wallet and on the
              blockchain.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setNftMinted(false);
                toast({
                  title: 'Demo Reset',
                  description: 'You can run the demo again',
                });
              }}
            >
              Reset Demo
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Simulated Receipt Preview */}
      <div className="glass-effect rounded-2xl p-8">
        <h3 className="mb-6 text-xl font-semibold">Simulated Receipt Email</h3>
        <div className="rounded-lg bg-black/50 p-6 font-mono text-sm">
          <div className="mb-4 border-b border-border pb-4">
            <div className="mb-2">
              <span className="text-muted-foreground">From:</span>{' '}
              <span className="text-blue-600 dark:text-blue-400">orders@amazon.com</span>
            </div>
            <div className="mb-2">
              <span className="text-muted-foreground">To:</span> customer@example.com
            </div>
            <div className="mb-2">
              <span className="text-muted-foreground">Subject:</span> Your Amazon.com order
              #112-8475638
            </div>
            <div>
              <span className="text-muted-foreground">Date:</span> March 1, 2026
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <p>Hello,</p>
            <p>Thank you for your order!</p>
            <p className="mt-4 font-bold">Order Details:</p>
            <p>Product: MacBook Pro 16" M3 Max</p>
            <p>Order ID: AMZ-112-8475638</p>
            <p>Date: 2026-03-01</p>
            <p>Total: $3,499.00</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          This email would be verified using DKIM signatures to prove it came from Amazon
        </p>
      </div>

      <ProofAnimation
        isOpen={isGeneratingProof}
        onComplete={handleProofComplete}
        emailSource="demo"
      />
    </div>
  );
}
