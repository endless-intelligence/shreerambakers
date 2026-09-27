import { Resend } from 'resend'
import { OwnerNotificationEmail } from './templates/OwnerNotification'
import { CustomerConfirmationEmail } from './templates/CustomerConfirmation'
import type { InquiryInput } from '@/lib/validation/schemas'

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'owner@shreerambakers.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@shreerambakers.com'

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

export async function sendInquiryEmails(data: InquiryInput): Promise<{ success: boolean; error?: string }> {
  const resend = getResendClient()
  if (!resend) {
    console.warn('RESEND_API_KEY not configured, skipping email send')
    return { success: true }
  }

  const referenceId = `SRB-${Date.now().toString(36).toUpperCase()}`
  const submittedAt = new Date().toISOString()

  try {
    // Send owner notification
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: data.type === 'custom-order'
        ? `New Custom Cake Inquiry — ${data.name} (${referenceId})`
        : `New Contact Message — ${data.name} (${referenceId})`,
      react: OwnerNotificationEmail({
        ...data,
        submittedAt,
      }),
    })

    // Send customer confirmation
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: data.type === 'custom-order'
        ? `Your Custom Cake Inquiry — Shree Ram Bakers (${referenceId})`
        : `We received your message — Shree Ram Bakers (${referenceId})`,
      react: CustomerConfirmationEmail({
        name: data.name,
        type: data.type,
        referenceId,
      }),
    })

    return { success: true }
  } catch (error) {
    console.error('Email send failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

export async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  if (!secretKey) return true // Skip verification if not configured

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: secretKey, response: token }),
    })
    const result = await response.json()
    return result.success === true
  } catch {
    return false
  }
}