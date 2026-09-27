'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { getAllTestimonials } from '@/lib/content-service'
import { cn } from '@/lib/utils'

interface Testimonial {
  id: string
  authorName: string
  quote: string
  rating: number
  photo?: string
}

export function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    getAllTestimonials().then(setTestimonials)
  }, [])

  const goToNext = useCallback(() => {
    if (isAnimating || testimonials.length <= 1) return
    setIsAnimating(true)
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating, testimonials.length])

  const goToPrev = useCallback(() => {
    if (isAnimating || testimonials.length <= 1) return
    setIsAnimating(true)
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating, testimonials.length])

  const goToIndex = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating, currentIndex])

  useEffect(() => {
    if (prefersReducedMotion || testimonials.length <= 1) return
    const interval = setInterval(goToNext, 6000)
    return () => clearInterval(interval)
  }, [prefersReducedMotion, testimonials.length, goToNext])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToNext() : goToPrev()
    }
    setTouchStart(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrev()
    if (e.key === 'ArrowRight') goToNext()
  }

  if (testimonials.length === 0) return null

  const current = testimonials[currentIndex]

  return (
    <section className="section section-alt" aria-label="Testimonials">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink mb-4">
            What our neighbors say
          </h2>
          <p className="font-body text-lg text-[rgba(40,34,29,0.7)]">
            Real words from our community
          </p>
        </div>

        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 300, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <div className="flex flex-wrap gap-1 mb-6" aria-label={`${current.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-5 h-5',
                      i < current.rating ? 'fill-jam text-jam' : 'text-[rgba(40,34,29,0.2)]'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="font-body text-lg md:text-xl text-ink leading-relaxed mb-8">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <footer className="flex items-center gap-4">
                {current.photo && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={current.photo} alt="" fill sizes="48px" className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="font-display font-medium text-ink">{current.authorName}</p>
                  <p className="font-body text-sm text-[rgba(40,34,29,0.5)]">Valued customer</p>
                </div>
              </footer>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                disabled={isAnimating}
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-ink hover:text-jam transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jam focus-visible:ring-offset-2',
                  isAnimating && 'opacity-50 pointer-events-none'
                )}
                aria-label="Previous testimonial"
                aria-hidden={prefersReducedMotion}
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>

              <button
                onClick={goToNext}
                disabled={isAnimating}
                className={cn(
                  'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-ink hover:text-jam transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jam focus-visible:ring-offset-2',
                  isAnimating && 'opacity-50 pointer-events-none'
                )}
                aria-label="Next testimonial"
                aria-hidden={prefersReducedMotion}
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>

              <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial navigation">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    disabled={isAnimating}
                    role="tab"
                    aria-selected={index === currentIndex}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-all duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jam focus-visible:ring-offset-2',
                      index === currentIndex
                        ? 'bg-jam w-8'
                        : 'bg-[rgba(40,34,29,0.2)] hover:bg-[rgba(40,34,29,0.4)]'
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
