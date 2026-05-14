'use client'
import { Component, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#06060f]" />,
})

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) {
      return (
        <div className="absolute inset-0 bg-[#06060f]">
          <div className="absolute inset-0 bg-gradient-radial from-violet-900/20 via-transparent to-transparent" />
        </div>
      )
    }
    return this.props.children
  }
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* R3F Scene */}
      <div className="absolute inset-0">
        <SceneBoundary>
          <HeroScene />
        </SceneBoundary>
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#06060f] to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pt-20">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center gap-6">

          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono text-cyan-400/80 tracking-widest border border-cyan-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              AVAILABLE FOR WORK
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={item} className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02]">
            <span className="block text-white/90">Full Stack</span>
            <span className="block gradient-text">Developer</span>
          </motion.h1>

          {/* Sub */}
          <motion.p variants={item} className="max-w-lg text-base sm:text-lg text-white/45 leading-relaxed">
            I craft performant, beautiful digital experiences — from pixel-perfect UIs to scalable back-end systems.
          </motion.p>

          {/* Terminal tag */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm px-4 py-2 glass rounded-lg text-white/30 border-white/[0.06]">
              <span className="text-violet-400">$</span>
              <span>npm run</span>
              <span className="text-cyan-400">build-awesome-stuff</span>
              <span className="w-px h-3.5 bg-white/40 animate-pulse" />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-violet-900/30"
            >
              View Projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white/70 glass hover:text-white hover:border-white/20 transition-all duration-200"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            variants={item}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
