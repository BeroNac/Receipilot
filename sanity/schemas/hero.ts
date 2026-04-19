import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Small badge text above the headline',
      initialValue: 'Powered by vlayer ZK Technology',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main headline (use {highlight} for gradient text)',
      initialValue: 'Turn Receipts into {Verified NFTs}',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'Transform any online purchase email into a cryptographically verified NFT in seconds. Impossible to fake, forever on-chain.',
    }),
    defineField({
      name: 'features',
      title: 'Feature Pills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Icon Name', description: 'lucide icon name (e.g., Shield, Zap, Receipt)' },
            { name: 'text', type: 'string', title: 'Text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'label', type: 'string', title: 'Label' },
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Primary CTA Text',
      type: 'string',
      initialValue: 'Start Minting',
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Secondary CTA Text',
      type: 'string',
      initialValue: 'Try Live Demo',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    },
    prepare({ title }) {
      return {
        title: 'Hero Section',
        subtitle: title,
      };
    },
  },
});
