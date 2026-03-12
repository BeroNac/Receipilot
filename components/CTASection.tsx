'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export function CTASection() {
  const { isConnected } = useAccount();

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-effect neon-glow relative overflow-hidden rounded-3xl p-12 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-neon-purple/10 to-neon-pink/10" />
        
        <div className="relative z-10">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Join thousands of users protecting their purchases with cryptographic proof.
            Start minting your receipt NFTs today.
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {isConnected ? (
              <Button size="xl" variant="neon" asChild>
                <a href="#upload">Mint Your First Receipt</a>
              </Button>
            ) : (
              <ConnectButton />
            )}
            <Button size="xl" variant="outline" asChild>
              <a href="/demo">Try the Demo</a>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            No credit card required · 2 free mints per week · Zero gas fees
          </p>
        </div>
      </motion.div>
    </section>
  );
}
