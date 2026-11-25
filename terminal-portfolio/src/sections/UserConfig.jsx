import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, Minus } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Prompt from '../components/Prompt'
import Typewriter from '../components/Typewriter'
import { useTheme } from '../context/ThemeContext'
import { links, personalInterests } from '../data/profile'

/** Renderiza o JSON com syntax highlight. */
function JsonOutput({ data }) {
  const entries = Object.entries(data)
  return (
    <pre className="overflow-x-auto whitespace-pre text-[13px] leading-relaxed sm:text-sm">
      <span className="text-muted">{'{'}</span>
      {'\n'}
      {entries.map(([key, values], i) => (
        <span key={key}>
          {'  '}
          <span className="text-cyan">"{key}"</span>
          <span className="text-muted">: [</span>
          {values.map((v, j) => (
            <span key={v}>
              <span className="text-amber">"{v}"</span>
              {j < values.length - 1 && <span className="text-muted">, </span>}
            </span>
          ))}
          <span className="text-muted">]{i < entries.length - 1 ? ',' : ''}</span>
          {'\n'}
        </span>
      ))}
      <span className="text-muted">{'}'}</span>
    </pre>
  )
}

const HELP = [
  'comandos disponíveis:',
  '  help                       mostra esta ajuda',
  '  whoami                     quem é o dono deste servidor',
  '  ls                         lista arquivos',
  '  cat personal_interests.json',
  '  theme [light|dark|toggle]  alterna entre CRT escuro e Paper claro',
  '  date                       data e hora atual',
  '  sudo hire-me               ;)',
  '  clear                      limpa o terminal',
]

function runCommand(raw, { theme, setTheme, toggleTheme }) {
  const cmd = raw.trim()
  const [bin, ...args] = cmd.split(/\s+/)
  switch (bin) {
    case '':
      return []
    case 'help':
      return HELP.map((t) => ({ t }))
    case 'whoami':
      return [{ t: 'sidnelson_gubert — software engineer & ai systems developer' }]
    case 'ls':
      return [{ t: 'personal_interests.json   cv.pdf   .secrets', c: 'text-cyan' }]
    case 'cat':
      if (args[0] === 'personal_interests.json') return [{ json: true }]
      if (args[0] === '.secrets') return [{ t: 'cat: .secrets: Permission denied. Nice try \\m/', c: 'text-danger' }]
      if (args[0] === 'cv.pdf') return [{ t: 'binary file — use o botão "download cv.pdf" no topo.', c: 'text-muted' }]
      return [{ t: `cat: ${args[0] ?? ''}: No such file or directory`, c: 'text-danger' }]
    case 'theme': {
      const sub = args[0]?.toLowerCase()
      if (!sub) {
        return [
          {
            t: `tema atual: ${theme === 'light' ? 'light (paper terminal)' : 'dark (crt phosphor)'} — use 'theme light', 'theme dark' ou 'theme toggle'`,
            c: 'text-phosphor',
          },
        ]
      }
      if (sub === 'light' || sub === 'paper') {
        setTheme('light')
        return [{ t: '[OK] display_profile -> paper_terminal (light)', c: 'text-phosphor' }]
      }
      if (sub === 'dark' || sub === 'crt') {
        setTheme('dark')
        return [{ t: '[OK] display_profile -> crt_phosphor (dark)', c: 'text-phosphor' }]
      }
      if (sub === 'toggle') {
        toggleTheme()
        return [{ t: `[OK] display_profile -> ${theme === 'dark' ? 'paper_terminal (light)' : 'crt_phosphor (dark)'}`, c: 'text-phosphor' }]
      }
      return [{ t: `theme: opção inválida '${args[0]}' — use light, dark ou toggle`, c: 'text-danger' }]
    }
    case 'date':
      return [{ t: new Date().toString() }]
    case 'echo':
      return [{ t: args.join(' ') }]
    case 'sudo':
      if (args[0]?.startsWith('hire')) {
        return [
          { t: '[sudo] password for recruiter: ********', c: 'text-muted' },
          { t: `Access granted. E-mail copiado: ${links.email}`, c: 'text-phosphor' },
          { hireLinks: true },
        ]
      }
      return [{ t: 'recruiter is not in the sudoers file. This incident will be reported.', c: 'text-amber' }]
    case 'exit':
      return [{ t: 'logout? nunca. o servidor fica de pé 24/7.', c: 'text-amber' }]
    default:
      return [{ t: `bash: ${bin}: command not found — digite 'help'`, c: 'text-danger' }]
  }
}

export default function UserConfig() {
  const { theme, setTheme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [booted, setBooted] = useState(false)
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (booted) inputRef.current?.focus({ preventScroll: true })
  }, [booted])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history, booted])

  function submit(e) {
    e.preventDefault()
    const value = input
    setInput('')
    if (value.trim() === 'clear') {
      setHistory([])
      return
    }
    const out = runCommand(value, { theme, setTheme, toggleTheme })
    if (out.some((o) => o.hireLinks)) {
      navigator.clipboard?.writeText(links.email).catch(() => {})
    }
    setHistory((h) => [...h, { cmd: value, out }])
  }

  return (
    <section id="config" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeader index="04" label="easter_egg" title="User_Config" command="cat personal_interests.json" />

        <motion.div
          layout
          className={`overflow-hidden rounded-md border bg-term/90 transition-colors ${
            open ? 'border-line-bright' : 'border-line hover:border-phosphor/50'
          }`}
        >
          {/* Barra de título — funciona como botão minimizar/expandir */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="user-config-terminal"
            className="flex w-full items-center gap-3 border-b border-line bg-term-2/80 px-3 py-2.5 text-left font-mono text-[11px] text-muted"
          >
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#ff5f57]/70" />
              <span className="size-2.5 rounded-full bg-[#febc2e]/70" />
              <span className="size-2.5 rounded-full bg-[#28c840]/70" />
            </span>
            <span className="flex-1 truncate">
              ~/.config/user — {open ? 'interactive shell' : 'minimized · clique para expandir'}
            </span>
            <span className="flex items-center gap-1.5 text-phosphor">
              {open ? <Minus size={14} /> : <Maximize2 size={14} />}
              <span className="hidden sm:inline">{open ? 'minimize' : 'expand'}</span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="user-config-terminal"
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div
                  ref={bodyRef}
                  onClick={() => inputRef.current?.focus({ preventScroll: true })}
                  className="max-h-[28rem] overflow-y-auto p-4 font-mono text-xs sm:p-6 sm:text-sm"
                >
                  <div className="flex flex-wrap items-baseline">
                    <Prompt />
                    <Typewriter
                      text="cat personal_interests.json"
                      speed={0.04}
                      delay={0.25}
                      onComplete={() => setBooted(true)}
                      className="text-ink"
                    />
                  </div>

                  {booted && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
                      <JsonOutput data={personalInterests} />
                      <p className="mt-4 text-muted"># dica: digite 'help' para explorar este terminal.</p>
                    </motion.div>
                  )}

                  {history.map((h, i) => (
                    <div key={i} className="mt-3">
                      <div className="flex flex-wrap items-baseline">
                        <Prompt />
                        <span className="break-all text-ink">{h.cmd}</span>
                      </div>
                      {h.out.map((o, j) =>
                        o.json ? (
                          <div key={j} className="mt-1">
                            <JsonOutput data={personalInterests} />
                          </div>
                        ) : o.hireLinks ? (
                          <div key={j} className="mt-1.5 flex flex-wrap gap-3 text-xs">
                            <a
                              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(links.email)}&su=Oportunidade`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-cyan hover:text-phosphor"
                            >
                              [Abrir Gmail Web]
                            </a>
                            <a
                              href={links.whatsapp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-cyan hover:text-phosphor"
                            >
                              [Chamar no WhatsApp]
                            </a>
                            <a href={`mailto:${links.email}?subject=Oportunidade`} className="underline text-muted hover:text-phosphor">
                              [App de E-mail]
                            </a>
                          </div>
                        ) : (
                          <p key={j} className={`whitespace-pre-wrap break-words ${o.c ?? 'text-ink/80'}`}>
                            {o.t}
                          </p>
                        ),
                      )}
                    </div>
                  ))}

                  {booted && (
                    <form onSubmit={submit} className="mt-3 flex items-baseline">
                      <Prompt />
                      <label htmlFor="shell-input" className="sr-only">
                        Digite um comando
                      </label>
                      <input
                        id="shell-input"
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        className="min-w-0 flex-1 bg-transparent text-ink caret-phosphor outline-none focus-visible:outline-none"
                      />
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

