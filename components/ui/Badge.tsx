'use client'

import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'vegetarian' | 'eggless' | 'gluten-free' | 'vegan' | 'contains-nuts' | 'contains-dairy'
}

const variantStyles = {
  vegetarian: 'bg-green-100 text-green-800',
  eggless: 'bg-amber-100 text-amber-800',
  'gluten-free': 'bg-blue-100 text-blue-800',
  vegan: 'bg-emerald-100 text-emerald-800',
  'contains-nuts': 'bg-orange-100 text-orange-800',
  'contains-dairy': 'bg-pink-100 text-pink-800',
}

const variantLabels: Record<string, string> = {
  vegetarian: 'Vegetarian',
  eggless: 'Eggless',
  'gluten-free': 'Gluten-Free',
  vegan: 'Vegan',
  'contains-nuts': 'Contains Nuts',
  'contains-dairy': 'Contains Dairy',
}

export function Badge({ variant, className, children, ...props }: BadgeProps) {
  const label = variant ? variantLabels[variant] : children

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium',
        variant && variantStyles[variant],
        className
      )}
      {...props}
    >
      {label}
    </span>
  )
}