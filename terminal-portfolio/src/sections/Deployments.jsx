import { motion } from 'framer-motion'
import { Activity, ExternalLink, Github } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { deployments } from '../data/profile'

function DeploymentCard({ d, className = '' }) {
  const Icon = d.icon
  const max = Math.max(...d.activity)

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
      }}
      className={`glow-card group flex flex-col overflow-hidden rounded-md border border-line bg-term/90 ${className}`}
    >
      {/* Barra de título */}
      <div className="flex items-center gap-3 border-b border-line bg-term-2/80 px-4 py-2 font-mono text-[11px] text-muted">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-line-bright transition-colors group-hover:bg-[#ff5f57]/80" />
          <span className="size-2 rounded-full bg-line-bright transition-colors group-hover:bg-[#febc2e]/80" />
          <span className="size-2 rounded-full bg-line-bright transition-colors group-hover:bg-[#28c840]/80" />
        </div>
        <span className="truncate">systemctl status {d.service}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] text-phosphor">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-phosphor opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-phosphor" />
              </span>
              {d.status}
            </p>
            <h3 className="mt-2 font-mono text-xl font-bold text-ink transition-colors group-hover:text-phosphor group-hover:text-glow">
              {d.name}
            </h3>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-sm border border-line-bright bg-void text-phosphor-dim transition-colors group-hover:border-phosphor/60 group-hover:text-phosphor">
            <Icon size={20} />
          </span>
        </div>

        <p className="mt-3 font-sans text-sm leading-relaxed text-ink/75">{d.summary}</p>

        <ul className="mt-5 space-y-2 font-mono text-[13px]">
          {d.features.map((f) => (
            <li key={f} className="flex gap-2 text-ink/90">
              <span className="text-phosphor" aria-hidden="true">
                &gt;
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* Gráfico de atividade estilo painel de monitoramento */}
        <div className="mt-6" aria-hidden="true">
          <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
            <span className="flex items-center gap-1.5">
              <Activity size={11} /> activity
            </span>
            <span>pid {d.pid}</span>
          </div>
          <div className="flex h-10 items-end gap-[3px] border-b border-line">
            {d.activity.map((v, i) => (
              <span
                key={i}
                style={{ height: `${(v / max) * 100}%` }}
                className="flex-1 bg-phosphor-dim/40 transition-colors duration-300 group-hover:bg-phosphor/70"
              />
            ))}
          </div>
        </div>

        {d.repo && (
          <a
            href={d.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit max-w-full items-center gap-2 rounded-sm border border-line-bright px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-phosphor hover:text-phosphor"
          >
            <Github size={14} className="shrink-0" />
            <span className="truncate">{d.repo.replace('https://github.com/', '')}</span>
            <ExternalLink size={12} className="shrink-0 text-muted" />
          </a>
        )}

        <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Tecnologias">
          {d.tags.map((t) => (
            <li
              key={t}
              className="rounded-sm border border-line px-2 py-0.5 font-mono text-[11px] text-muted transition-colors group-hover:border-phosphor/30 group-hover:text-ink"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export default function Deployments() {
  return (
    <section id="deployments" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          label="featured_projects"
          title="Deployments"
          command="systemctl list-units --type=service --state=running"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {deployments.map((d, i) => (
            <DeploymentCard
              key={d.service}
              d={d}
              className={i === deployments.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

