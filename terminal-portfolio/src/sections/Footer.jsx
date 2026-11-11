import { Cloud, Download, Github, Linkedin, Mail } from 'lucide-react'
import TerminalWindow from '../components/TerminalWindow'
import Prompt from '../components/Prompt'
import Cursor from '../components/Cursor'
import { links } from '../data/profile'

const socials = [
  { label: 'GitHub', handle: '@sidgubert', href: links.github, icon: Github },
  { label: 'LinkedIn', handle: 'sidnelson-gubert', href: links.linkedin, icon: Linkedin },
  { label: 'E-mail', handle: links.email, href: `mailto:${links.email}`, icon: Mail },
  { label: 'Trailhead', handle: 'Ranger', href: links.trailhead, icon: Cloud },
]

export default function Footer() {
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

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {socials.map(({ label, handle, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
              </li>
            ))}
          </ul>

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

