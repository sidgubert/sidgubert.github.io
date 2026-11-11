import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Download, Rocket } from 'lucide-react'
import TerminalWindow from '../components/TerminalWindow'
import Prompt from '../components/Prompt'
import Typewriter from '../components/Typewriter'
import { bootLines, links } from '../data/profile'

const titleSegments = [
  { text: 'Sidnelson Gubert', className: 'text-phosphor text-glow' },
  { text: ' | ', className: 'text-muted/60' },
  { text: 'Software Engineer & AI Systems Developer', className: 'text-ink' },
]

const BOOT_STEP_MS = 170

/**
 * Hero "Terminal Boot":
 * 0 -> digita o comando | 1 -> logs de boot | 2 -> digita o título | 3 -> subtítulo + CTAs
 */
export default function Hero() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step !== 1) return
    const t = setTimeout(() => setStep(2), reduce ? 0 : bootLines.length * BOOT_STEP_MS + 350)
    return () => clearTimeout(t)
  }, [step, reduce])

  return (
    <section className="relative flex min-h-[100svh] items-center px-4 pb-16 pt-24 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <TerminalWindow title="bash — initialize_profile.sh — 120×40" bodyClassName="sm:p-8 lg:p-10">
          {/* Comando inicial */}
          <div className="flex flex-wrap items-baseline text-xs sm:text-sm">
            <Prompt />
            <Typewriter
              text="./initialize_profile.sh"
              speed={0.045}
              delay={0.4}
              onComplete={() => setStep(1)}
              className="text-ink"
            />
          </div>

          {/* Logs de boot */}
          {step >= 1 && (
            <motion.ul
              className="mt-4 space-y-1 text-[11px] text-muted sm:text-xs"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: BOOT_STEP_MS / 1000 } } }}
            >
              {bootLines.map((l) => (
                <motion.li
                  key={l.text}
                  variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
                  className="flex gap-2"
                >
                  <span className={l.tag === 'OK' ? 'text-phosphor' : 'text-amber'}>
                    [{l.tag === 'OK' ? '  OK  ' : ' INFO '}]
                  </span>
                  <span className="min-w-0 truncate">{l.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {/* Título digitado */}
          <div className="mt-10 min-h-[7.5rem] sm:mt-12 sm:min-h-[9rem] lg:min-h-[10.5rem]">
            {step >= 2 && (
              <Typewriter
                as="h1"
                segments={titleSegments}
                speed={0.04}
                cursor={step >= 3 ? 'always' : 'active'}
                onComplete={() => setStep(3)}
                className="font-mono text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
              />
            )}
          </div>

          {/* Subtítulo + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-6"
            aria-hidden={step < 3}
          >
            <p className="max-w-3xl font-sans text-base leading-relaxed text-ink/80 sm:text-lg">
              <span className="font-mono text-phosphor">&gt; </span>
              Construindo pontes entre sistemas legados de engenharia, automação industrial e agentes de IA.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#deployments"
                tabIndex={step >= 3 ? 0 : -1}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-phosphor px-5 py-3 font-mono text-sm font-bold text-black shadow-[0_0_24px_-4px_rgba(57,255,136,0.6)] transition hover:bg-phosphor/90 hover:shadow-[0_0_32px_-2px_rgba(57,255,136,0.8)]"
              >
                <Rocket size={16} /> ./ver_deployments
              </a>
              <a
                href={links.cv}
                download
                tabIndex={step >= 3 ? 0 : -1}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-line-bright px-5 py-3 font-mono text-sm text-ink transition hover:border-phosphor hover:text-phosphor"
              >
                <Download size={16} /> download cv.pdf
              </a>
            </div>
          </motion.div>
        </TerminalWindow>

        <motion.a
          href="#system"
          initial={{ opacity: 0 }}
          animate={step >= 3 ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-8 flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted hover:text-phosphor"
          aria-label="Rolar para System Info"
        >
          <ArrowDown size={14} className="animate-bounce" /> scroll
        </motion.a>
      </div>
    </section>
  )
}
