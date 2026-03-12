import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Limited Time Offer',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Use {highlight} for gradient text',
      initialValue: 'Ready to {Get Started?}',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      initialValue: 'Join thousands of users protecting their purchases with cryptographic proof. Start minting your receipt NFTs today.',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'Mint Your First Receipt',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text', 
      type: 'string',
      initialValue: 'Try Live Demo',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits List',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['No credit card', '2 free mints/week', 'Zero gas fees'],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    },
    prepare({ title }) {
      return {
        title: 'CTA Section',
        subtitle: title,
      };
    },
  },
});
