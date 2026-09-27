import { z } from 'zod'

const phonePattern = /^(?:\+?91)?[6-9]\d{9}$/

export function getLocalDateString(date = new Date()): string {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return localDate.toISOString().slice(0, 10)
}

export const inquiryBaseSchema = z.object({
  type: z.enum(['general', 'custom-order']),
  name: z.string().trim().min(2, 'Enter at least 2 characters').max(100),
  phone: z.string().trim().max(20).optional().refine(
    value => !value || phonePattern.test(value.replace(/[\s().-]/g, '')),
    'Enter a valid Indian mobile number'
  ),
  product: z.string().trim().min(1, 'Tell us what you would like to enquire about').max(120),
  quantity: z.coerce.number().int('Enter a whole number').min(1, 'Quantity must be at least 1').max(1000),
  variant: z.string().max(80).optional(),
  preferredDate: z.string().optional().refine(
    value => !value || value >= getLocalDateString(),
    'Choose today or a future date'
  ),
  occasion: z.string().max(60).optional(),
  flavor: z.string().max(80).optional(),
  budget: z.string().max(40).optional(),
  requirements: z.string().trim().max(500, 'Keep requirements under 500 characters').optional(),
  notes: z.string().trim().max(500, 'Keep notes under 500 characters').optional(),
})

export const customOrderSchema = inquiryBaseSchema.extend({
  type: z.literal('custom-order'),
})

export const generalInquirySchema = inquiryBaseSchema.extend({
  type: z.literal('general'),
})

export const inquirySchema = z.union([customOrderSchema, generalInquirySchema])

export type InquiryInput = z.infer<typeof inquirySchema>
export type CustomOrderInput = z.infer<typeof customOrderSchema>
export type GeneralInquiryInput = z.infer<typeof generalInquirySchema>
