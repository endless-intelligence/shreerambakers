'use client'

import React, { useState } from 'react'
import { Section, SectionHeader } from '@/components/layout/Section'
import { ProductGrid } from '@/components/product/ProductGrid'

interface MenuClientProps {
  categories: any[]
  products: any[]
}

export function MenuClient({ categories, products }: MenuClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <>
      <Section className="pb-6 pt-8 md:pb-8 md:pt-12" aria-label="Menu header">
        <SectionHeader
          title="Our Menu"
          subtitle="100% eggless, freshly baked favourites — browse cakes, pastries, snacks and beverages"
        />
      </Section>

      <Section className="pt-6 md:pt-10" aria-label="Product menu">
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