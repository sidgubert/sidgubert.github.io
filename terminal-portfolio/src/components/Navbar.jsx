import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Terminal, X } from 'lucide-react'

const navLinks = [
  { href: '#system', label: 'system_info' },
  { href: '#stack', label: 'tech_stack' },
  { href: '#deployments', label: 'deployments' },
  { href: '#config', label: 'user_config' },
  { href: '#contact', label: 'contact' },
]

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10_000)
    return () => clearInterval(id)
  }, [])
  const date = now.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const time = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return { date, time }
}

/** Barra superior no estilo status-bar do tmux. */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { date, time } = useClock()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-void/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 font-mono text-xs sm:px-6">
        <a href="#top" className="group flex items-center gap-2 text-ink" aria-label="Voltar ao início">
          <span className="grid size-7 place-items-center rounded-sm border border-line-bright bg-term text-phosphor transition-colors group-hover:border-phosphor">
            <Terminal size={14} />
          </span>
          <span className="hidden sm:inline">
            <span className="text-phosphor">[0]</span> ~/sidnelson
          </span>
          <span className="sm:hidden text-phosphor">~/sg</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-sm px-2.5 py-1.5 text-muted transition-colors hover:bg-phosphor/10 hover:text-phosphor"
              >
                ./{l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 text-muted md:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-phosphor" />
            online · {date} · {time}
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-sm border border-line text-ink md:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line bg-void/95 font-mono text-sm md:hidden"
          >
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-ink hover:bg-phosphor/10 hover:text-phosphor"
                >
                  <span className="text-muted">{String(i + 1).padStart(2, '0')}</span>./{l.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2 border-t border-line/60 px-5 py-3 text-xs text-muted">
              <span className="size-1.5 animate-pulse rounded-full bg-phosphor" />
              online · {date} · {time}
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

