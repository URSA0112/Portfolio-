'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-1 glass-hover">
      <span className="text-3xl font-bold gradient-text">{value}</span>
      <span className="text-sm text-white/40">{label}</span>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="font-mono text-xs text-violet-400/60 tracking-[0.3em] uppercase mb-4"
        >
          01 — About
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.h2
              custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
            >
              Building the{' '}
              <span className="gradient-text">web</span>
              <br />one commit at a time.
            </motion.h2>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="text-white/50 leading-relaxed mb-4"
            >
              I'm a full-stack developer who loves turning complex problems into clean, elegant solutions.
              From mobile apps to web platforms, I bring ideas to life through thoughtful code and deliberate design.
            </motion.p>
            <motion.p
              custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="text-white/50 leading-relaxed mb-8"
            >
              When I'm not coding, I'm exploring new frameworks, contributing to open source, and pushing the
              boundaries of what's possible with modern web technology.
            </motion.p>

            {/* Info grid */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {[
                { label: 'Handle', value: 'URSA0112' },
                { label: 'Email', value: 'nimone99@gmail.com' },
                { label: 'GitHub', value: 'github.com/URSA0112' },
                { label: 'Status', value: '✦ Open to work', highlight: true },
              ].map(({ label, value, highlight }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-widest text-white/25 font-mono">{label}</span>
                  <span className={`text-sm font-medium ${highlight ? 'text-emerald-400' : 'text-white/75'}`}>
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div custom={5} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <a
                href="https://github.com/URSA0112"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass glass-hover text-sm font-semibold text-white/70 hover:text-white transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View GitHub
              </a>
            </motion.div>
          </div>

          {/* Right — stats grid */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
            className="grid grid-cols-2 gap-4"
          >
            <StatCard value="6+" label="Projects shipped" />
            <StatCard value="10+" label="Technologies" />
            <StatCard value="3+" label="Years coding" />
            <div className="glass rounded-2xl p-6 flex flex-col justify-between glass-hover">
              <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center mb-4">
                <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3m-6 3.75h.008v.008H6.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white/70 mb-0.5">Full Stack</p>
                <p className="text-xs text-white/30">Web + Mobile</p>
              </div>
            </div>

            {/* GitHub streak widget */}
            <div className="col-span-2 glass rounded-2xl p-4 glass-hover overflow-hidden">
              <p className="text-[10px] uppercase tracking-widest text-white/25 font-mono mb-3">GitHub Activity</p>
              <img
                src="https://streak-stats.demolab.com/?user=URSA0112&theme=transparent&hide_border=true&ring=7c3aed&fire=a78bfa&currStreakLabel=a78bfa&sideLabels=94a3b8&dates=94a3b8&currStreakNum=c4b5fd&sideNums=c4b5fd&stroke=ffffff10&background=00000000"
                alt="GitHub streak stats"
                width={495}
                height={195}
                className="w-full rounded-lg"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
