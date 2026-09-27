export interface Product {
  id: string
  name: string
  slug: string
  category: Category
  price: number
  priceLabel?: string
  description: string
  images: string[]
  dietaryTags: DietaryTag[]
  featured: boolean
  available: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  order: number
}

export type DietaryTag = 'vegetarian' | 'eggless' | 'gluten-free' | 'vegan' | 'contains-nuts' | 'contains-dairy'

export interface Testimonial {
  id: string
  authorName: string
  quote: string
  rating: number
  photo?: string
}

export interface GalleryImage {
  id: string
  image: string
  caption: string
  altText: string
}

export interface SiteSettings {
  bakeryName: string
  tagline: string
  logo: string
  hours: OpeningHour[]
  address: string
  phone: string
  mapUrl: string
  socialLinks: SocialLink[]
  heroImage: string
}

export interface OpeningHour {
  day: string
  open: string
  close: string
  closed?: boolean
}

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'twitter' | 'whatsapp'
  url: string
}

export interface InquiryFormData {
  type: 'general' | 'custom-order'
  name: string
  email: string
  phone?: string
  message: string
  eventDate?: string
  cakeSize?: string
  flavor?: string
  budget?: string
  honeypot: string
  turnstileToken: string
}