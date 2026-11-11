import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import TerminalWindow from '../components/TerminalWindow'
import { HOST, USER, systemInfo } from '../data/profile'

const ascii = String.raw`
 ███████╗ ██████╗
 ██╔════╝██╔════╝
 ███████╗██║  ███╗
 ╚════██║██║   ██║
 ███████║╚██████╔╝
 ╚══════╝ ╚═════╝ `

const palette = ['bg-[#0a0e0c]', 'bg-[#ff5f57]', 'bg-phosphor', 'bg-amber', 'bg-cyan', 'bg-[#c792ea]', 'bg-ink']

export default function SystemInfo() {
  return (
    <section id="system" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="01" label="system_info" title="System Info" command="neofetch" />

        <TerminalWindow title={`${USER}@${HOST}: ~ — neofetch`}>
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
            <pre
              aria-hidden="true"
              className="text-glow overflow-hidden text-[10px] leading-tight text-phosphor sm:text-xs lg:text-sm"
            >
              {ascii}
            </pre>

            <motion.dl
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              className="text-xs sm:text-sm"
            >
              <motion.div variants={item} className="mb-1">
                <span className="font-bold text-phosphor">{USER}</span>
                <span className="text-muted">@</span>
                <span className="font-bold text-phosphor">{HOST}</span>
              </motion.div>
              <motion.div variants={item} className="mb-3 text-muted" aria-hidden="true">
                {'-'.repeat(USER.length + HOST.length + 1)}
              </motion.div>

              {systemInfo.map((row) => (
                <motion.div
                  key={row.key}
                  variants={item}
                  className="grid grid-cols-[6.5rem_1fr] gap-x-2 py-0.5 sm:grid-cols-[7.5rem_1fr]"
                >
                  <dt className="font-bold text-amber">{row.key}:</dt>
                  <dd className="text-ink">{row.value}</dd>
                </motion.div>
              ))}

              <motion.div variants={item} className="mt-4 flex gap-0" aria-hidden="true">
                {palette.map((c) => (
                  <span key={c} className={`h-4 w-6 sm:w-8 ${c}`} />
                ))}
              </motion.div>
            </motion.dl>
          </div>

          <div className="mt-8 border-t border-dashed border-line pt-6">
            <p className="mb-3 text-xs text-muted"># README.md</p>
            <p className="max-w-3xl font-sans text-[15px] leading-relaxed text-ink/85 sm:text-base">
              Engenheiro de software com trajetória forjada no chão de fábrica.{' '}
              <strong className="font-semibold text-ink">
                Mestrando em Engenharia de Sistemas e Produtos pelo IFBA
              </strong>
              , com foco em sistemas computacionais, controle e desenvolvimento de produtos. Atuo de forma
              híbrida entre a <span className="text-amber">Gestão de Manutenção de alto nível</span> — onde
              confiabilidade, disponibilidade e custo são métricas diárias — e a{' '}
              <span className="text-phosphor">Engenharia de Software</span>, levando o rigor da indústria
              para arquiteturas de software e agentes de IA.
            </p>
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}

const item = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
}

