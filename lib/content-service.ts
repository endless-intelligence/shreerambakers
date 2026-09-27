import { sanityClient, getSettings, getCategories, getProducts, getProduct, getTestimonials, getGalleryImages } from './sanity/client'
import { fallbackSettings, fallbackCategories, fallbackProducts, fallbackTestimonials, fallbackGalleryImages } from './content'
import type { SiteSettings, Category, Product, Testimonial, GalleryImage } from './types'

const USE_SANITY = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'demo'

async function withFallback<T>(sanityFn: () => Promise<T>, fallback: T): Promise<T> {
  if (!USE_SANITY) return fallback
  try {
    const data = await sanityFn()
    if (Array.isArray(data)) {
      return data.length > 0 ? data : fallback
    }
    return data ? data : fallback
  } catch (error) {
    console.warn('Sanity fetch failed, using fallback:', error)
    return fallback
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return withFallback(getSettings, fallbackSettings)
}

export async function getAllCategories(): Promise<Category[]> {
  return withFallback(getCategories, fallbackCategories)
}

export async function getAllProducts(categorySlug?: string, featured?: boolean): Promise<Product[]> {
  return withFallback(() => getProducts(categorySlug, featured), fallbackProducts.filter(p => {
    if (categorySlug && p.category.slug !== categorySlug) return false
    if (featured && !p.featured) return false
    return true
  }))
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!USE_SANITY) {
    return fallbackProducts.find(p => p.slug === slug) || null
  }
  try {
    return await getProduct(slug)
  } catch {
    return fallbackProducts.find(p => p.slug === slug) || null
  }
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return withFallback(getTestimonials, fallbackTestimonials)
}

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  return withFallback(getGalleryImages, fallbackGalleryImages)
}

export { USE_SANITY }