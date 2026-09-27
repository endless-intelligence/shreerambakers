import { z } from 'zod'

export const inquiryBaseSchema = z.object({
  type: z.enum(['general', 'custom-order']),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Spam detected'),
  turnstileToken: z.string().min(1, 'Please complete the verification'),
})

export const customOrderSchema = inquiryBaseSchema.extend({
  type: z.literal('custom-order'),
  eventDate: z.string().min(1, 'Event date is required'),
  cakeSize: z.string().min(1, 'Cake size is required'),
  flavor: z.string().min(1, 'Flavor preference is required'),
  budget: z.string().optional(),
})

export const generalInquirySchema = inquiryBaseSchema.extend({
  type: z.literal('general'),
})

export const inquirySchema = z.union([customOrderSchema, generalInquirySchema])

export type InquiryInput = z.infer<typeof inquirySchema>
export type CustomOrderInput = z.infer<typeof customOrderSchema>
export type GeneralInquiryInput = z.infer<typeof generalInquirySchema>

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Spam detected'),
  turnstileToken: z.string().min(1, 'Please complete the verification'),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>