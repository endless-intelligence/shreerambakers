import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'bakeryName',
      title: 'Bakery Name',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Shree Ram Bakers',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: Rule => Rule.required().max(120),
      initialValue: 'Handcrafted with patience. Served with warmth.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'openingHour',
          title: 'Opening Hour',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                  'Friday', 'Saturday', 'Sunday'
                ],
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'open',
              title: 'Open Time',
              type: 'string',
              description: 'Format: HH:MM (24-hour)',
            },
            {
              name: 'close',
              title: 'Close Time',
              type: 'string',
              description: 'Format: HH:MM (24-hour)',
            },
            {
              name: 'closed',
              title: 'Closed All Day',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
      validation: Rule => Rule.required().length(7),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps URL',
      type: 'url',
      validation: Rule => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: ['instagram', 'facebook', 'twitter', 'whatsapp'],
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: Rule => Rule.required().uri({ scheme: ['http', 'https'] }),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})