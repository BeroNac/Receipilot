import { Hero } from '@/components/Hero';
import { PartnersCarousel } from '@/components/PartnersCarousel';
import { UploadFlow } from '@/components/UploadFlow';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';

export default function Home() {
  const features = [
    {
      title: 'Impossible to Fake',
      description: "Powered by vlayer's ZK Email technology with DKIM verification. Every receipt is cryptographically proven authentic.",
    },
    {
      title: 'Earn Real Money',
      description: 'When product prices rise or items become discontinued, your verified receipt NFT becomes valuable proof of authenticity.',
    },
    {
      title: 'Enterprise Ready',
      description: "We're partnering with major e-commerce platforms to eliminate receipt forgery and streamline warranty claims.",
    },
  ];

  return (
    <div className="relative overflow-hidden dot-grid">
      <Hero />
      
      <section id="upload" className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            How It <span className="text-primary">Works</span>
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
            Why <span className="text-primary">Receipilot</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            The future of verified purchases starts here
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="clean-card card-hover p-8"
            >
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
