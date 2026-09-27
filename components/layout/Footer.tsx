'use client'

import { Facebook, Instagram, Youtube } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-[#fffaf1] px-6 pb-8 pt-14 text-jam md:px-12 md:pt-16 lg:px-16" role="contentinfo">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-10 border-b border-[#e6d5bc] pb-10 md:flex-row md:items-end">
          <div>
            <a href="#home" className="inline-flex items-center" aria-label="Shree Ram Bakers - Home">
              <Image src="/images/shree-ram-bakers-logo.png" alt="Shree Ram Bakers" width={128} height={128} className="h-32 w-32 rounded-full object-cover" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#796557]">Sweet moments, warm ovens, and a little more joy in every bite.</p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#6d5747]">
            <a href="#home" className="transition-colors hover:text-jam">Home</a>
            <a href="#menu" className="transition-colors hover:text-jam">Our treats</a>
            <a href="#story" className="transition-colors hover:text-jam">Our story</a>
            <a href="#reviews" className="transition-colors hover:text-jam">Reviews</a>
            <a href="#visit" className="transition-colors hover:text-jam">Visit us</a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 pt-7 text-xs text-[#8a7564] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Shree Ram Bakers. Baked with love.</p>
          <div className="flex items-center gap-3">
            <span className="mr-2 uppercase tracking-[0.16em]">Follow along</span>
            <a href="https://www.instagram.com/shree_ram_bakers.1?stkn=NDNyMTVhNXUzZHFp" target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ddc9ac] text-jam transition-colors hover:bg-jam hover:text-white" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a href="https://www.facebook.com/profile.php?id=61577326994019" target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ddc9ac] text-jam transition-colors hover:bg-jam hover:text-white" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ddc9ac] text-jam transition-colors hover:bg-jam hover:text-white" aria-label="YouTube"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
