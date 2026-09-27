import { defineField, defineType } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text (Required)',
          type: 'string',
          validation: Rule => Rule.required(),
          description: 'Describe what is in the image for accessibility and SEO',
        },
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text (Duplicate for Validation)',
      type: 'string',
      validation: Rule => Rule.required(),
      hidden: true,
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'caption',
      subtitle: 'altText',
    },
  },
})