import { NextRequest, NextResponse } from 'next/server'
import { inquirySchema } from '@/lib/validation/schemas'
import { sendInquiryEmails, verifyTurnstile } from '@/lib/email/resend'

// Simple in-memory rate limiter (use Upstash Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 10 * 60 * 1000 // 10 minutes
  const maxRequests = 5

  const record = rateLimitMap.get(ip)
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Honeypot check (must be empty)
    if (body.honeypot && body.honeypot.length > 0) {
      // Silently reject bots
      return NextResponse.json({ success: true })
    }

    // Validate with Zod
    const validationResult = inquirySchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Verify Turnstile
    const turnstileValid = await verifyTurnstile(data.turnstileToken)
    if (!turnstileValid) {
      return NextResponse.json(
        { success: false, error: 'Verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Send emails
    const result = await sendInquiryEmails(data)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send inquiry' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Inquiry API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}