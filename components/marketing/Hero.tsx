'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getSiteSettings } from '@/lib/content-service'
import { cn } from '@/lib/utils'

export async function Hero() {
  const settings = await getSiteSettings()

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
      style={{ minHeight: '90vh' }}
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={settings.heroImage}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-counter/60" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 600, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-butter text-sm font-body font-medium tracking-wide mb-6">
              Fresh from the oven daily
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 600, delay: 100, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-tight mb-6 text-balance"
          >
            {settings.bakeryName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 600, delay: 200, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-lg md:text-xl text-white/90 leading-relaxed mb-10 max-w-xl"
          >
            {settings.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 600, delay: 300, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="primary" size="lg" asChild className="group">
              <Link href="/menu" className="flex items-center gap-2">
                View Menu
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild className="group">
              <Link href="/custom-orders" className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                Order a Custom Cake
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 600, delay: 800 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}