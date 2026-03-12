import { Hero } from '@/components/Hero';
import { PartnersCarousel } from '@/components/PartnersCarousel';
import { UploadFlow } from '@/components/UploadFlow';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { Shield, TrendingUp, Zap } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Impossible to Fake',
      description: "Powered by vlayer's ZK Email technology with DKIM verification. Every receipt is cryptographically proven authentic.",
      color: 'blue',
    },
    {
      icon: TrendingUp,
      title: 'Earn Real Money',
      description: 'When product prices rise or items become discontinued, your verified receipt NFT becomes valuable proof of authenticity.',
      color: 'violet',
    },
    {
      icon: Zap,
      title: 'Enterprise Ready',
      description: "We're partnering with major e-commerce platforms to eliminate receipt forgery and streamline warranty claims.",
      color: 'emerald',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    violet: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  };

  return (
    <div className="relative overflow-hidden">
      <Hero />
      
      <section id="upload" className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            How It <span className="gradient-text">Works</span>
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
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Why <span className="gradient-text">Receipilot</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            The future of verified purchases starts here
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-effect card-hover rounded-2xl p-8"
            >
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <FAQ />
      <CTASection />
    </div>
  );
}
