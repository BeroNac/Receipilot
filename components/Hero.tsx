'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Shield, Zap, Receipt, CheckCircle } from 'lucide-react';

export function Hero() {
  const { isConnected } = useAccount();

  const features = [
    { icon: Shield, text: 'Cryptographically Verified' },
    { icon: Zap, text: 'Instant Minting' },
    { icon: Receipt, text: 'Forever On-Chain' },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              <CheckCircle className="h-4 w-4" />
              Powered by vlayer ZK Technology
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Turn Receipts into{' '}
              <span className="gradient-text">Verified NFTs</span>
            </h1>

            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Transform any online purchase email into a beautiful, cryptographically
              verified NFT in seconds — impossible to fake.
            </p>

            <div className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <feature.icon className="h-4 w-4 text-blue-500" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              {isConnected ? (
                <Button size="xl" variant="gradient" asChild>
                  <a href="#upload">Start Minting</a>
                </Button>
              ) : (
                <ConnectButton />
              )}
              <Button size="xl" variant="outline" asChild>
                <a href="/demo">Try Demo</a>
              </Button>
            </div>

            <div className="mt-10 flex items-center justify-center gap-8 text-sm lg:justify-start">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">2 Free</div>
                <div className="text-muted-foreground">mints per week</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">100%</div>
                <div className="text-muted-foreground">verified on-chain</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">$0</div>
                <div className="text-muted-foreground">gas fees</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Main card */}
              <div className="glass-effect card-hover rounded-2xl p-6 shadow-2xl">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-white font-bold">
                      A
                    </div>
                    <div>
                      <h3 className="font-semibold">Amazon</h3>
                      <p className="text-sm text-muted-foreground">Order #AMZ-112-8475638</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    Verified
                  </div>
                </div>

                <div className="mb-4 rounded-xl bg-muted/50 p-4">
                  <p className="text-lg font-semibold">MacBook Pro 16&quot;</p>
                  <p className="text-sm text-muted-foreground">Purchased on March 1, 2026</p>
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verification</span>
                    <span className="font-medium text-emerald-600">DKIM Signature Valid</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network</span>
                    <span className="font-medium">Base</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Token ID</span>
                    <span className="font-mono text-xs">#1847</span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 p-3 text-center">
                  <p className="text-xs font-semibold text-white">VERIFIED BY VLAYER ZK PROOF</p>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-4 -top-4 rounded-xl bg-white p-3 shadow-lg dark:bg-slate-800"
              >
                <Shield className="h-6 w-6 text-blue-500" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 rounded-xl bg-white p-3 shadow-lg dark:bg-slate-800"
              >
                <CheckCircle className="h-6 w-6 text-emerald-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
