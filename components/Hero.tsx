'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Shield, Zap, Receipt, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

export function Hero() {
  const { isConnected } = useAccount();

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full orb-purple blur-[150px] opacity-30" />
        <div className="absolute bottom-0 right-1/3 h-[500px] w-[500px] rounded-full orb-blue blur-[120px] opacity-20" />
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm"
            >
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span className="text-violet-300">Powered by vlayer ZK Technology</span>
            </motion.div>

            {/* Headline */}
            <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
              Turn Receipts into{' '}
              <span className="gradient-text">Verified NFTs</span>
            </h1>

            {/* Subheadline */}
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Transform any online purchase email into a cryptographically verified NFT 
              in seconds — impossible to fake, forever on-chain.
            </p>

            {/* Feature Pills */}
            <div className="mb-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              {[
                { icon: Shield, text: 'DKIM Verified' },
                { icon: Zap, text: 'Instant Mint' },
                { icon: Receipt, text: 'On-Chain Forever' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
                >
                  <item.icon className="h-4 w-4 text-violet-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              {isConnected ? (
                <Button size="xl" variant="glow" className="gap-2" asChild>
                  <a href="#upload">
                    Start Minting
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              ) : (
                <div className="[&>*]:!h-14 [&>*]:!px-8 [&>*]:!text-base [&>*]:!rounded-xl">
                  <ConnectButton />
                </div>
              )}
              <Button size="xl" variant="outline" asChild>
                <a href="/demo">Try Live Demo</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex justify-center gap-12 lg:justify-start">
              {[
                { value: '2 Free', label: 'mints per week' },
                { value: '100%', label: 'verified' },
                { value: '$0', label: 'gas fees' },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-violet-400 md:text-3xl">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: NFT Card Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto max-w-md">
              {/* Main NFT Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="nft-card p-6"
              >
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl font-bold text-white">
                      A
                    </div>
                    <div>
                      <h3 className="font-semibold">Apple Store</h3>
                      <p className="text-sm text-muted-foreground">Order #W2847395</p>
                    </div>
                  </div>
                  <div className="badge-verified rounded-full px-3 py-1 text-xs font-semibold">
                    Verified
                  </div>
                </div>

                {/* Product */}
                <div className="mb-5 rounded-xl bg-white/5 p-4">
                  <p className="text-lg font-semibold">MacBook Pro 14&quot; M3 Pro</p>
                  <p className="text-sm text-muted-foreground">March 10, 2026</p>
                </div>

                {/* Details */}
                <div className="space-y-3 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verification</span>
                    <span className="text-green-400">DKIM Valid ✓</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network</span>
                    <span className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      Base
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Token ID</span>
                    <span className="font-mono text-violet-400">#4892</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 p-3 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider">
                    Verified by vlayer ZK Proof
                  </p>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-8 -top-8 rounded-xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl"
              >
                <Shield className="h-8 w-8 text-violet-400" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-6 rounded-xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl"
              >
                <CheckCircle className="h-8 w-8 text-green-400" />
              </motion.div>

              {/* Glow effect behind card */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
