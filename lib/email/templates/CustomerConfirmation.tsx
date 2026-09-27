import { Html, Head, Body, Container, Section, Text, Link, Hr } from '@react-email/components'

interface CustomerConfirmationProps {
  name: string
  type: 'general' | 'custom-order'
  referenceId: string
}

export function CustomerConfirmationEmail({ name, type, referenceId }: CustomerConfirmationProps) {
  const isCustomOrder = type === 'custom-order'

  return (
    <Html lang="en">
      <Head />
      <Body style={{ fontFamily: 'Public Sans, sans-serif', backgroundColor: '#FAF5E9', margin: 0, padding: '40px 0' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(40,34,29,0.08)' }}>
          <Section style={{ backgroundColor: '#3A2E23', padding: '32px', textAlign: 'center' }}>
            <Text style={{ color: '#FAF5E9', fontSize: '28px', fontWeight: '600', margin: 0, fontFamily: 'Fraunces, serif' }}>
              Shree Ram Bakers
            </Text>
            <Text style={{ color: '#E8B94A', fontSize: '14px', marginTop: '8px' }}>
              Handcrafted with patience. Served with warmth.
            </Text>
          </Section>

          <Section style={{ padding: '32px' }}>
            <Text style={{ color: '#28221D', fontSize: '22px', fontWeight: '600', marginBottom: '16px', fontFamily: 'Fraunces, serif' }}>
              We received your message, {name.split(' ')[0]}
            </Text>

            <Text style={{ color: '#28221D', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
              Thank you for reaching out to us. {isCustomOrder ? 'Your custom cake inquiry' : 'Your message'} has been received and our team will review it shortly.
            </Text>

            <Text style={{ color: '#28221D', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
              <strong>Reference ID:</strong> {referenceId}
            </Text>

            <Text style={{ color: '#28221D', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
              We typically respond within 24 hours during business days. If your request is urgent, please call us directly at
              <Link href="tel:+916389368233" style={{ color: '#6B2737', fontWeight: '600' }}>
                6389368233 or 9140198122
              </Link>
            </Text>

            <Hr style={{ borderColor: '#F1E6CC', margin: '24px 0' }} />

            <Text style={{ color: '#28221D', fontSize: '16px', lineHeight: '1.6', marginBottom: '8px' }}>
              In the meantime, feel free to visit us:
            </Text>
            <Text style={{ color: '#28221D', fontSize: '16px', lineHeight: '1.6', marginBottom: '8px' }}>
              C12/75 Lahangpura, Chetganj, Varanasi-221001
            </Text>
            <Text style={{ color: '#28221D', fontSize: '16px', lineHeight: '1.6', marginBottom: '8px' }}>
              Open daily: 9:00 a.m. to 11:00 p.m.
            </Text>
          </Section>

          <Section style={{ backgroundColor: '#F1E6CC', padding: '24px 32px', textAlign: 'center', borderTop: '1px solid #E8D5B7' }}>
            <Text style={{ color: '#28221D', fontSize: '14px', margin: '0 0 12px' }}>
              Follow our daily bakes
            </Text>
            <Link href="https://www.instagram.com/shree_ram_bakers.1?stkn=NDNyMTVhNXUzZHFp" style={{ display: 'inline-block', margin: '0 8px', color: '#6B2737' }}>
              Instagram
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61577326994019" style={{ display: 'inline-block', margin: '0 8px', color: '#6B2737' }}>
              Facebook
            </Link>
            <Link href="https://wa.me/916389368233" style={{ display: 'inline-block', margin: '0 8px', color: '#6B2737' }}>
              WhatsApp
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}