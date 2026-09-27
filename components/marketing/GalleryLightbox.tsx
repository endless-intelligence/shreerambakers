'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'
import { getAllGalleryImages } from '@/lib/content-service'
import { cn } from '@/lib/utils'

interface GalleryImage {
  id: string
  image: string
  caption: string
  altText: string
}

export function GalleryLightbox() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getAllGalleryImages().then(setImages)
  }, [])

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length)
  }, [images.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeLightbox, goToNext, goToPrev])

  const preloadImages = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    new window.Image().src = images[nextIndex].image
    new window.Image().src = images[prevIndex].image
  }, [currentIndex, images])

  useEffect(() => {
    if (isOpen) preloadImages()
  }, [isOpen, currentIndex, preloadImages])

  if (images.length === 0) return null

  return (
    <>
      <section className="section" aria-label="Gallery">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink mb-4">
            From our kitchen
          </h2>
          <p className="font-body text-lg text-[rgba(40,34,29,0.7)]">
            A glimpse behind the scenes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" role="list">
          {images.map((image, index) => (
            <article
              key={image.id}
              role="listitem"
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jam focus-visible:ring-offset-2"
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(index) } }}
              tabIndex={0}
            >
              <div className="absolute inset-0 bg-parchment-alt" aria-hidden="true" />
              <Image
                src={image.image}
                alt={image.altText}
                fill
                className="object-cover transition-transform duration-500 ease-custom group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-counter/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="w-full text-white">
                  <Expand className="w-6 h-6 mb-2" aria-hidden="true" />
                  <p className="font-body text-sm">{image.caption}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 200 }}
            className="fixed inset-0 z-50 bg-counter/98 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" aria-hidden="true" />
                </button>
              </>
            )}

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 200, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl max-h-[85vh] w-full"
            >
              <div className="relative aspect-[4/3] max-h-[70vh] overflow-hidden rounded-xl">
                <Image
                  src={images[currentIndex].image}
                  alt={images[currentIndex].altText}
                  fill
                  className="object-contain"
                  priority
                  sizes="90vw"
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-counter">
                    <div className="w-8 h-8 border-4 border-jam border-t-transparent rounded-full animate-spin" aria-label="Loading image" />
                  </div>
                )}
              </div>

              <div className="mt-4 text-center text-white">
                <p className="font-body text-lg">{images[currentIndex].caption}</p>
                <p className="font-body text-sm text-white/50 mt-1">{currentIndex + 1} of {images.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}