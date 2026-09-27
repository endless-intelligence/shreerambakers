'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { inquirySchema, customOrderSchema, generalInquirySchema, type InquiryInput } from '@/lib/validation/schemas'
import { useToast } from '@/components/ui/Toast'

interface InquiryFormProps {
  variant: 'contact' | 'custom-order'
  initialData?: Partial<InquiryInput>
  className?: string
}

const CAKE_SIZES = [
  { value: '6-inch (6-8 servings)', label: '6-inch — 6–8 servings' },
  { value: '7-inch (10-12 servings)', label: '7-inch — 10–12 servings' },
  { value: '8-inch (12-16 servings)', label: '8-inch — 12–16 servings' },
  { value: '9-inch (16-20 servings)', label: '9-inch — 16–20 servings' },
  { value: '10-inch (20-25 servings)', label: '10-inch — 20–25 servings' },
  { value: 'tiered (30+ servings)', label: 'Tiered cake — 30+ servings' },
]

const FLAVORS = [
  { value: 'vanilla-bean', label: 'Vanilla Bean' },
  { value: 'dark-chocolate', label: 'Dark Chocolate (70%)' },
  { value: 'chocolate-vanilla', label: 'Chocolate & Vanilla Marble' },
  { value: 'red-velvet', label: 'Red Velvet' },
  { value: 'lemon-elderflower', label: 'Lemon Elderflower' },
  { value: 'carrot-walnut', label: 'Carrot Walnut' },
  { value: 'coffee-hazelnut', label: 'Coffee Hazelnut' },
  { value: 'mango-passionfruit', label: 'Mango Passionfruit (seasonal)' },
  { value: 'strawberry-vanilla', label: 'Strawberry Vanilla' },
  { value: 'black-forest', label: 'Black Forest (Kirsch, cherries)' },
  { value: 'other', label: 'Other / Custom' },
]

const BUDGET_RANGES = [
  { value: 'under-1500', label: 'Under ₹1,500' },
  { value: '1500-2500', label: '₹1,500 – ₹2,500' },
  { value: '2500-4000', label: '₹2,500 – ₹4,000' },
  { value: '4000-6000', label: '₹4,000 – ₹6,000' },
  { value: '6000+', label: '₹6,000+' },
  { value: 'flexible', label: 'Flexible / Discuss' },
]

export function InquiryForm({ variant, initialData, className }: InquiryFormProps) {
  const { addToast } = useToast()
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [turnstileToken, setTurnstileToken] = useState('')

  const isCustomOrder = variant === 'custom-order'
  const schema = isCustomOrder ? customOrderSchema : generalInquirySchema

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<InquiryInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: isCustomOrder ? 'custom-order' : 'general',
      name: '',
      email: '',
      phone: '',
      message: '',
      eventDate: '',
      cakeSize: '',
      flavor: '',
      budget: '',
      honeypot: '',
      turnstileToken: '',
      ...initialData,
    },
  })

  const watchedProduct = watch('message')

  const onSubmit = async (data: InquiryInput) => {
    setSubmitStatus('submitting')
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, turnstileToken }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        addToast(isCustomOrder ? 'Your custom cake inquiry has been sent!' : 'Your message has been sent!', 'success')
        reset({ type: isCustomOrder ? 'custom-order' : 'general', honeypot: '', turnstileToken: '' } as any)
      } else {
        setSubmitStatus('error')
        addToast(result.error || 'Something went wrong. Please try again.', 'error')
      }
    } catch {
      setSubmitStatus('error')
      addToast('Network error. Please check your connection and try again.', 'error')
    }
  }

  const handleTurnstileChange = (token: string) => {
    setTurnstileToken(token)
    setValue('turnstileToken', token, { shouldValidate: true })
  }

  useEffect(() => {
    const turnstileWindow = window as Window & { onTurnstileSuccess?: (token: string) => void }
    turnstileWindow.onTurnstileSuccess = handleTurnstileChange
    return () => {
      delete turnstileWindow.onTurnstileSuccess
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-6', className)} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Your Name"
          placeholder="Priya Sharma"
          error={errors.name?.message}
          {...register('name')}
          required
          autoComplete="name"
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="priya@example.com"
          error={errors.email?.message}
          {...register('email')}
          required
          autoComplete="email"
        />
      </div>

      <Input
        label="Phone Number (optional)"
        type="tel"
        placeholder="+91 98765 43210"
        error={errors.phone?.message}
        {...register('phone')}
        autoComplete="tel"
      />

      {isCustomOrder && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Event Date"
            placeholder="Select date"
            error={(errors as any).eventDate?.message}
            options={[
              { value: '', label: 'Select event date' },
              ...Array.from({ length: 90 }, (_, i) => {
                const date = new Date()
                date.setDate(date.getDate() + i + 1)
                return { value: date.toISOString().split('T')[0], label: date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) }
              }),
            ]}
            {...register('eventDate')}
            required
          />
          <Select
            label="Cake Size"
            placeholder="Select size"
            error={(errors as any).cakeSize?.message}
            options={[{ value: '', label: 'Select cake size' }, ...CAKE_SIZES]}
            {...register('cakeSize')}
            required
          />
        </div>
      )}

      {isCustomOrder && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Flavor Preference"
            placeholder="Select flavor"
            error={(errors as any).flavor?.message}
            options={[{ value: '', label: 'Select flavor' }, ...FLAVORS]}
            {...register('flavor')}
            required
          />
          <Select
            label="Budget Range"
            placeholder="Select budget"
            error={(errors as any).budget?.message}
            options={[{ value: '', label: 'Select budget (optional)' }, ...BUDGET_RANGES]}
            {...register('budget')}
          />
        </div>
      )}

      <Textarea
        label={isCustomOrder ? 'Design Details & Special Requests' : 'Your Message'}
        placeholder={isCustomOrder
          ? 'Describe your dream cake — theme, colors, decorations, dietary needs, inspiration photos...'
          : 'How can we help you?'}
        rows={isCustomOrder ? 6 : 5}
        error={errors.message?.message}
        {...register('message')}
        required
      />

      <input type="hidden" {...register('honeypot')} tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden="true" />

      <div className="pt-2">
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
          data-callback="onTurnstileSuccess"
          data-theme="light"
          data-size="normal"
        />
        {errors.turnstileToken && (
          <p className="mt-2 text-sm text-red-600" role="alert">Please complete the verification</p>
        )}
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg"
            role="status"
          >
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" aria-hidden="true" />
            <p className="font-body text-green-800">
              {isCustomOrder
                ? 'Thank you! We\'ll review your custom cake request and get back within 24 hours.'
                : 'Thank you for your message! We\'ll respond within 24 hours.'}
            </p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" aria-hidden="true" />
            <p className="font-body text-red-800">Something went wrong. Please try again or call us directly.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full md:w-auto"
        loading={submitStatus === 'submitting'}
        disabled={submitStatus === 'submitting'}
      >
        {submitStatus === 'submitting' ? 'Sending…' : isCustomOrder ? 'Submit Custom Cake Request' : 'Send Message'}
      </Button>
    </form>
  )
}