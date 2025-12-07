'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Navigation.module.css'
import { ContactModal } from '@/components/ContactModal'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const openContact = () => {
    setIsContactOpen(true)
    setIsMenuOpen(false)
  }
  const closeContact = () => setIsContactOpen(false)

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            Parallel Drive
          </Link>

          <div className={styles.desktopNav}>
            <Link href="/#services" className={styles.navLink}>
              Services
            </Link>
            <Link href="/#open-source" className={styles.navLink}>
              Open Source
            </Link>
            <Link href="/#about" className={styles.navLink}>
              About
            </Link>
            <button onClick={openContact} className={styles.contactButton}>
              Contact Us
            </button>
          </div>

          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} />
          </button>
        </div>

        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
          <Link href="/#services" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
            Services
          </Link>
          <Link href="/#open-source" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
            Open Source
          </Link>
          <Link href="/#about" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <button onClick={openContact} className={styles.mobileContactButton}>
            Contact Us
          </button>
        </div>
      </nav>

      <ContactModal isOpen={isContactOpen} onClose={closeContact} />
    </>
  )
}
