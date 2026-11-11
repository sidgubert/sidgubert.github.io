import { HOST, USER } from '../data/profile'

/** Prompt do shell: sidnelson_gubert@server:~$ */
export default function Prompt({ path = '~', className = '' }) {
  return (
    <span className={`whitespace-nowrap select-none ${className}`}>
      <span className="text-phosphor text-glow">
        {USER}@{HOST}
      </span>
      <span className="text-muted">:</span>
      <span className="text-cyan">{path}</span>
      <span className="text-muted">$&nbsp;</span>
    </span>
  )
}

