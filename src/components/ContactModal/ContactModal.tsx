'use client'

import { useState, useEffect, FormEvent } from 'react'
import styles from './ContactModal.module.css'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const SERVICES = [
  { value: 'software-engineering', label: 'Software Engineering as a Service' },
  { value: 'rd-services', label: 'R&D Services' },
  { value: 'aidd-consulting', label: 'AI-Driven Development Consulting' },
  { value: 'open-source', label: 'Open Source Development' },
  { value: 'other', label: 'Other' },
]

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [regarding, setRegarding] = useState('')
  const [details, setDetails] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const resetForm = () => {
    setName('')
    setEmail('')
    setRegarding('')
    setDetails('')
    setStatus('idle')
    setErrorMessage('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const dismissSuccess = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          regarding,
          details,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className={styles.successTitle}>Message Sent!</h2>
            <p className={styles.successMessage}>
              Thank you for reaching out. We'll get back to you as soon as possible.
            </p>
            <button
              className={styles.dismissButton}
              onClick={dismissSuccess}
            >
              Dismiss
            </button>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Get in Touch</h2>
            <p className={styles.subtitle}>
              Tell us about your project and we'll be in touch soon.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  required
                  disabled={status === 'submitting'}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                  disabled={status === 'submitting'}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="regarding" className={styles.label}>
                  Regarding
                </label>
                <select
                  id="regarding"
                  value={regarding}
                  onChange={(e) => setRegarding(e.target.value)}
                  className={styles.select}
                  required
                  disabled={status === 'submitting'}
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="details" className={styles.label}>
                  Details
                </label>
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className={styles.textarea}
                  rows={5}
                  placeholder="Tell us more about your project or inquiry..."
                  required
                  disabled={status === 'submitting'}
                />
              </div>

              {status === 'error' && (
                <div className={styles.error}>
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
