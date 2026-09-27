import { Metadata } from 'next'
import { Section, SectionHeader } from '@/components/layout/Section'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { getSiteSettings } from '@/lib/content-service'
import { MapPin, Phone, Clock, MessageCircle, Instagram, Facebook, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buildWhatsAppContactUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Shree Ram Bakers. Visit us in Sector 15, Chandigarh, call us, or send a message.',
}

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const phoneNumbers = settings.phone.split(' / ')
  const contactMethods = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: settings.address.split(', '),
      action: { label: 'Open in Maps', href: settings.mapUrl },
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [...phoneNumbers, 'Open daily, 9:00 a.m. to 11:00 p.m.'],
      action: { label: 'Call Now', href: `tel:${phoneNumbers[0]}` },
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Us',
      details: ['Chat with the bakery directly', 'Send your order enquiry on WhatsApp'],
      action: { label: 'Open WhatsApp', href: buildWhatsAppContactUrl() },
    },
  ]
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: settings.socialLinks.find(link => link.platform === 'instagram')?.url ?? '#', color: 'text-pink-500' },
    { icon: Facebook, label: 'Facebook', href: settings.socialLinks.find(link => link.platform === 'facebook')?.url ?? '#', color: 'text-blue-600' },
    { icon: MessageCircle, label: 'WhatsApp', href: buildWhatsAppContactUrl(), color: 'text-green-500' },
  ]

  return (
    <div className="min-h-screen">
      <Section className="pb-6 pt-8 md:pb-8 md:pt-12" aria-label="Contact header">
        <SectionHeader
          title="Get in Touch"
          subtitle="We'd love to hear from you — visit, call, or message us on WhatsApp"
        />
      </Section>

      <Section aria-label="Contact methods">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => (
            <article key={method.title} className="bg-white p-6 md:p-8 rounded-2xl text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-parchment-alt rounded-xl flex items-center justify-center">
                <method.icon className="w-7 h-7 text-jam" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-medium text-ink mb-3">{method.title}</h3>
              <div className="font-body text-[rgba(40,34,29,0.7)] leading-relaxed mb-6">
                {method.details.map((detail, i) => (
                  <div key={i}>{detail}</div>
                ))}
              </div>
              <a
                href={method.action.href}
                target={method.action.href.startsWith('http') ? '_blank' : undefined}
                rel={method.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-body text-sm text-jam hover:underline inline-flex items-center gap-1"
              >
                {method.action.label}
                {method.action.href.startsWith('http') && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section alternate aria-label="Contact form" id="contact-form">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-6">
              Start an enquiry on WhatsApp
            </h2>
            <p className="font-body text-lg text-[rgba(40,34,29,0.7)] leading-relaxed mb-8">
              Have a question about our products, need help with an order, or just want to say hello?
              Share what you&apos;re looking for and continue to WhatsApp to send your enquiry directly to the bakery.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl">
                <div className="w-10 h-10 bg-parchment-alt rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-jam" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-display font-medium text-ink">Response Time</h4>
                  <p className="font-body text-sm text-[rgba(40,34,29,0.7)]">We&apos;ll reply as soon as we can during opening hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl">
                <div className="w-10 h-10 bg-parchment-alt rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-jam" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-display font-medium text-ink">Custom Cake Inquiries</h4>
                  <p className="font-body text-sm text-[rgba(40,34,29,0.7)]">Please contact us at least 2 weeks before your event</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl">
                <div className="w-10 h-10 bg-parchment-alt rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-jam" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-display font-medium text-ink">Urgent?</h4>
                  <p className="font-body text-sm text-[rgba(40,34,29,0.7)]">Call us directly at {settings.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8">
            <InquiryForm variant="contact" />
          </div>
        </div>
      </Section>

      <Section aria-label="Hours and location">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-2xl">
            <h3 className="font-display text-xl font-medium text-ink mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-jam" aria-hidden="true" />
              Opening Hours
            </h3>
            <dl className="space-y-3">
              {settings.hours.map(hour => (
                <div key={hour.day} className="flex justify-between py-2 border-b border-[rgba(40,34,29,0.08)] last:border-0">
                  <dt className="font-body text-[rgba(40,34,29,0.7)]">{hour.day}</dt>
                  <dd className="font-body font-medium text-ink">
                    {hour.closed ? 'Closed' : `${hour.open} – ${hour.close}`}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl">
            <h3 className="font-display text-xl font-medium text-ink mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-jam" aria-hidden="true" />
              Find Us
            </h3>
            <address className="font-body text-[rgba(40,34,29,0.7)] not-italic leading-relaxed mb-6">
              {settings.address}
            </address>
            <a
              href={settings.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-jam hover:underline font-body font-medium"
            >
              Open in Google Maps
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </Section>

      <Section alternate aria-label="Social media">
        <div className="text-center">
          <h3 className="font-display text-xl font-medium text-ink mb-6">Follow Our Daily Bakes</h3>
          <div className="flex justify-center gap-4">
            {socialLinks.map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-12 h-12 rounded-full bg-white border-2 border-[rgba(40,34,29,0.1)] flex items-center justify-center transition-all duration-200',
                  'hover:scale-110 hover:border-current',
                  social.color
                )}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
