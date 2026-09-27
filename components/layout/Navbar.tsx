'use client'

import { useEffect, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#menu', label: 'Our treats' },
  { href: '#story', label: 'Our story' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Visit us' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-40 transition-all duration-300',
        isScrolled ? 'bg-[#fbf5ea]/95 text-jam shadow-[0_5px_25px_rgba(79,36,16,0.08)] backdrop-blur-md' : 'bg-transparent text-jam'
      )}
      role="banner"
    >
      <nav className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16" aria-label="Main navigation">
        <div className="flex h-[78px] items-center justify-between md:h-[88px]">
          <a href="#home" onClick={closeMobileMenu} className="group flex items-center" aria-label="Shree Ram Bakers - Home">
            <Image src="/images/shree-ram-bakers-logo.png" alt="Shree Ram Bakers" width={64} height={64} className="h-16 w-16 shrink-0 rounded-full object-cover" />
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link, index) => (
              <a key={link.href} href={link.href} className={cn('nav-link', index === 0 && 'nav-link-active')}>
                {link.label}
              </a>
            ))}
            <a href="#order" className="btn-nav">Order now <span aria-hidden="true">→</span></a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href="#menu" className="flex h-10 w-10 items-center justify-center rounded-full border border-jam/30" aria-label="Search our treats"><Search className="h-4 w-4" /></a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-jam/30"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div id="mobile-menu" className={cn('overflow-hidden transition-all duration-300 lg:hidden', isMobileMenuOpen ? 'max-h-[420px] pb-6 opacity-100' : 'max-h-0 opacity-0')}>
          <div className="rounded-[4px] border border-[#e6d5bc] bg-[#fffaf1] p-3 shadow-xl">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMobileMenu} className="block border-b border-[#efe3d1] px-3 py-3 font-body text-sm font-medium text-jam last:border-0">
                {link.label}
              </a>
            ))}
            <a href="#order" onClick={closeMobileMenu} className="btn-nav mt-3 w-full">Order now <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </nav>
    </header>
  )
}
