'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export function Hero() {
  const { isConnected } = useAccount();

  const exampleNFTs = [
    {
      store: 'Amazon',
      product: 'MacBook Pro 16"',
      orderId: 'AMZ-112-8475638',
      date: '2026-03-01',
      category: 'physical',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      store: 'Steam',
      product: 'Cyberpunk 2077',
      orderId: 'STM-991-2847391',
      date: '2026-02-28',
      category: 'digital',
      color: 'from-green-500 to-emerald-500',
    },
    {
      store: 'Nike',
      product: 'Air Jordan 1 Retro',
      orderId: 'NIKE-445-9382710',
      date: '2026-02-25',
      category: 'virtual',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              Turn Receipts into{' '}
              <span className="text-neon-glow bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
                Verified NFTs
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Transform any online purchase email into a beautiful, cryptographically
              verified NFT in seconds — impossible to fake. Powered by vlayer's
              zero-knowledge technology.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              {isConnected ? (
                <Button size="xl" variant="neon" asChild>
                  <a href="#upload">Start Minting</a>
                </Button>
              ) : (
                <ConnectButton />
              )}
              <Button size="xl" variant="outline" asChild>
                <a href="/demo">Try Demo</a>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-8 text-sm text-muted-foreground">
              <div>
                <div className="text-2xl font-bold text-neon-cyan">2 Free</div>
                <div>mints per week</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neon-purple">100%</div>
                <div>verified on-chain</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neon-pink">$0</div>
                <div>gas fees</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative perspective-card"
          >
            <div className="relative flex justify-center">
              {exampleNFTs.map((nft, index) => (
                <motion.div
                  key={nft.orderId}
                  className="absolute"
                  style={{
                    zIndex: 3 - index,
                    rotate: (index - 1) * 8,
                    y: index * 20,
                  }}
                  animate={{
                    y: [index * 20, index * 20 + 10, index * 20],
                    rotate: [(index - 1) * 8, (index - 1) * 8 + 2, (index - 1) * 8],
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="glass-effect neon-glow h-[400px] w-[400px] rounded-2xl p-8">
                    <div
                      className={`mb-6 h-16 w-16 rounded-full bg-gradient-to-br ${nft.color}`}
                    />
                    <h3 className="mb-2 text-2xl font-bold">{nft.product}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{nft.store}</p>
                    <div className="mt-8 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Order ID</span>
                        <span className="font-mono">{nft.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span>{nft.date}</span>
                      </div>
                    </div>
                    <div className="holographic mt-8 rounded-lg p-4 text-center text-xs font-bold text-black">
                      VERIFIED BY VLAYER
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
