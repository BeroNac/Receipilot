import { Hero } from '@/components/Hero';
import { PartnersCarousel } from '@/components/PartnersCarousel';
import { UploadFlow } from '@/components/UploadFlow';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-neon-cyan opacity-10 blur-[120px]" />
        <div className="absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-neon-purple opacity-10 blur-[120px]" />
      </div>

      <Hero />
      
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            How It <span className="text-neon-glow text-neon-cyan">Works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Three simple steps to transform your purchase emails into verified digital assets
          </p>
        </div>
        <UploadFlow />
      </section>

      <PartnersCarousel />

      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Why <span className="text-neon-glow text-neon-purple">Receipilot</span>?
          </h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="glass-effect rounded-2xl p-8 transition-all hover:scale-105">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon-cyan/20">
              <svg
                className="h-7 w-7 text-neon-cyan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold">Impossible to Fake</h3>
            <p className="text-muted-foreground">
              Powered by vlayer's ZK Email technology with DKIM verification. Every receipt is cryptographically proven authentic.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 transition-all hover:scale-105">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon-purple/20">
              <svg
                className="h-7 w-7 text-neon-purple"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold">Earn Real Money</h3>
            <p className="text-muted-foreground">
              When product prices rise or items become discontinued, your verified receipt NFT becomes valuable proof of authenticity.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 transition-all hover:scale-105">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon-pink/20">
              <svg
                className="h-7 w-7 text-neon-pink"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold">Enterprise Ready</h3>
            <p className="text-muted-foreground">
              We're partnering with major e-commerce platforms to eliminate receipt forgery and streamline warranty claims.
            </p>
          </div>
        </div>
      </section>

      <FAQ />
      <CTASection />
    </div>
  );
}
