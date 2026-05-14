'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const subject = data.get('subject') as string
    const message = data.get('message') as string

    const mailto = `mailto:nimone99@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`
    window.open(mailto)

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setTimeout(() => setSent(false), 4000)
    }, 600)
  }

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as number[] },
  })

  return (
    <section id="contact" className="py-32 px-6 bg-white/[0.015]" ref={ref}>
      <div className="max-w-5xl mx-auto">

        <motion.p {...fadeUp(0)} className="font-mono text-xs text-violet-400/60 tracking-[0.3em] uppercase mb-4">
          04 — Contact
        </motion.p>

        <motion.h2 {...fadeUp(0.1)} className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Let's work <span className="gradient-text">together</span>
        </motion.h2>
        <motion.p {...fadeUp(0.15)} className="text-white/40 mb-16 max-w-lg leading-relaxed">
          Have a project in mind, or just want to say hi? My inbox is always open.
          I'll get back to you as soon as possible.
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Contact cards */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-2 flex flex-col gap-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                ),
                label: 'Email',
                value: 'nimone99@gmail.com',
                href: 'mailto:nimone99@gmail.com',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
                label: 'GitHub',
                value: 'github.com/URSA0112',
                href: 'https://github.com/URSA0112',
              },
            ].map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 glass rounded-2xl p-5 glass-hover"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 transition-colors flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/25 font-mono mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{value}</p>
                </div>
              </a>
            ))}

            {/* Availability */}
            <div className="glass rounded-2xl p-5 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
                <span className="text-xs font-semibold text-emerald-400">Available for new projects</span>
              </div>
              <p className="text-xs text-white/30 leading-relaxed">
                Currently open to freelance projects, full-time roles, and interesting collaborations.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            {...fadeUp(0.25)}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-2xl p-7 flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id} className="flex flex-col gap-1.5">
                  <label htmlFor={id} className="text-xs text-white/35 font-mono tracking-wider">{label}</label>
                  <input
                    id={id} name={id} type={type} placeholder={placeholder} required
                    className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-xs text-white/35 font-mono tracking-wider">Subject</label>
              <input
                id="subject" name="subject" type="text" placeholder="What's this about?" required
                className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs text-white/35 font-mono tracking-wider">Message</label>
              <textarea
                id="message" name="message" rows={4} placeholder="Tell me about your project..." required
                className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all resize-none"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`mt-1 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                sent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-violet-600 to-violet-500 hover:to-cyan-500 text-white shadow-lg shadow-violet-900/25'
              }`}
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : sent ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Message sent!
                </>
              ) : (
                <>
                  Send Message
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
