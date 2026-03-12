'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { sanityClient } from '@/sanity/lib/client';

interface Partner {
  _id: string;
  name: string;
  logo: {
    asset: {
      url: string;
    };
  };
  isComingSoon: boolean;
}

export function PartnersCarousel() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const data = await sanityClient.fetch<Partner[]>(
          `*[_type == "partner"] | order(order asc) {
            _id,
            name,
            logo {
              asset-> {
                url
              }
            },
            isComingSoon
          }`
        );
        setPartners(data);
      } catch (error) {
        console.error('Failed to fetch partners:', error);
        // Fallback to default partners
        setPartners(getDefaultPartners());
      } finally {
        setIsLoading(false);
      }
    }

    fetchPartners();
  }, []);

  function getDefaultPartners(): Partner[] {
    return [
      {
        _id: '1',
        name: 'Amazon',
        logo: { asset: { url: '/partners/amazon.svg' } },
        isComingSoon: false,
      },
      {
        _id: '2',
        name: 'eBay',
        logo: { asset: { url: '/partners/ebay.svg' } },
        isComingSoon: false,
      },
      {
        _id: '3',
        name: 'Nike',
        logo: { asset: { url: '/partners/nike.svg' } },
        isComingSoon: false,
      },
      {
        _id: '4',
        name: 'Adidas',
        logo: { asset: { url: '/partners/adidas.svg' } },
        isComingSoon: false,
      },
      {
        _id: '5',
        name: 'Steam',
        logo: { asset: { url: '/partners/steam.svg' } },
        isComingSoon: false,
      },
      {
        _id: '6',
        name: 'Apple',
        logo: { asset: { url: '/partners/apple.svg' } },
        isComingSoon: false,
      },
      {
        _id: '7',
        name: 'Best Buy',
        logo: { asset: { url: '/partners/bestbuy.svg' } },
        isComingSoon: true,
      },
      {
        _id: '8',
        name: 'Target',
        logo: { asset: { url: '/partners/target.svg' } },
        isComingSoon: true,
      },
      {
        _id: '9',
        name: 'Walmart',
        logo: { asset: { url: '/partners/walmart.svg' } },
        isComingSoon: true,
      },
      {
        _id: '10',
        name: 'More Coming',
        logo: { asset: { url: '/partners/placeholder.svg' } },
        isComingSoon: true,
      },
    ];
  }

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="mb-12 text-4xl font-bold">Loading Partners...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">
          Trusted by <span className="text-neon-glow text-neon-purple">Leading Brands</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          We're partnering with major e-commerce platforms to bring verified receipts to
          everyone
        </p>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-12"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner._id}-${index}`}
              className="glass-effect relative flex h-32 w-48 flex-shrink-0 items-center justify-center rounded-xl p-6"
            >
              {partner.isComingSoon && (
                <div className="absolute right-2 top-2 rounded-full bg-neon-purple px-2 py-1 text-xs font-bold text-black">
                  Soon
                </div>
              )}
              <div className="flex h-full w-full items-center justify-center text-center">
                <span className="text-lg font-semibold opacity-70">{partner.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Preliminary agreements in motion with major e-commerce giants. More partners
        announced soon.
      </p>
    </section>
  );
}
