import { NextResponse } from 'next/server'

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export function createSuccessResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  )
}

export function createErrorResponse(error: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  )
}

export interface ValidationRule<T> {
  validate: (value: T) => boolean
  message: string
}

export interface FieldValidation<T = unknown> {
  value: T
  rules: ValidationRule<T>[]
}

export function validateFields(
  fields: Record<string, FieldValidation>
): { valid: true } | { valid: false; error: string } {
  for (const [fieldName, field] of Object.entries(fields)) {
    for (const rule of field.rules) {
      if (!rule.validate(field.value)) {
        return {
          valid: false,
          error: rule.message.replace('{field}', fieldName),
        }
      }
    }
  }
  return { valid: true }
}

export const rules = {
  required: (message?: string): ValidationRule<unknown> => ({
    validate: (value) => value !== undefined && value !== null && value !== '',
    message: message ?? '{field} is required',
  }),
  email: (message?: string): ValidationRule<string> => ({
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: message ?? '{field} must be a valid email address',
  }),
  minLength: (min: number, message?: string): ValidationRule<string> => ({
    validate: (value) => value.length >= min,
    message: message ?? `{field} must be at least ${min} characters`,
  }),
  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    validate: (value) => value.length <= max,
    message: message ?? `{field} must be at most ${max} characters`,
  }),
  oneOf: <T>(options: T[], message?: string): ValidationRule<T> => ({
    validate: (value) => options.includes(value),
    message: message ?? '{field} must be one of the allowed values',
  }),
}

export async function parseJsonBody<T>(request: Request): Promise<T | null> {
  try {
    return await request.json()
  } catch {
    return null
  }
}
