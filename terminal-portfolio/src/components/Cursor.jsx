/** Cursor de bloco piscando, estilo monitor de fósforo. */
export default function Cursor({ className = '', color = 'bg-phosphor' }) {
  return (
    <span
      aria-hidden="true"
      className={`ml-0.5 inline-block h-[1.05em] w-[0.58em] translate-y-[0.16em] animate-blink shadow-[var(--shadow-cursor)] ${color} ${className}`}
    />
  )
}

