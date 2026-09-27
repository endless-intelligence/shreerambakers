'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ProductCard, ProductCardSkeleton } from './ProductCard'
import type { Product, Category } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProductGridProps {
  products: Product[]
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (slug: string) => void
  isLoading?: boolean
}

interface CategoryTab {
  slug: string
  label: string
}

export function ProductGrid({ products, categories, selectedCategory, onCategoryChange, isLoading }: ProductGridProps) {
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category.slug === selectedCategory)

  const categoryTabs: CategoryTab[] = [
    { slug: 'all', label: 'All' },
    ...categories.map(c => ({ slug: c.slug, label: c.name })),
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 md:mb-12 justify-center" role="tablist" aria-label="Product categories">
        {categoryTabs.map((cat, index) => (
          <button
            key={cat.slug}
            role="tab"
            aria-selected={selectedCategory === cat.slug}
            aria-controls={`panel-${cat.slug}`}
            id={`tab-${cat.slug}`}
            onClick={() => onCategoryChange(cat.slug)}
            className={cn(
              'px-5 py-2.5 text-sm font-body font-medium rounded transition-all duration-200 ease-custom',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jam focus-visible:ring-offset-2',
              selectedCategory === cat.slug
                ? 'bg-jam text-white shadow-md'
                : 'bg-white text-ink border border-[rgba(40,34,29,0.1)] hover:border-jam hover:text-jam'
            )}
            style={{ transitionDelay: `${index * 30}ms` }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 200, ease: [0.16, 1, 0.3, 1] }}
        >
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              role="list"
              aria-label={`${selectedCategory === 'all' ? 'All products' : categoryTabs.find(c => c.slug === selectedCategory)?.label || 'Products'}`}
            >
              {filteredProducts.map((product, index) => (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 300, delay: index * 50, ease: [0.16, 1, 0.3, 1] }}
                  role="listitem"
                >
                  <ProductCard product={product} />
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 md:py-24" role="status">
              <svg className="w-16 h-16 mx-auto text-[rgba(40,34,29,0.3)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-display text-xl text-ink mb-2">New treats coming soon</h3>
              <p className="font-body text-[rgba(40,34,29,0.6)]">
                {selectedCategory === 'all'
                  ? 'Our bakers are busy in the kitchen. Check back soon!'
                  : 'No items in this category right now. Try another!'}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}