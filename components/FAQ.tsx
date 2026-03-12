'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQ() {
  const faqs = [
    {
      question: 'How is this different from just taking a screenshot?',
      answer:
        'Screenshots can be easily faked using Photoshop or inspect element. Our NFTs are cryptographically verified using vlayer\'s ZK Email technology with DKIM signatures, making them mathematically impossible to forge. The blockchain proves the email came from the actual store.',
    },
    {
      question: 'What can I do with these receipt NFTs?',
      answer:
        'Receipt NFTs serve as permanent proof of purchase that can appreciate in value. Use them for warranty claims, prove authenticity when reselling items, or hold them as collectibles. When products become discontinued or rise in price, your verified receipt becomes valuable proof.',
    },
    {
      question: 'Is my email data safe?',
      answer:
        'Absolutely. We never store your full email content. When you forward an email, it\'s parsed client-side or on a serverless function that deletes the content within 5 seconds. Only the cryptographic proof hash goes on-chain. See our Privacy Policy for complete details.',
    },
    {
      question: 'How does the free tier work?',
      answer:
        'Every wallet gets 2 free mints per week, tracked on-chain. This resets every Sunday at midnight UTC. If you need more, upgrade to Premium ($9/month or $79/year) for unlimited mints, batch processing, and custom NFT designs.',
    },
    {
      question: 'Which stores are supported?',
      answer:
        'We currently support major e-commerce platforms including Amazon, eBay, Nike, Adidas, Steam, Epic Games, Apple, and many more. We\'re constantly adding partners and have preliminary agreements with several major retailers to integrate directly.',
    },
    {
      question: 'Do I pay gas fees?',
      answer:
        'No! We use a gas paymaster on Base network to sponsor all transaction fees. Minting is completely free for users (within the free tier limits).',
    },
    {
      question: 'What is vlayer and why does it matter?',
      answer:
        'vlayer is a cutting-edge verification platform that powers our zero-knowledge proofs. It provides ZK Email (DKIM verification), Web Proofs/zkTLS (for API verification), Time Travel (proving historical states), and Teleport (cross-chain verification). This makes Receipilot receipts mathematically impossible to fake.',
    },
    {
      question: 'Can I use this for business/enterprise?',
      answer:
        'Yes! We\'re actively partnering with e-commerce platforms to integrate Receipilot directly into their checkout flows. This eliminates receipt forgery and streamlines warranty claims. Contact us at enterprise@receipilot.xyz for partnership opportunities.',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">
          Frequently Asked <span className="text-neon-glow text-neon-cyan">Questions</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Everything you need to know about Receipilot
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-effect rounded-lg border-none px-6"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-neon-cyan">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
