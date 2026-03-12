import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which the FAQ appears',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Technical', value: 'technical' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Privacy', value: 'privacy' },
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Only published FAQs will appear on the site',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },
});
