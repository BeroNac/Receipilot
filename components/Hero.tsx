'use client';

import { Button } from './ui/button';
import { WalletConnectButton } from './WalletConnectButton';
import { useAccount } from 'wagmi';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function Hero() {
  const { isConnected } = useAccount();

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-28">
      {/* Dot Grid Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid" />

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text Block */}
          <div className="flex flex-col items-center text-center">
            {/* Small label */}
            <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
              {siteConfig.hero.badge}
            </div>

            {/* Headline - reduced 25% from previous */}
            <h1 className="mb-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              {siteConfig.hero.headlineStart}{' '}
              <span className="text-primary">{siteConfig.hero.headlineHighlight}</span>
            </h1>

            {/* Subheadline */}
            <p className="mb-8 max-w-lg text-base text-muted-foreground sm:text-lg">
              {siteConfig.hero.subheadline}
            </p>

            {/* Feature Pills */}
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {siteConfig.hero.pills.map((text) => (
                <div
                  key={text}
                  className="rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground"
                >
                  {text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {!isConnected && <WalletConnectButton label="Connect Wallet" size="xl" />}
              <Button size="xl" variant="outline" asChild>
                <a href="/demo">Try Live Demo</a>
              </Button>
              {isConnected && (
                <Button size="xl" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href="#upload">
                    Start Minting
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12">
              {siteConfig.hero.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Receipt Card with Liquid Glass effect */}
          <div className="relative hidden lg:flex items-center justify-center">

            {/* ── Background scene behind the glass ── */}
            {/* Soft ambient blobs give the glass something to refract */}
            <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
              {/* Large blue blob — top-left */}
              <div
                className="absolute -top-16 -left-16 h-72 w-72 rounded-full opacity-60 blur-3xl"
                style={{ background: 'radial-gradient(circle, #0A48A6 0%, #1e6fd4 60%, transparent 100%)' }}
              />
              {/* Cyan accent blob — bottom-right */}
              <div
                className="absolute -bottom-12 -right-10 h-64 w-64 rounded-full opacity-50 blur-3xl"
                style={{ background: 'radial-gradient(circle, #38bdf8 0%, #0ea5e9 50%, transparent 100%)' }}
              />
              {/* Violet accent blob — top-right */}
              <div
                className="absolute top-8 -right-8 h-48 w-48 rounded-full opacity-40 blur-2xl"
                style={{ background: 'radial-gradient(circle, #818cf8 0%, #6366f1 60%, transparent 100%)' }}
              />
              {/* Warm gold accent — bottom-left */}
              <div
                className="absolute -bottom-4 left-8 h-40 w-40 rounded-full opacity-35 blur-2xl"
                style={{ background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 60%, transparent 100%)' }}
              />
            </div>

            {/* ── Liquid glass container ── */}
            <div
              className="relative rounded-[2.5rem] p-5"
              style={{
                /* Multi-layer glass background */
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 50%, rgba(10,72,166,0.08) 100%)',
                backdropFilter: 'blur(28px) saturate(180%) brightness(1.05)',
                WebkitBackdropFilter: 'blur(28px) saturate(180%) brightness(1.05)',
                /* Border — bright top-left edge, dim bottom-right (light from top-left) */
                border: '1px solid transparent',
                backgroundClip: 'padding-box',
                boxShadow: [
                  /* outer glow */
                  '0 0 0 1px rgba(255,255,255,0.55)',
                  /* specular inner top highlight */
                  'inset 0 1.5px 0 rgba(255,255,255,0.70)',
                  /* inner bottom shadow */
                  'inset 0 -1px 0 rgba(10,72,166,0.15)',
                  /* depth shadow */
                  '0 32px 64px rgba(10,72,166,0.22)',
                  '0 8px 24px rgba(0,0,0,0.12)',
                ].join(', '),
              }}
            >
              {/* Specular glare sweep — top-left shine */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-60"
                style={{
                  background:
                    'linear-gradient(125deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.10) 35%, transparent 60%)',
                }}
              />

              {/* The receipt image itself */}
              <img
                src={siteConfig.receiptImage}
                alt="Receipt Minted - Verified by vLayer"
                className="relative z-10 w-full max-w-[280px] drop-shadow-2xl"
                style={{ background: 'transparent' }}
              />

              {/* Bottom frosted rim */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 rounded-b-[2.5rem] opacity-40"
                style={{
                  background: 'linear-gradient(to top, rgba(10,72,166,0.18) 0%, transparent 100%)',
                }}
              />
            </div>

            {/* Floating micro-pills for visual richness */}
            <div
              className="absolute -top-4 right-8 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(10,72,166,0.85), rgba(56,189,248,0.85))',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.35)',
              }}
            >
              DKIM Verified ✓
            </div>
            <div
              className="absolute -bottom-4 left-8 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.85), rgba(10,72,166,0.85))',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.35)',
              }}
            >
              On-Chain Forever ⬡
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
