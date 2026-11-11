import { motion } from 'framer-motion'
import { Folder, FolderOpen, Star } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { techStack } from '../data/profile'

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

function PrimaryDir({ dir }) {
  const Icon = dir.icon
  return (
    <motion.article
      variants={reveal}
      className="glow-card glow-card-amber relative overflow-hidden rounded-md border border-amber/40 bg-gradient-to-br from-amber/[0.07] via-term to-term p-5 font-mono sm:p-7 md:col-span-2 lg:col-span-3"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-amber/10 blur-3xl" />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-sm border border-amber/50 bg-amber/10 text-amber">
            <Icon size={20} />
          </span>
          <div>
            <p className="text-[11px] text-muted">drwxr-xr-x · root</p>
            <h3 className="text-glow-amber text-lg font-bold text-amber sm:text-xl">{dir.dir}/</h3>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-sm border border-amber/50 bg-amber/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-amber">
          <Star size={12} className="fill-amber" /> primary_focus
        </span>
      </div>

      <ul className="relative mt-6 grid gap-4 md:grid-cols-3">
        {dir.items.map((it) => (
          <li
            key={it.name}
            className="rounded-sm border border-line bg-void/60 p-4 transition-colors hover:border-amber/50"
          >
            <p className="text-sm font-bold text-ink">
              <span className="text-amber">▸ </span>
              {it.name}
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{it.desc}</p>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

function Dir({ dir, className = '' }) {
  const Icon = dir.icon
  return (
    <motion.article
      variants={reveal}
      className={`glow-card group rounded-md border border-line bg-term/90 p-5 font-mono sm:p-6 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-phosphor-dim transition-colors group-hover:text-phosphor">
            <Folder size={18} className="group-hover:hidden" />
            <FolderOpen size={18} className="hidden group-hover:block" />
          </span>
          <h3 className="text-base font-bold text-ink">{dir.dir}/</h3>
        </div>
        <Icon size={16} className="text-muted" aria-hidden="true" />
      </div>
      <p className="mt-1 text-[11px] text-muted">
        drwxr-xr-x · {dir.label}
      </p>

      <ul className="mt-5 space-y-1.5 text-sm">
        {dir.items.map((name, i) => (
          <li key={name} className="flex gap-2 text-ink/90 transition-colors hover:text-phosphor">
            <span className="select-none text-line-bright" aria-hidden="true">
              {i === dir.items.length - 1 ? '└──' : '├──'}
            </span>
            {name}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function TechStack() {
  const [primary, ...rest] = techStack

  return (
    <section id="stack" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="02" label="skills_directory" title="Tech_Stack" command="ls -la ~/tech_stack/" />

        <p className="-mt-4 mb-6 font-mono text-xs text-muted">total {techStack.length}</p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <PrimaryDir dir={primary} />
          {rest.map((d, i) => (
            <Dir key={d.dir} dir={d} className={i === rest.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

