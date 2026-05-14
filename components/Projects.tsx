'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '@/lib/data'

type Filter = 'all' | 'web' | 'mobile' | 'design'
const filters: Filter[] = ['all', 'web', 'mobile', 'design']

function GithubIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState<Filter>('all')

  const filtered = active === 'all'
    ? [...projects]
    : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-violet-400/60 tracking-[0.3em] uppercase mb-4"
        >
          03 — Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-10"
        >
          Things I've <span className="gradient-text">built</span>
        </motion.h2>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                active === f
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/30'
                  : 'glass text-white/40 hover:text-white/70'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group glass rounded-2xl overflow-hidden glass-hover flex flex-col"
            >
              {/* Color band */}
              <div
                className="h-1.5 w-full"
                style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
              />

              {/* Visual */}
              <div
                className="h-36 flex items-center justify-center relative overflow-hidden"
                style={{ background: `radial-gradient(ellipse at 50% 50%, ${project.accent}18 0%, transparent 70%)` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `${project.accent}15` }}
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}
                    style={{ color: project.accent }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                </div>
                {/* Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${project.accent}20, transparent 65%)` }}
                />
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest font-mono"
                        style={{ color: `${project.accent}99` }}>{project.category}</span>
                      {project.featured && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-400/80 border border-violet-500/20 font-mono uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white/90 mt-0.5 leading-tight">{project.title}</h3>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0 mt-1">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors">
                      <GithubIcon />
                    </a>
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors">
                        <ArrowIcon />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-white/40 leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-white/35 border border-white/[0.06]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://github.com/URSA0112"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors group"
          >
            See all repositories on GitHub
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
