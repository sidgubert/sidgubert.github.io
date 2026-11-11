import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Prompt from './Prompt'
import Typewriter from './Typewriter'

/** Cabeçalho de seção: rótulo, título e comando digitado ao entrar na viewport. */
export default function SectionHeader({ index, label, title, command }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })

  return (
    <header ref={ref} className="mb-8 sm:mb-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-phosphor-dim">
        // {index} — {label}
      </p>
      <h2 className="mt-2 font-mono text-2xl font-bold text-ink sm:text-4xl">
        {title}
        <span className="text-phosphor text-glow">_</span>
      </h2>
      <div className="mt-4 flex flex-wrap items-baseline font-mono text-xs sm:text-sm">
        <Prompt />
        <Typewriter text={command} start={inView} speed={0.03} className="break-all text-ink" />
      </div>
    </header>
  )
}

