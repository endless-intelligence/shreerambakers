'use client'

import { Section, SectionHeader } from '@/components/layout/Section'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface FeaturedProductsProps {
  products: any[]
  categories: any[]
}

export function FeaturedProducts({ products, categories }: FeaturedProductsProps) {
  return (
    <Section alternate id="featured-products" aria-label="Featured products">
      <SectionHeader
        title="Fresh from the oven"
        subtitle="Our most-loved bakes, made fresh each morning"
      />
      <ProductGrid
        products={products}
        categories={categories}
        selectedCategory="all"
        onCategoryChange={() => {}}
      />
      <div className="text-center mt-10 md:mt-14">
        <Button variant="secondary" size="lg" asChild>
          <Link href="/menu" className="flex items-center justify-center gap-2">
            View Full Menu
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </Section>
  )
}