'use client'

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  asChild?: boolean
}

const buttonOnlyProps = new Set([
  'type',
  'form',
  'formAction',
  'formEncType',
  'formMethod',
  'formNoValidate',
  'formTarget',
  'popover',
  'popoverTarget',
  'popoverTargetAction',
])

function filterAnchorProps(props: Record<string, any>): Record<string, any> {
  const filtered: Record<string, any> = {}
  for (const [key, value] of Object.entries(props)) {
    if (!buttonOnlyProps.has(key)) {
      filtered[key] = value
    }
  }
  return filtered
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, asChild, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-body font-medium transition-all duration-200 ease-custom rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jam focus-visible:ring-offset-2 focus-visible:ring-offset-parchment disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-jam text-white hover:bg-[#5a202f]',
      secondary: 'bg-transparent border-2 border-jam text-jam hover:bg-jam hover:text-white',
      ghost: 'bg-transparent text-ink hover:text-jam hover:underline',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const classNames = cn(baseClasses, variants[variant], sizes[size], className)

    if (asChild) {
      const anchorProps = filterAnchorProps(props)
      const anchorRef = ref as React.Ref<HTMLAnchorElement>
      return (
        <a
          ref={anchorRef}
          className={classNames}
          {...anchorProps}
        >
          {loading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {children}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'