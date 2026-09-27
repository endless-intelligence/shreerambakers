import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  alternate?: boolean
  id?: string
  ariaLabel?: string
}

export function Section({ children, className, alternate, id, ariaLabel }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        'section',
        alternate && 'section-alt',
        className
      )}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('text-center max-w-3xl mx-auto mb-16', className)}>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-lg text-[rgba(40,34,29,0.7)] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}