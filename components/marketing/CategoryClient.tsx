'use client'

import React, { useState } from 'react'
import { Section, SectionHeader } from '@/components/layout/Section'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface CategoryClientProps {
  categories: any[]
  products: any[]
  currentCategory: any
}

export function CategoryClient({ categories, products, currentCategory }: CategoryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(currentCategory.slug)

  return (
    <>
      <Section className="pt-8 md:pt-12" aria-label="Category header">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/menu"
            className="p-2 rounded-lg bg-parchment-alt text-ink hover:bg-jam hover:text-white transition-colors"
            aria-label="Back to menu"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink">
              {currentCategory.name}
            </h1>
            <p className="font-body text-lg text-[rgba(40,34,29,0.7)] mt-1">
              Freshly baked daily
            </p>
          </div>
        </div>
      </Section>

      <Section aria-label={`${currentCategory.name} products`}>
        <ProductGrid
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </Section>
    </>
  )
}