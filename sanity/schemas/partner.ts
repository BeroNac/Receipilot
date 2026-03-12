import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isComingSoon',
      title: 'Coming Soon',
      type: 'boolean',
      description: 'Mark as coming soon if partnership is not yet active',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which the partner appears in the carousel',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
      description: 'Optional partner website',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      subtitle: 'isComingSoon',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title,
        subtitle: subtitle ? 'Coming Soon' : 'Active Partner',
      };
    },
  },
});
