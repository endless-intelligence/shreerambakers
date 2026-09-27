import { Metadata } from 'next'
import { Section, SectionHeader } from '@/components/layout/Section'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/content-service'
import { Truck, Leaf, Heart, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about Shree Ram Bakers - our history, values, and commitment to handcrafted artisan baking since 1998.',
}

const values = [
  {
    icon: Heart,
    title: 'Handcrafted Everything',
    description: 'No machines shaping our loaves, no premixes in our pastries. Every item is mixed, shaped, and baked by hands that know the dough.',
  },
  {
    icon: Leaf,
    title: 'Honest Ingredients',
    description: 'Unbleached flour, 82% butter, real fruit, 70% Belgian chocolate. If we wouldn\'t serve it to our own families, it doesn\'t leave our kitchen.',
  },
  {
    icon: Truck,
    title: 'Local First',
    description: 'We source wheat from Punjab farms, dairy from local dairies, and seasonal fruit from nearby orchards. Fresher ingredients, smaller footprint.',
  },
  {
    icon: Award,
    title: 'Time-Honored Methods',
    description: '18-hour sourdough fermentation. 3-day croissant lamination. Slow baking in stone-deck ovens. Some things simply cannot be rushed.',
  },
]

const team = [
  {
    name: 'Ram Kumar',
    role: 'Founder & Head Baker',
    bio: 'Started baking at 14 in his father\'s kitchen. 40+ years of dough under his fingernails. Still wakes up at 3am to check the first proof.',
    image: '/images/team/ram.svg',
  },
  {
    name: 'Priya Kumar',
    role: 'Pastry Chef',
    bio: 'Trained in Paris, returned home to bring French technique to Indian flavors. Her almond croissants have a waiting list.',
    image: '/images/team/priya.svg',
  },
  {
    name: 'Arjun Singh',
    role: 'Bread Baker',
    bio: 'Obsessed with fermentation. Manages our sourdough starters — some older than he is. Believes the best bread teaches patience.',
    image: '/images/team/arjun.svg',
  },
]

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return (
    <div className="min-h-screen">
      <Section className="pb-6 pt-8 md:pb-8 md:pt-12" aria-label="About hero">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-parchment-alt text-jam text-sm font-body font-medium mb-6">
            Since 1998
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink mb-6 leading-tight">
            Our Story
          </h1>
          <p className="font-body text-xl text-[rgba(40,34,29,0.7)] leading-relaxed">
            {settings.tagline}
          </p>
        </div>
      </Section>

      <Section alternate aria-label="History">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-parchment-alt" aria-hidden="true" />
            <Image
              src="/images/story-varanasi.png"
              alt="Ram Kumar shaping dough in the original bakery kitchen"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-6">
              Three decades of dawn patrols
            </h2>
            <div className="prose prose-ink max-w-none font-body text-lg text-[rgba(40,34,29,0.7)] leading-relaxed space-y-4">
              <p>
                In 1998, Ram Kumar opened a 200-square-foot shop in Sector 15 with a second-hand oven,
                a wooden peel, and a sourdough starter his grandfather gave him.
              </p>
              <p>
                The neighborhood came for the crusty boule, stayed for the butter croissants.
                Word spread. The shop grew. The team grew. But the rhythm never changed:
                fire the oven at 3am, mix by feel, proof by time, bake by instinct.
              </p>
              <p>
                Today we&apos;re a team of eight, still in Sector 15, still using that same starter.
                We&apos;ve added celebration cakes, custom orders, and a few more ovens —
                but ask any regular and they&apos;ll tell you: the sourdough tastes exactly like it did in &apos;98.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section aria-label="Values">
        <SectionHeader
          title="What we believe"
          subtitle="Four principles that guide every bake"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => (
            <article key={value.title} className="bg-white p-6 md:p-8 rounded-2xl">
              <div className="w-12 h-12 bg-parchment-alt rounded-xl flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-jam" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-medium text-ink mb-3">{value.title}</h3>
              <p className="font-body text-[rgba(40,34,29,0.7)] leading-relaxed">{value.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section alternate aria-label="Team">
        <SectionHeader
          title="The hands behind the bread"
          subtitle="Meet the team that wakes up before the city"
        />
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <article key={member.name} className="text-center">
              <div className="relative aspect-square max-w-xs mx-auto mb-6 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-parchment-alt" aria-hidden="true" />
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="font-display text-lg font-medium text-ink mb-1">{member.name}</h3>
              <p className="font-body text-sm text-jam font-medium mb-3">{member.role}</p>
              <p className="font-body text-sm text-[rgba(40,34,29,0.7)] leading-relaxed">{member.bio}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section aria-label="Sourcing">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-6">
            Where it comes from matters
          </h2>
          <div className="prose prose-ink max-w-none font-body text-lg text-[rgba(40,34,29,0.7)] leading-relaxed space-y-4 text-left">
            <p>
              Our wheat comes from family farms in Punjab — stone-ground to preserve the germ and bran.
              The butter is churned fresh weekly by a dairy cooperative in Mohali.
              Eggs from free-range hens at a farm in Zirakpur.
              Seasonal fruit — mangoes from Ratnagiri, strawberries from Mahabaleshwar, apples from Himachal.
            </p>
            <p>
              We visit our suppliers. We know their names. We taste every batch.
              It costs more and takes longer, but the flavor tells the truth.
            </p>
          </div>
        </div>
      </Section>
    </div>
  )
}
