import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Clock3,
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  MoveUpRight,
  Star,
  Users,
} from 'lucide-react'
import { getAllProducts, getAllTestimonials, getSiteSettings } from '@/lib/content-service'
import { googleReviewLinks } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Sweet moments since generations',
  description:
    'Shree Ram Bakers — fresh cakes, pastries, breads and sweet moments from our family bakery in Varanasi.',
}

const categoryImages = [
  { name: 'Cakes', image: '/images/category-cakes.png', note: 'For every celebration' },
  { name: 'Pastries', image: '/images/category-pastries.png', note: 'Golden, flaky, fresh' },
  { name: 'Breads', image: '/images/category-breads.png', note: 'Slow-fermented goodness' },
  { name: 'Cookies', image: '/images/category-cookies.png', note: 'Little bites of joy' },
  { name: 'Savouries', image: '/images/category-savouries.png', note: 'Flaky and flavourful' },
  { name: 'Custom orders', image: '/images/cakes/custom-tiered-cake.jpg', note: 'Made just for you' },
]

const productTags = ['Bestseller', 'Most loved', 'Fresh today', 'Bestseller', 'Made to order', 'Fresh today']
const productImageFallbacks = [
  '/images/category-cakes.png',
  '/images/cakes/red-velvet-cake.jpg',
  '/images/cakes/custom-tiered-cake.jpg',
  '/images/cakes/birthday-theme-cake.jpg',
  '/images/cakes/doll-butterfly-cake.jpg',
  '/images/cakes/whisky-bottle-cake.jpg',
]

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

export default async function HomePage() {
  const [settings, products, testimonials] = await Promise.all([
    getSiteSettings(),
    getAllProducts(undefined, true),
    getAllTestimonials(),
  ])

  const bestsellerProducts = products.slice(0, 6)

  return (
    <div className="overflow-hidden bg-parchment text-ink">
      <section id="home" className="hero-section relative isolate min-h-[720px] overflow-hidden md:min-h-[760px]">
        <Image
          src="/images/hero-bakery.png"
          alt="Chocolate cake and golden croissants on a bakery counter"
          fill
          priority
          className="object-cover object-[64%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,245,233,0.98)_0%,rgba(250,245,233,0.9)_31%,rgba(250,245,233,0.2)_60%,rgba(49,16,10,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(70,27,16,0.18),transparent_30%)]" />

        <div className="relative mx-auto flex min-h-[720px] max-w-[1280px] items-center px-6 pb-20 pt-32 md:min-h-[760px] md:px-12 md:pt-28 lg:px-16">
          <div className="max-w-[620px] animate-rise">
            <p className="eyebrow mb-5 text-jam">Baked with tradition · Varanasi · Est. 1985</p>
            <h1 className="max-w-2xl font-display text-[clamp(3.5rem,8vw,7rem)] font-medium leading-[0.87] tracking-[-0.06em] text-jam">
              Sweet moments
              <br />
              <span className="font-display italic font-normal text-[#a96b2a]">since generations</span>
            </h1>
            <p className="mt-8 max-w-lg font-body text-base leading-7 text-[#4e3c32] md:text-lg">
              Shree Ram Bakers is Varanasi&apos;s favourite place for fresh bakes, delightful treats and happier moments.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#menu" className="btn-landing-primary group">
                Explore our treats <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#visit" className="btn-landing-outline group">
                <MapPin className="h-4 w-4" /> Visit our store
              </Link>
            </div>

            <div className="mt-12 grid max-w-[500px] grid-cols-3 gap-4 border-t border-jam/20 pt-5">
              {[
                { icon: Leaf, title: 'Baked daily', text: 'Fresh from our ovens' },
                { icon: Heart, title: 'Loved by generations', text: 'Made with care' },
                { icon: Users, title: 'Local favourite', text: 'A taste of home' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-2.5">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#ad712d]" strokeWidth={1.5} />
                  <div>
                    <p className="font-display text-sm font-medium leading-tight text-jam">{title}</p>
                    <p className="mt-1 text-[11px] leading-4 text-[#6d5b4f]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-6 hidden max-w-[145px] rotate-[-8deg] text-right font-display text-2xl italic leading-none text-jam/80 md:block lg:right-16">
          Life is sweeter
          <br />
          with cake <span className="text-3xl">♡</span>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-[1280px] px-6 md:-mt-14 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categoryImages.map((category) => (
            <Link
              key={category.name}
              href="#menu"
              className="group overflow-hidden rounded-[3px] border border-[#e9d8bd] bg-[#fffaf1] shadow-[0_14px_35px_rgba(80,44,18,0.08)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[1.35] overflow-hidden bg-parchment-alt">
                <Image src={category.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 16vw" />
              </div>
              <div className="p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-display text-base font-medium text-jam">{category.name}</h2>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eac17c] text-jam transition-colors group-hover:bg-jam group-hover:text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#796759]">{category.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 pb-24 pt-24 md:px-12 md:pb-32 md:pt-32 lg:px-16">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-[#a2682c]">Customer favourites, always fresh</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-[-0.04em] text-jam md:text-5xl">Our bestsellers</h2>
          </div>
          <Link href="#visit" className="group inline-flex items-center gap-2 self-start border-b border-jam/40 pb-1 font-body text-sm font-medium text-jam transition-colors hover:border-jam md:self-auto">
            Visit the bakery <MoveUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bestsellerProducts.map((product, index) => {
            const tag = productTags[index] ?? productTags[0]
            const image = product.images[0]?.endsWith('.svg') ? productImageFallbacks[index] ?? productImageFallbacks[0] : product.images[0]
            return (
              <article key={product.id} className="group relative overflow-hidden rounded-[4px] border border-[#eadcc7] bg-[#fffaf2] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(87,44,18,0.12)]">
                <div className="relative aspect-[1.22] overflow-hidden bg-parchment-alt">
                  <Image src={image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <span className="absolute left-3 top-3 rounded-full bg-jam px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">{tag}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-medium text-jam">{product.name}</h3>
                      <p className="mt-1 line-clamp-1 text-xs text-[#806f61]">{product.description}</p>
                    </div>
                    <span className="whitespace-nowrap font-display text-lg font-medium text-jam">{product.priceLabel ?? formatPrice(product.price)}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-[#ecdcc5] pt-4">
                    <span className="text-xs uppercase tracking-[0.12em] text-[#997b5e]">Made with love</span>
                    <Link href="#order" className="flex h-9 w-9 items-center justify-center rounded-full bg-jam text-white transition-colors hover:bg-[#64131e]" aria-label={`Order ${product.name}`}>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section id="story" className="scroll-mt-24 bg-[#f1e1c7]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[540px]">
            <Image src="/images/story-varanasi.png" alt="Sunrise over Varanasi ghats with a loaf of bread in the foreground" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#34150f]/40 via-transparent to-transparent" />
            <p className="absolute bottom-7 left-7 max-w-[170px] rotate-[-7deg] font-display text-3xl italic leading-[0.9] text-[#fff7e9]">From our ovens to your heart ♡</p>
          </div>
          <div className="flex items-center px-6 py-16 md:px-16 md:py-20 lg:px-20">
            <div className="max-w-xl">
              <p className="eyebrow text-[#a2682c]">More than just a bakery</p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-jam md:text-6xl">A little sweetness, a lot of heart.</h2>
              <p className="mt-7 text-base leading-7 text-[#554239]">
                Rooted in the spiritual and cultural heart of Varanasi, Shree Ram Bakers has been spreading sweetness since 1985. We believe the best bakes are made slowly, shared generously, and remembered long after the last crumb.
              </p>
              <p className="mt-4 text-base leading-7 text-[#554239]">
                From our first oven to every celebration today, the promise stays the same: quality ingredients, familiar flavours, and a warm welcome for everyone who walks through our doors.
              </p>
              <Link href="#visit" className="btn-landing-primary mt-8 group">Our story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-[#a2682c]">Real people. Sweeter stories.</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-[-0.04em] text-jam md:text-5xl">What our customers say</h2>
          </div>
          <div className="hidden gap-2 md:flex" aria-hidden="true">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9c5a8] text-jam/50"><ArrowRight className="h-4 w-4 rotate-180" /></span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-jam text-jam"><ArrowRight className="h-4 w-4" /></span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <figure key={testimonial.id} className="rounded-[4px] border border-[#e5d7c2] bg-[#fffaf2] p-6 md:p-7">
              <div className="mb-6 flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-[#d89222] text-[#d89222]" />)}
              </div>
              <blockquote className="min-h-[105px] font-body text-base leading-7 text-[#514139]">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-[#eadcc6] pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ecd3aa] font-display text-sm font-medium text-jam">{testimonial.authorName.split(' ').map((name) => name[0]).join('').slice(0, 2)}</span>
                <span>
                  <span className="block font-display text-base font-medium text-jam">{testimonial.authorName}</span>
                  <span className="block text-xs text-[#8d7662]">Happy customer</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3" aria-label="Google Maps reviews">
          <span className="text-sm text-[#806f61]">Read more reviews:</span>
          {googleReviewLinks.map((reviewUrl, index) => (
            <a
              key={reviewUrl}
              href={reviewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center rounded-full border border-[#d9c5a8] px-3 text-xs font-medium text-jam transition-colors hover:bg-jam hover:text-white"
            >
              Google review {index + 1}
            </a>
          ))}
        </div>
      </section>

      <section id="order" className="relative isolate overflow-hidden scroll-mt-24 bg-jam px-6 py-14 text-white md:px-12 md:py-16 lg:px-16">
        <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full border border-white/15" aria-hidden="true" />
        <div className="absolute -right-2 -top-16 h-56 w-56 rounded-full border border-white/10" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-[1120px] flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-[#f3cc8d]">Make every occasion sweeter</p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-none md:text-5xl">Bring home a little joy.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">Order your favourites now or talk to us about a cake made especially for your celebration.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${settings.phone.split(' / ')[0]}`} className="btn-landing-light"><MessageCircle className="h-4 w-4" /> Call to order</a>
            <Link href="#visit" className="btn-landing-dark group">Visit our store <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </div>
      </section>

      <section id="visit" className="scroll-mt-24 bg-[#fbf5ea] px-6 py-20 md:px-12 md:py-24 lg:px-16">
        <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="eyebrow text-[#a2682c]">Come say hello</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-[-0.04em] text-jam md:text-5xl">Find us in the heart of Varanasi.</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#ad712d]" strokeWidth={1.5} />
                <div><p className="font-display text-lg text-jam">Visit us</p><p className="mt-1 text-sm leading-6 text-[#735f50]">{settings.address}</p></div>
              </div>
              <div className="flex gap-3">
                <Clock3 className="mt-1 h-5 w-5 shrink-0 text-[#ad712d]" strokeWidth={1.5} />
                <div><p className="font-display text-lg text-jam">Open every day</p><p className="mt-1 text-sm leading-6 text-[#735f50]">9:00 a.m. to 11:00 p.m.<br />Monday to Sunday</p></div>
              </div>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-[4px] bg-[#ead6b8]">
            <Image src="/images/gallery/shop-front-wide.jpg" alt="Shree Ram Bakers storefront in Chetganj, Varanasi" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#34150f]/85 via-[#34150f]/15 to-transparent" aria-hidden="true" />
            <div className="relative flex h-full min-h-[300px] flex-col items-center justify-end p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-jam text-white shadow-lg"><MapPin className="h-6 w-6" /></span>
              <p className="mt-4 font-display text-xl text-white">The sweetest stop in Chetganj</p>
              <a href={settings.mapUrl} target="_blank" rel="noreferrer" className="mt-1 text-sm text-white underline underline-offset-4">Open in Maps</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
