import { Metadata } from 'next'
import { Section, SectionHeader } from '@/components/layout/Section'
import { GalleryLightbox } from '@/components/marketing/GalleryLightbox'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Behind the scenes at Shree Ram Bakers - from dough to display, see our artisan process in photos.',
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Section className="pb-6 pt-8 md:pb-8 md:pt-12" aria-label="Gallery header">
        <SectionHeader
          title="Gallery"
          subtitle="From our kitchen to your table — a visual journey"
        />
      </Section>

      <GalleryLightbox />
    </div>
  )
}