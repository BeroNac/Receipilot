'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Sparkles } from 'lucide-react';

export function CTASection() {
  const { isConnected } = useAccount();

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 p-12 text-center text-white"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Start Your Journey
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
            Join thousands of users protecting their purchases with cryptographic proof.
            Start minting your receipt NFTs today.
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {isConnected ? (
              <Button size="xl" variant="secondary" className="bg-white text-blue-600 hover:bg-white/90" asChild>
                <a href="#upload">Mint Your First Receipt</a>
              </Button>
            ) : (
              <ConnectButton />
            )}
            <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="/demo">Try the Demo</a>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/60">
            No credit card required · 2 free mints per week · Zero gas fees
          </p>
        </div>
      </motion.div>
    </section>
  );
}
