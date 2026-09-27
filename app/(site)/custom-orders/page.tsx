import { Metadata } from 'next'
import { Section, SectionHeader } from '@/components/layout/Section'
import { InquiryForm } from '@/components/forms/InquiryForm'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/content-service'
import { Calendar, Users, Heart, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Custom Orders',
  description: 'Order custom celebration cakes and catering from Shree Ram Bakers. Custom designs, flavors, and dietary options available.',
}

const cakeSizes = [
  { size: '6-inch', servings: '6–8', price: 'From ₹1,200' },
  { size: '7-inch', servings: '10–12', price: 'From ₹1,500' },
  { size: '8-inch', servings: '12–16', price: 'From ₹1,800' },
  { size: '9-inch', servings: '16–20', price: 'From ₹2,200' },
  { size: '10-inch', servings: '20–25', price: 'From ₹2,800' },
  { size: 'Tiered', servings: '30+', price: 'Custom quote' },
]

const flavors = [
  'Vanilla Bean',
  'Dark Chocolate (70%)',
  'Chocolate & Vanilla Marble',
  'Red Velvet',
  'Lemon Elderflower',
  'Carrot Walnut',
  'Coffee Hazelnut',
  'Mango Passionfruit (seasonal)',
  'Strawberry Vanilla',
  'Black Forest',
  'Custom flavor',
]

const dietaryOptions = [
  'Vegetarian (standard)',
  'Eggless',
  'Vegan',
  'Gluten-free (almond flour base)',
  'Nut-free facility available',
]

const processSteps = [
  { step: '01', title: 'Enquire', description: 'Share your vision, date, and budget with us directly on WhatsApp.' },
  { step: '02', title: 'Design', description: 'We\'ll sketch concepts, discuss flavors, and finalize the design together.' },
  { step: '03', title: 'Confirm', description: 'Approve the design and pay a 50% deposit to secure your date.' },
  { step: '04', title: 'Create', description: 'We bake fresh for your event — never frozen, never pre-made.' },
  { step: '05', title: 'Deliver', description: 'Pick up at the bakery or arrange delivery within Chandigarh.' },
]

interface CustomOrdersPageProps {
  searchParams?: { product?: string; category?: string } | Promise<{ product?: string; category?: string }>
}

export default async function CustomOrdersPage({ searchParams }: CustomOrdersPageProps) {
  const settings = await getSiteSettings()
  const enquiryParams = await searchParams

  return (
    <div className="min-h-screen">
      <Section className="pb-6 pt-8 md:pb-8 md:pt-12" aria-label="Custom orders hero">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-parchment-alt text-jam text-sm font-body font-medium mb-6">
            Celebration Cakes & Catering
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink mb-6 leading-tight">
            Your vision,<br />our craft
          </h1>
          <p className="font-body text-xl text-[rgba(40,34,29,0.7)] leading-relaxed">
            From intimate birthdays to grand weddings — every cake is designed with you,
            baked fresh, and delivered with care.
          </p>
        </div>
      </Section>

      <Section alternate aria-label="Order process">
        <SectionHeader
          title="How it works"
          subtitle="Five steps from idea to celebration"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {processSteps.map(step => (
            <article key={step.step} className="relative">
              <span className="font-display text-3xl font-bold text-jam/20 mb-3 block">{step.step}</span>
              <h3 className="font-display text-xl font-medium text-ink mb-2">{step.title}</h3>
              <p className="font-body text-[rgba(40,34,29,0.7)] leading-relaxed">{step.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section aria-label="Cake options">
        <SectionHeader
          title="Build your cake"
          subtitle="Sizes, flavors, and dietary options"
        />
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="font-display text-xl font-medium text-ink mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-jam" aria-hidden="true" />
              Cake Sizes
            </h3>
            <div className="space-y-3">
              {cakeSizes.map(cake => (
                <div key={cake.size} className="flex items-center justify-between p-4 bg-white rounded-xl border border-[rgba(40,34,29,0.08)]">
                  <div>
                    <p className="font-display font-medium text-ink">{cake.size}</p>
                    <p className="font-body text-sm text-[rgba(40,34,29,0.5)]">{cake.servings} servings</p>
                  </div>
                  <p className="font-display font-medium text-jam">{cake.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-medium text-ink mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-jam" aria-hidden="true" />
              Popular Flavors
            </h3>
            <div className="flex flex-wrap gap-2">
              {flavors.map(flavor => (
                <span key={flavor} className="px-4 py-2 bg-white rounded-lg border border-[rgba(40,34,29,0.1)] font-body text-sm text-ink hover:border-jam hover:text-jam transition-colors">
                  {flavor}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-medium text-ink mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-jam" aria-hidden="true" />
              Dietary Options
            </h3>
            <div className="space-y-3">
              {dietaryOptions.map(option => (
                <label key={option} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[rgba(40,34,29,0.08)] cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-jam border-[rgba(40,34,29,0.2)] rounded focus:ring-jam" />
                  <span className="font-body text-[rgba(40,34,29,0.8)]">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section alternate aria-label="Custom order form">
        <SectionHeader
          title="Start your custom order"
          subtitle="Tell us about your celebration — we'll bring it to life"
        />
        <div className="max-w-2xl mx-auto">
          <InquiryForm
            variant="custom-order"
            initialData={enquiryParams?.product ? { product: enquiryParams.product } : undefined}
            productCategory={enquiryParams?.category}
          />
        </div>
      </Section>

      <Section aria-label="Catering info">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-6 text-center">
            Catering & Bulk Orders
          </h2>
          <div className="prose prose-ink max-w-none font-body text-lg text-[rgba(40,34,29,0.7)] leading-relaxed space-y-4">
            <p>
              Planning a corporate breakfast, wedding dessert table, or festival celebration?
              We do catering orders of all sizes — from assorted pastry platters to full dessert spreads.
            </p>
            <p>
              Popular catering options:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Assorted breakfast pastries (croissants, pain au chocolat, fruit danish)</li>
              <li>Cookie & brownie platters</li>
              <li>Mini cupcake towers</li>
              <li>Savory tartlets & quiches</li>
              <li>Custom bread baskets</li>
            </ul>
            <p>
              Minimum 48 hours notice for catering. 72 hours for orders over 50 pieces.
              Delivery available within Chandigarh tricity (Mohali, Panchkula, Zirakpur).
            </p>
            <p>
              <strong>Ready to plan?</strong> Use the form above and select &quot;Catering&quot; in your message,
              or call us directly at <a href={`tel:${settings.phone.split(' / ')[0]}`} className="text-jam hover:underline">{settings.phone}</a>.
            </p>
          </div>
        </div>
      </Section>
    </div>
  )
}
