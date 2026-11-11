/**
 * Janela de terminal com barra de título e bordas finas.
 */
export default function TerminalWindow({
  title,
  children,
  actions,
  className = '',
  bodyClassName = '',
  as: Tag = 'div',
}) {
  return (
    <Tag
      className={`relative overflow-hidden rounded-md border border-line bg-term/90 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-term-2/80 px-3 py-2">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="size-2.5 rounded-full bg-[#28c840]/70" />
        </div>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] tracking-wide text-muted">
          {title}
        </span>
        <div className="flex min-w-[42px] shrink-0 justify-end">{actions}</div>
      </div>
      <div className={`p-4 font-mono text-sm sm:p-6 ${bodyClassName}`}>{children}</div>
    </Tag>
  )
}

