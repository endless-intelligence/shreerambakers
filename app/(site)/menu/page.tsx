import { Metadata } from 'next'
import { MenuClient } from '@/components/marketing/MenuClient'
import { getAllProducts, getAllCategories } from '@/lib/content-service'

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Browse our full menu of artisan breads, pastries, celebration cakes, cookies, and savouries.',
}

export default async function MenuPage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ])

  return (
    <div className="min-h-screen">
      <MenuClient categories={categories} products={products} />
    </div>
  )
}