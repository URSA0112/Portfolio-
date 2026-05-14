'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { nav } from '@/lib/data'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      setHidden(y > lastY.current && y > 200)
      lastY.current = y

      const sections = nav.map((n) => document.getElementById(n.toLowerCase()))
      let current = ''
      sections.forEach((sec) => {
        if (sec && window.scrollY >= sec.offsetTop - 120) current = sec.id
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/[0.06]' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-mono text-sm font-bold tracking-widest text-white/80 hover:text-white transition-colors">
            <span className="text-white/30">&lt;</span>
            <span className="gradient-text">URSA0112</span>
            <span className="text-white/30">/&gt;</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item)}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    active === item.toLowerCase() ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {item}
                  {active === item.toLowerCase() && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-violet-500 to-cyan-400"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="https://github.com/URSA0112"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-sm font-medium px-4 py-2 glass rounded-lg text-white/70 hover:text-white hover:border-violet-500/40 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="block h-px bg-current" />
              <motion.span animate={{ opacity: open ? 0 : 1 }} className="block h-px bg-current" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -10 : 0 }} className="block h-px bg-current" />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 inset-x-0 z-40 glass border-b border-white/[0.06] py-6 px-6 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {nav.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item)}
                    className="text-base font-medium text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
