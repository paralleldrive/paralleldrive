import {
  createSuccessResponse,
  createErrorResponse,
  validateFields,
  rules,
  parseJsonBody,
} from '@/lib/server/api-utils'

interface ContactFormData {
  name: string
  email: string
  regarding: string
  details: string
}

const VALID_SERVICES = [
  'software-engineering',
  'rd-services',
  'aidd-consulting',
  'open-source',
  'other',
]

export async function POST(request: Request) {
  const body = await parseJsonBody<ContactFormData>(request)

  if (!body) {
    return createErrorResponse('Invalid request body', 400)
  }

  const { name, email, regarding, details } = body

  const validation = validateFields({
    Name: {
      value: name,
      rules: [
        rules.required(),
        rules.minLength(2, 'Name must be at least 2 characters'),
        rules.maxLength(100, 'Name must be at most 100 characters'),
      ],
    },
    Email: {
      value: email,
      rules: [
        rules.required(),
        rules.email(),
        rules.maxLength(255, 'Email must be at most 255 characters'),
      ],
    },
    Regarding: {
      value: regarding,
      rules: [
        rules.required('Please select a service'),
        rules.oneOf(VALID_SERVICES, 'Please select a valid service'),
      ],
    },
    Details: {
      value: details,
      rules: [
        rules.required('Please provide some details about your inquiry'),
        rules.minLength(10, 'Details must be at least 10 characters'),
        rules.maxLength(5000, 'Details must be at most 5000 characters'),
      ],
    },
  })

  if (!validation.valid) {
    return createErrorResponse(validation.error, 400)
  }

  // Log the contact form submission
  // In production, this would send an email, save to database, etc.
  console.log('Contact form submission:', {
    name,
    email,
    regarding,
    details,
    timestamp: new Date().toISOString(),
  })

  return createSuccessResponse({
    message: 'Thank you for your message. We will be in touch soon.',
  })
}
