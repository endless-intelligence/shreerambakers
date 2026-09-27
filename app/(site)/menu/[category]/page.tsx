import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoryClient } from '@/components/marketing/CategoryClient'
import { getAllProducts, getAllCategories } from '@/lib/content-service'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map(cat => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categories = await getAllCategories()
  const cat = categories.find(c => c.slug === category)
  return {
    title: cat?.name || 'Category',
    description: `Browse our ${cat?.name.toLowerCase()} — freshly baked daily.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(category),
  ])

  const cat = categories.find(c => c.slug === category)
  if (!cat) notFound()

  return (
    <div className="min-h-screen">
      <CategoryClient categories={categories} products={products} currentCategory={cat} />
    </div>
  )
}