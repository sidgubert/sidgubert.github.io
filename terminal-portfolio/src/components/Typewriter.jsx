import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Cursor from './Cursor'

/**
 * Efeito de digitação (typewriter) com Framer Motion.
 * Inclui texto completo real em .sr-only para indexação imediata (SEO) e leitores de tela,
 * enquanto os caracteres visuais são revelados em sequência via staggerChildren.
 */
export default function Typewriter({
  text = '',
  segments,
  speed = 0.035,
  delay = 0,
  start = true,
  cursor = 'active',
  onComplete,
  className = '',
  as: Tag = 'span',
}) {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)
  const callback = useRef(onComplete)
  callback.current = onComplete

  const parts = useMemo(() => segments ?? [{ text, className: '' }], [segments, text])
  const chars = useMemo(
    () =>
      parts.flatMap((p, pi) =>
        Array.from(p.text).map((ch, ci) => ({ ch, cls: p.className, key: `${pi}-${ci}` })),
      ),
    [parts],
  )
  const fullText = parts.map((p) => p.text).join('')

  useEffect(() => {
    if (!start) return
    const total = reduce ? 0 : (delay + chars.length * speed) * 1000 + 80
    const timer = setTimeout(() => {
      setDone(true)
      callback.current?.()
    }, total)
    return () => clearTimeout(timer)
  }, [start, reduce, delay, speed, chars.length])

  const showCursor = cursor === 'always' || (cursor === 'active' && start && !done)

  return (
    <Tag className={className}>
      <span className="sr-only">{fullText}</span>
      {reduce ? (
        <span aria-hidden="true">
          {parts.map((p, i) => (
            <span key={i} className={p.className}>
              {p.text}
            </span>
          ))}
        </span>
      ) : (
        <motion.span
          aria-hidden="true"
          initial="hidden"
          animate={start ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { delayChildren: delay, staggerChildren: speed } },
          }}
        >
          {chars.map((c) => (
            <motion.span
              key={c.key}
              className={c.cls}
              variants={{
                hidden: { display: 'none' },
                visible: { display: 'inline', transition: { duration: 0 } },
              }}
            >
              {c.ch}
            </motion.span>
          ))}
        </motion.span>
      )}
      {showCursor && <Cursor />}
    </Tag>
  )
}
