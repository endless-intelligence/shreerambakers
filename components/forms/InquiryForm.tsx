'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageCircle } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { customOrderSchema, generalInquirySchema, getLocalDateString, type InquiryInput } from '@/lib/validation/schemas'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

interface InquiryFormProps {
  variant: 'contact' | 'custom-order'
  initialData?: Partial<InquiryInput>
  productCategory?: string
  className?: string
}

const PRODUCT_VARIANTS = [
  { value: 'Half kg', label: 'Half kg' },
  { value: '1 kg', label: '1 kg' },
  { value: '1.5 kg', label: '1.5 kg' },
  { value: '2 kg', label: '2 kg' },
  { value: 'Custom size', label: 'Custom size' },
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

const OCCASIONS = [
  { value: 'Birthday', label: 'Birthday' },
  { value: 'Anniversary', label: 'Anniversary' },
  { value: 'Wedding', label: 'Wedding' },
  { value: 'Party', label: 'Party' },
  { value: 'Corporate', label: 'Corporate' },
  { value: 'Festival', label: 'Festival' },
  { value: 'Other', label: 'Other' },
]

export function InquiryForm({ variant, initialData, productCategory, className }: InquiryFormProps) {
  const [submitError, setSubmitError] = useState('')
  const isCustomOrder = variant === 'custom-order'
  const schema = isCustomOrder ? customOrderSchema : generalInquirySchema
  const showVariant = isCustomOrder || productCategory?.toLowerCase() === 'cakes'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: isCustomOrder ? 'custom-order' : 'general',
      name: '',
      phone: '',
      product: isCustomOrder ? 'Custom cake' : '',
      quantity: 1,
      variant: '',
      preferredDate: '',
      occasion: '',
      flavor: '',
      budget: '',
      requirements: '',
      notes: '',
      ...initialData,
    },
  })

  const onSubmit = (data: InquiryInput) => {
    setSubmitError('')
    window.location.assign(buildWhatsAppUrl(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, () => setSubmitError('Please correct the highlighted fields.'))} className={cn('space-y-6', className)} noValidate>
      <section aria-labelledby="enquiry-customer-heading" className="space-y-4">
        <h3 id="enquiry-customer-heading" className="font-display text-xl font-medium text-ink">Your details</h3>
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
            label="WhatsApp / Contact Number (optional)"
            type="tel"
            placeholder="+91 98765 43210"
            error={errors.phone?.message}
            {...register('phone')}
            autoComplete="tel"
            inputMode="tel"
          />
        </div>
      </section>

      <section aria-labelledby="enquiry-order-heading" className="space-y-4">
        <h3 id="enquiry-order-heading" className="font-display text-xl font-medium text-ink">Order details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Product or item"
            placeholder="e.g. Chocolate Truffle Cake"
            error={errors.product?.message}
            {...register('product')}
            required
            maxLength={120}
          />
          <Input
            label="Quantity"
            type="number"
            min={1}
            max={1000}
            step={1}
            error={errors.quantity?.message}
            {...register('quantity', { valueAsNumber: true })}
            required
          />
        </div>
        {showVariant && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
              label="Variant / size"
              placeholder="Choose a size (optional)"
              error={errors.variant?.message}
              options={PRODUCT_VARIANTS}
              {...register('variant')}
            />
            {isCustomOrder && (
              <Select
                label="Flavor preference (optional)"
                placeholder="Choose a flavor"
                error={errors.flavor?.message}
                options={FLAVORS.map(flavor => ({ value: flavor.value, label: flavor.label }))}
                {...register('flavor')}
              />
            )}
          </div>
        )}
        {isCustomOrder && !showVariant && (
          <Select
            label="Flavor preference (optional)"
            placeholder="Choose a flavor"
            error={errors.flavor?.message}
            options={FLAVORS.map(flavor => ({ value: flavor.value, label: flavor.label }))}
            {...register('flavor')}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Preferred date (optional)"
            type="date"
            min={getLocalDateString()}
            error={errors.preferredDate?.message}
            {...register('preferredDate')}
          />
          <Select
            label="Occasion (optional)"
            placeholder="Choose an occasion"
            error={errors.occasion?.message}
            options={OCCASIONS}
            {...register('occasion')}
          />
        </div>
        {isCustomOrder && (
          <Select
            label="Budget range (optional)"
            placeholder="Choose a budget"
            error={errors.budget?.message}
            options={[
              { value: 'Under ₹1,500', label: 'Under ₹1,500' },
              { value: '₹1,500–₹2,500', label: '₹1,500–₹2,500' },
              { value: '₹2,500–₹4,000', label: '₹2,500–₹4,000' },
              { value: '₹4,000–₹6,000', label: '₹4,000–₹6,000' },
              { value: '₹6,000+', label: '₹6,000+' },
              { value: 'Flexible', label: 'Flexible / Discuss' },
            ]}
            {...register('budget')}
          />
        )}
      </section>

      <section aria-labelledby="enquiry-requirements-heading" className="space-y-4">
        <h3 id="enquiry-requirements-heading" className="font-display text-xl font-medium text-ink">Special requirements</h3>
        <Textarea
          label="Additional requirements (optional)"
          placeholder="Eggless, less sweet, custom message, theme, delivery requirements..."
          rows={4}
          maxLength={500}
          error={errors.requirements?.message}
          {...register('requirements')}
        />
        <Textarea
          label="Other notes (optional)"
          placeholder="Anything else we should know?"
          rows={3}
          maxLength={500}
          error={errors.notes?.message}
          {...register('notes')}
        />
      </section>

      <p className="text-sm leading-6 text-[#796557]">
        WhatsApp opens with your enquiry ready. Review it there and tap Send to contact the bakery.
      </p>
      {submitError && <p className="text-sm text-red-600" role="alert">{submitError}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full md:w-auto"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Continue to WhatsApp
      </Button>
    </form>
  )
}