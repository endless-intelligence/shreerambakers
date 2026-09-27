'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MessageCircle } from 'lucide-react'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'featured'
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const imageUrl = product.images[0] || '/images/placeholder.jpg'

  return (
    <article className={cn('card group', variant === 'featured' && 'md:col-span-2')}>
      <Link
        href={`/menu/${product.category.slug}/${product.slug}`}
        className="block relative aspect-[4/3] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jam focus-visible:ring-offset-2"
        aria-label={`View ${product.name}`}
      >
        <div className="absolute inset-0 bg-parchment-alt" aria-hidden="true" />
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-custom group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        {product.dietaryTags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5" aria-label="Dietary information">
            {product.dietaryTags.slice(0, 3).map(tag => (
              <Badge key={tag} variant={tag} />
            ))}
          </div>
        )}
      </Link>

      <div className="p-5 md:p-6 flex flex-col h-[calc(100%-200px)] min-h-[200px]">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-display text-xl font-medium text-ink line-clamp-1 flex-1 pr-2">
            <Link href={`/menu/${product.category.slug}/${product.slug}`} className="hover:text-jam transition-colors">
              {product.name}
            </Link>
          </h3>
          <span className="font-display text-xl font-semibold text-jam flex-shrink-0 whitespace-nowrap">
            {product.priceLabel ?? formatPrice(product.price)}
          </span>
        </div>

        <p className="font-body text-sm text-[rgba(40,34,29,0.7)] line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Dietary tags">
          {product.dietaryTags.map(tag => (
            <Badge key={tag} variant={tag} />
          ))}
        </div>

        <Button
          variant="secondary"
          className="w-full"
          asChild
        >
          <Link href={`/custom-orders?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category.name)}`} className="flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Enquire on WhatsApp
          </Link>
        </Button>
      </div>
    </article>
  )
}

export function ProductCardSkeleton() {
  return (
    <article className="card animate-pulse">
      <div className="aspect-[4/3] bg-parchment-alt" />
      <div className="p-5 md:p-6 space-y-4">
        <div className="h-6 bg-parchment-alt rounded w-3/4" />
        <div className="h-4 bg-parchment-alt rounded w-full" />
        <div className="h-4 bg-parchment-alt rounded w-5/6" />
        <div className="flex gap-2">
          <div className="h-6 bg-parchment-alt rounded px-3 w-20" />
          <div className="h-6 bg-parchment-alt rounded px-3 w-24" />
        </div>
        <div className="h-10 bg-parchment-alt rounded" />
      </div>
    </article>
  )
}