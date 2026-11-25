import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Check,
  Cloud,
  Copy,
  Download,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
  X,
} from 'lucide-react'
import TerminalWindow from '../components/TerminalWindow'
import Prompt from '../components/Prompt'
import Cursor from '../components/Cursor'
import { links } from '../data/profile'

const socials = [
  { label: 'GitHub', handle: '@sidgubert', href: links.github, icon: Github },
  { label: 'LinkedIn', handle: 'sidnelson-gubert', href: links.linkedin, icon: Linkedin },
  { label: 'WhatsApp', handle: '+55 77 98827-8689', href: links.whatsapp, icon: MessageCircle },
  { label: 'Instagram', handle: '@sidgubert', href: links.instagram, icon: Instagram },
  { label: 'E-mail', handle: links.email, isEmail: true, icon: Mail },
  { label: 'Trailhead', handle: 'Ranger', href: links.trailhead, icon: Cloud },
]

export default function Footer() {
  const [composerOpen, setComposerOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('Contato pelo portfólio')
  const [message, setMessage] = useState('')
  const [statusMsg, setStatusMsg] = useState('')

  async function copyEmail(e) {
    e?.stopPropagation()
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      setStatusMsg(`[OK] ${links.email} copiado para a área de transferência.`)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setStatusMsg(`Endereço: ${links.email}`)
    }
  }

  function buildMailParams() {
    const finalSubject = name.trim()
      ? `${subject.trim() || 'Contato pelo portfólio'} — ${name.trim()}`
      : subject.trim() || 'Contato pelo portfólio'
    const finalBody = message.trim()
      ? name.trim()
        ? `${message.trim()}\n\n— ${name.trim()}`
        : message.trim()
      : ''
    return {
      su: encodeURIComponent(finalSubject),
      body: encodeURIComponent(finalBody),
    }
  }

  function getGmailUrl() {
    const { su, body } = buildMailParams()
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(links.email)}&su=${su}&body=${body}`
  }

  function getMailtoUrl() {
    const { su, body } = buildMailParams()
    return `mailto:${links.email}?subject=${su}&body=${body}`
  }

  return (
    <footer id="contact" className="px-4 pb-10 pt-20 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-phosphor-dim">// 05 — end_of_line</p>
        <h2 className="mt-2 font-mono text-2xl font-bold text-ink sm:text-4xl">
          Contact<span className="text-phosphor text-glow">_</span>
        </h2>
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-ink/75">
          Aberto a colaborações em engenharia de software, IA aplicada e automação industrial. Vamos conectar
          o legado ao futuro.
        </p>

        <TerminalWindow title="session — end_of_line" className="mt-8">
          <div className="flex flex-wrap items-baseline text-xs sm:text-sm">
            <Prompt />
            <span className="text-ink">ls ~/links</span>
          </div>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {socials.map(({ label, handle, href, isEmail, icon: Icon }) => (
              <li key={label}>
                {isEmail ? (
                  <div
                    className={`glow-card group flex items-center gap-3 rounded-sm border bg-void/60 p-3 transition-colors ${
                      composerOpen ? 'border-phosphor' : 'border-line'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setComposerOpen((v) => !v)
                        setStatusMsg('')
                      }}
                      aria-expanded={composerOpen}
                      aria-controls="email-composer"
                      className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
                    >
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-sm border transition-colors ${
                          composerOpen
                            ? 'border-phosphor text-phosphor'
                            : 'border-line-bright text-muted group-hover:border-phosphor group-hover:text-phosphor'
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 text-sm font-bold text-ink group-hover:text-phosphor">
                          {label}
                          <span className="text-[10px] font-normal text-phosphor-dim">
                            {composerOpen ? '[aberto]' : '[escrever]'}
                          </span>
                        </span>
                        <span className="block truncate text-[11px] text-muted">{handle}</span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={copyEmail}
                      title="Copiar endereço de e-mail"
                      aria-label="Copiar endereço de e-mail"
                      className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-sm border border-line text-muted transition-colors hover:border-phosphor hover:text-phosphor"
                    >
                      {copied ? <Check size={14} className="text-phosphor" /> : <Copy size={14} />}
                    </button>
                  </div>
                ) : (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-card group flex items-center gap-3 rounded-sm border border-line bg-void/60 p-3"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-sm border border-line-bright text-muted transition-colors group-hover:border-phosphor group-hover:text-phosphor">
                      <Icon size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-ink group-hover:text-phosphor">{label}</span>
                      <span className="block truncate text-[11px] text-muted">{handle}</span>
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          {copied && !composerOpen && (
            <p role="status" className="mt-3 text-xs text-phosphor">
              ✓ {links.email} copiado para a área de transferência.
            </p>
          )}

          {/* Terminal de envio de e-mail (funciona via Gmail Web, App nativo ou cópia direta) */}
          <AnimatePresence initial={false}>
            {composerOpen && (
              <motion.div
                id="email-composer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-5 rounded-sm border border-line-bright bg-void/75 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                    <div className="flex flex-wrap items-baseline text-xs sm:text-sm">
                      <Prompt />
                      <span className="text-ink">mail -s &quot;{subject || 'Contato'}&quot; </span>
                      <span className="text-cyan">{links.email}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setComposerOpen(false)}
                      aria-label="Fechar painel de e-mail"
                      className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-sm border border-line text-muted transition-colors hover:border-phosphor hover:text-phosphor"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className="block text-xs">
                      <span className="text-amber">from_name:</span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome"
                        className="mt-1 w-full rounded-sm border border-line bg-term px-3 py-2 font-mono text-xs text-ink placeholder:text-muted/60 focus:border-phosphor focus:outline-none"
                      />
                    </label>
                    <label className="block text-xs">
                      <span className="text-amber">subject:</span>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Assunto"
                        className="mt-1 w-full rounded-sm border border-line bg-term px-3 py-2 font-mono text-xs text-ink placeholder:text-muted/60 focus:border-phosphor focus:outline-none"
                      />
                    </label>
                  </div>

                  <label className="mt-3 block text-xs">
                    <span className="text-amber">body:</span>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Escreva sua mensagem (opcional — ou envie/copie direto abaixo)..."
                      className="mt-1 w-full resize-y rounded-sm border border-line bg-term p-3 font-sans text-sm text-ink placeholder:text-muted/60 focus:border-phosphor focus:outline-none"
                    />
                  </label>

                  <div className="mt-4 flex flex-wrap items-center gap-2.5">
                    <a
                      href={getGmailUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setStatusMsg('[OK] Abrindo composição no Gmail Web em nova aba...')}
                      className="inline-flex items-center gap-2 rounded-sm bg-phosphor px-4 py-2 font-mono text-xs font-bold text-on-phosphor shadow-[var(--shadow-cta)] transition hover:bg-phosphor/90"
                    >
                      <Send size={13} /> Abrir no Gmail Web <ExternalLink size={12} />
                    </a>

                    <a
                      href={getMailtoUrl()}
                      onClick={() => setStatusMsg('[OK] Acionando aplicativo de e-mail padrão do sistema...')}
                      className="inline-flex items-center gap-2 rounded-sm border border-line-bright bg-term px-3.5 py-2 font-mono text-xs text-ink transition-colors hover:border-phosphor hover:text-phosphor"
                    >
                      <Mail size={13} /> App de E-mail (Outlook/Mail)
                    </a>

                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-line bg-term px-3.5 py-2 font-mono text-xs text-muted transition-colors hover:border-phosphor hover:text-phosphor"
                    >
                      {copied ? <Check size={13} className="text-phosphor" /> : <Copy size={13} />}
                      {copied ? 'Copiado!' : `Copiar ${links.email}`}
                    </button>
                  </div>

                  {statusMsg && (
                    <p role="status" className="mt-3 text-xs text-phosphor">
                      {statusMsg}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={links.cv}
            download
            className="mt-5 inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-phosphor sm:text-sm"
          >
            <Download size={14} /> wget ./CV_Sidnelson_Gubert.pdf
          </a>

          <p className="mt-6 text-xs text-muted">Connection established. Aguardando novo input...</p>
          <div className="mt-2 flex items-baseline text-xs sm:text-sm">
            <Prompt />
            <Cursor />
          </div>
        </TerminalWindow>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 font-mono text-[11px] text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Sidnelson Gubert</span>
          <span>built with react · tailwind · framer-motion — [process exited with code 0]</span>
        </div>
      </div>
    </footer>
  )
}
