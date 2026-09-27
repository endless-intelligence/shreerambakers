import { Html, Head, Body, Container, Section, Column, Text, Button, Link, Img, Hr } from '@react-email/components'

interface OwnerNotificationProps {
  type: 'general' | 'custom-order'
  name: string
  email: string
  phone?: string
  message: string
  eventDate?: string
  cakeSize?: string
  flavor?: string
  budget?: string
  submittedAt: string
}

export function OwnerNotificationEmail({ type, name, email, phone, message, eventDate, cakeSize, flavor, budget, submittedAt }: OwnerNotificationProps) {
  const isCustomOrder = type === 'custom-order'
  const subject = isCustomOrder ? 'New Custom Cake Inquiry' : 'New Contact Form Submission'

  return (
    <Html lang="en">
      <Head />
      <Body style={{ fontFamily: 'Public Sans, sans-serif', backgroundColor: '#FAF5E9', margin: 0, padding: '40px 0' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(40,34,29,0.08)' }}>
          <Section style={{ backgroundColor: '#3A2E23', padding: '32px', textAlign: 'center' }}>
            <Text style={{ color: '#FAF5E9', fontSize: '24px', fontWeight: '600', margin: 0, fontFamily: 'Fraunces, serif' }}>
              Shree Ram Bakers
            </Text>
            <Text style={{ color: '#E8B94A', fontSize: '14px', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              {subject}
            </Text>
          </Section>

          <Section style={{ padding: '32px' }}>
            <Text style={{ color: '#28221D', fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
              New inquiry received
            </Text>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC', width: '120px' }}>
                    <Text style={{ color: '#6B2737', fontWeight: '600', margin: 0 }}>Name</Text>
                  </td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                    <Text style={{ color: '#28221D', margin: 0 }}>{name}</Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                    <Text style={{ color: '#6B2737', fontWeight: '600', margin: 0 }}>Email</Text>
                  </td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                    <Link href={`mailto:${email}`} style={{ color: '#6B2737', textDecoration: 'none' }}>
                      {email}
                    </Link>
                  </td>
                </tr>
                {phone && (
                  <tr>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                      <Text style={{ color: '#6B2737', fontWeight: '600', margin: 0 }}>Phone</Text>
                    </td>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                      <Link href={`tel:${phone}`} style={{ color: '#6B2737', textDecoration: 'none' }}>
                        {phone}
                      </Link>
                    </td>
                  </tr>
                )}
                {isCustomOrder && (
                  <>
                    <tr>
                      <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                        <Text style={{ color: '#6B2737', fontWeight: '600', margin: 0 }}>Event Date</Text>
                      </td>
                      <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                        <Text style={{ color: '#28221D', margin: 0 }}>{eventDate}</Text>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                        <Text style={{ color: '#6B2737', fontWeight: '600', margin: 0 }}>Cake Size</Text>
                      </td>
                      <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                        <Text style={{ color: '#28221D', margin: 0 }}>{cakeSize}</Text>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                        <Text style={{ color: '#6B2737', fontWeight: '600', margin: 0 }}>Flavor</Text>
                      </td>
                      <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                        <Text style={{ color: '#28221D', margin: 0 }}>{flavor}</Text>
                      </td>
                    </tr>
                    {budget && (
                      <tr>
                        <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                          <Text style={{ color: '#6B2737', fontWeight: '600', margin: 0 }}>Budget</Text>
                        </td>
                        <td style={{ padding: '12px 0', borderBottom: '1px solid #F1E6CC' }}>
                          <Text style={{ color: '#28221D', margin: 0 }}>{budget}</Text>
                        </td>
                      </tr>
                    )}
                  </>
                )}
                <tr>
                  <td style={{ padding: '12px 0', verticalAlign: 'top' }}>
                    <Text style={{ color: '#6B2737', fontWeight: '600', margin: 0 }}>Message</Text>
                  </td>
                  <td style={{ padding: '12px 0' }}>
                    <Text style={{ color: '#28221D', margin: 0, whiteSpace: 'pre-wrap' }}>{message}</Text>
                  </td>
                </tr>
              </tbody>
            </table>

            <Text style={{ color: '#6B2737', fontSize: '12px', marginTop: '24px' }}>
              Submitted: {new Date(submittedAt).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}
            </Text>
          </Section>

          <Section style={{ backgroundColor: '#F1E6CC', padding: '24px 32px', textAlign: 'center', borderTop: '1px solid #E8D5B7' }}>
            <Text style={{ color: '#28221D', fontSize: '14px', margin: 0 }}>
              Reply directly to this email to respond to {name}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}