'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CTASection() {
  const { isConnected } = useAccount();

  return (
    <section className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/50 to-indigo-950/50 p-12 text-center md:p-16"
      >
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full orb-purple blur-[100px] opacity-30" />
          <div className="absolute inset-0 grid-bg opacity-50" />
        </div>
        
        <div className="relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
          >
            <Sparkles className="h-4 w-4" />
            Limited Time Offer
          </motion.div>
          
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Ready to <span className="gradient-text">Get Started?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            Join thousands of users protecting their purchases with cryptographic proof.
            Start minting your receipt NFTs today.
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {isConnected ? (
              <Button size="xl" variant="glow" className="gap-2" asChild>
                <a href="#upload">
                  Mint Your First Receipt
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            ) : (
              <div className="[&>*]:!h-14 [&>*]:!px-8 [&>*]:!text-base [&>*]:!rounded-xl">
                <ConnectButton />
              </div>
            )}
            <Button size="xl" variant="outline" asChild>
              <Link href="/demo">Try Live Demo</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              No credit card
            </span>
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              2 free mints/week
            </span>
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Zero gas fees
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
