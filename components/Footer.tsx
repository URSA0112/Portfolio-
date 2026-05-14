export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-white/30 tracking-widest">
          &lt;<span className="text-violet-400/80">URSA0112</span>/&gt;
        </span>
        <p className="text-xs text-white/25 text-center">
          Built with Next.js · Tailwind · Framer Motion · R3F &nbsp;·&nbsp; {new Date().getFullYear()}
        </p>
        <a
          href="https://github.com/URSA0112"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          github.com/URSA0112
        </a>
      </div>
    </footer>
  )
}
