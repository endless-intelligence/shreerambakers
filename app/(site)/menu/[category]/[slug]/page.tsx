import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getAllProducts, getProductBySlug } from '@/lib/content-service'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map(product => ({
    category: product.category.slug,
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  return {
    title: product?.name || 'Menu item',
    description: product?.description || 'Freshly made at Shree Ram Bakers.',
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params
  const product = await getProductBySlug(slug)

  if (!product || product.category.slug !== category) notFound()

  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-[1120px] px-6 pb-16 pt-28 md:px-12 md:pb-24 md:pt-36 lg:px-16">
        <Link href="/menu" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-jam hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to menu
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-parchment-alt">
            <Image
              src={product.images[0] || '/images/placeholder.svg'}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="eyebrow text-[#a2682c]">{product.category.name}</p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-[-0.04em] text-jam md:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-[#5f4b3d]">{product.description}</p>
            <p className="mt-6 font-display text-3xl font-semibold text-jam">{product.priceLabel ?? formatPrice(product.price)}</p>

            <div className="mt-5 flex flex-wrap gap-2" aria-label="Dietary information">
              {product.dietaryTags.map(tag => <Badge key={tag} variant={tag} />)}
            </div>

            <Button variant="primary" size="lg" className="mt-8" asChild>
              <Link href={`/custom-orders?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category.name)}`}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Enquire on WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
