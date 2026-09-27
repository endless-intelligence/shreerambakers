import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const secret = request.headers.get('x-sanity-webhook-secret')
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ success: false, error: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json()
    const { _type } = body

    // Revalidate relevant paths based on document type
    const pathsToRevalidate = ['/']

    switch (_type) {
      case 'product':
        pathsToRevalidate.push('/menu', '/menu/[category]')
        break
      case 'category':
        pathsToRevalidate.push('/menu')
        break
      case 'testimonial':
        pathsToRevalidate.push('/')
        break
      case 'galleryImage':
        pathsToRevalidate.push('/gallery')
        break
      case 'siteSettings':
        pathsToRevalidate.push('/', '/contact', '/about', '/custom-orders')
        break
    }

    // Revalidate all paths
    pathsToRevalidate.forEach(path => {
      revalidatePath(path)
    })

    return NextResponse.json({ success: true, revalidated: pathsToRevalidate })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ success: false, error: 'Revalidation failed' }, { status: 500 })
  }
}