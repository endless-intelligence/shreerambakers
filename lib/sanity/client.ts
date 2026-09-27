import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function getSettings(): Promise<any> {
  return sanityClient.fetch(`*[_type == "siteSettings"][0]{
    bakeryName,
    tagline,
    logo,
    hours,
    address,
    phone,
    mapUrl,
    socialLinks,
    heroImage
  }`)
}

export async function getCategories(): Promise<any[]> {
  return sanityClient.fetch(`*[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    order
  }`)
}

export async function getProducts(categorySlug?: string, featured?: boolean): Promise<any[]> {
  let query = `*[_type == "product" && available == true`
  const params: any = {}

  if (categorySlug) {
    query += ` && category->slug.current == $categorySlug`
    params.categorySlug = categorySlug
  }

  if (featured) {
    query += ` && featured == true`
  }

  query += `] | order(category->order asc, name asc) {
    _id,
    name,
    slug,
    price,
    description,
    images,
    dietaryTags,
    featured,
    available,
    category->{_id, name, slug, order}
  }`

  return sanityClient.fetch(query, params)
}

export async function getProduct(slug: string): Promise<any> {
  return sanityClient.fetch(`*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    price,
    description,
    images,
    dietaryTags,
    featured,
    available,
    category->{_id, name, slug, order}
  }`, { slug })
}

export async function getTestimonials(): Promise<any[]> {
  return sanityClient.fetch(`*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    authorName,
    quote,
    rating,
    photo
  }`)
}

export async function getGalleryImages(): Promise<any[]> {
  return sanityClient.fetch(`*[_type == "galleryImage"] | order(_createdAt desc) {
    _id,
    image,
    caption,
    altText
  }`)
}