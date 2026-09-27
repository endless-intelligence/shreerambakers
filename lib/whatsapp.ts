export const WHATSAPP_NUMBER = '916389368233'
export const WHATSAPP_ENQUIRY_TEMPLATE = 'Hello Shree Ram Bakers! I\'d like to enquire about a [cake/order] for [occasion]. Please share the available options and price.'

export interface WhatsAppEnquiry {
  name: string
  phone?: string
  product: string
  variant?: string
  quantity: number
  flavor?: string
  budget?: string
  preferredDate?: string
  occasion?: string
  requirements?: string
  notes?: string
}

export function buildWhatsAppMessage(enquiry: WhatsAppEnquiry): string {
  const preferredDate = enquiry.preferredDate
    ? new Date(`${enquiry.preferredDate}T12:00:00`).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''
  const lines = [
    "Hello! I'd like to enquire about a bakery order.",
    '',
    `Customer Name: ${enquiry.name.trim()}`,
    ...(enquiry.phone?.trim() ? [`Contact Number: ${enquiry.phone.trim()}`] : []),
    '',
    `Product: ${enquiry.product.trim()}`,
    ...(enquiry.variant?.trim() ? [`Variant/Size: ${enquiry.variant.trim()}`] : []),
    `Quantity: ${enquiry.quantity}`,
    ...(enquiry.flavor?.trim() ? [`Flavor: ${enquiry.flavor.trim()}`] : []),
    ...(enquiry.budget?.trim() ? [`Budget: ${enquiry.budget.trim()}`] : []),
    ...(enquiry.occasion?.trim() ? [`Occasion: ${enquiry.occasion.trim()}`] : []),
    ...(preferredDate ? [`Preferred Date: ${preferredDate}`] : []),
    ...(enquiry.requirements?.trim() ? ['', `Additional Requirements:\n${enquiry.requirements.trim()}`] : []),
    ...(enquiry.notes?.trim() ? ['', `Notes:\n${enquiry.notes.trim()}`] : []),
    '',
    'Please share the price, availability, and other details.',
    '',
    'Thank you!',
  ]

  return lines.join('\n')
}

export function buildWhatsAppUrl(enquiry: WhatsAppEnquiry): string {
  const number = WHATSAPP_NUMBER.replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsAppMessage(enquiry))}`
}

export function buildWhatsAppContactUrl(message = WHATSAPP_ENQUIRY_TEMPLATE): string {
  const number = WHATSAPP_NUMBER.replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
