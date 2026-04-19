import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Receipilot',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 2,
      initialValue: 'Turn any online purchase email into a beautiful, cryptographically verified NFT in seconds. Impossible to fake.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'twitter', type: 'url', title: 'Twitter URL' },
        { name: 'github', type: 'url', title: 'GitHub URL' },
        { name: 'discord', type: 'url', title: 'Discord URL' },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'hello@receipilot.xyz',
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement Banner',
      type: 'object',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Announcement' },
        { name: 'text', type: 'string', title: 'Announcement Text' },
        { name: 'link', type: 'url', title: 'Link URL' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
