'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/lib/data'

const icons: Record<string, React.ReactNode> = {
  layers: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  server: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v.75a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75v-.75m19.5 0a.75.75 0 00.75-.75V14.25a.75.75 0 00-.75-.75H3a.75.75 0 00-.75.75v2.25m19.5 0h.008v.008H3.75v-.008zM3 9.75V7.5A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v2.25m-18 0a.75.75 0 00-.75.75v.75c0 .414.336.75.75.75h18a.75.75 0 00.75-.75v-.75a.75.75 0 00-.75-.75H3z" />
    </svg>
  ),
  smartphone: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15h.008v.008H10.5V18.75z" />
    </svg>
  ),
  tool: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-32 px-6 bg-white/[0.015]" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-violet-400/60 tracking-[0.3em] uppercase mb-4"
        >
          02 — Skills
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-16"
        >
          What I work <span className="gradient-text">with</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-6 flex flex-col gap-4 glass-hover group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                  {icons[cat.icon]}
                </div>
                <h3 className="font-semibold text-white/80 text-sm">{cat.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.08 + si * 0.04 }}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.07] text-white/55 hover:text-white/80 hover:border-violet-500/30 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.5 }}
          className="mt-16 glass rounded-2xl p-8"
        >
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-8">Proficiency</h3>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5">
            {[
              { label: 'JavaScript / TypeScript', pct: 90 },
              { label: 'React / Next.js', pct: 85 },
              { label: 'Node.js / APIs', pct: 80 },
              { label: 'Swift / iOS', pct: 75 },
              { label: 'Databases', pct: 72 },
              { label: 'UI/UX Design', pct: 68 },
            ].map(({ label, pct }, i) => (
              <div key={label} className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">{label}</span>
                  <span className="text-violet-400/70 font-mono">{pct}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
