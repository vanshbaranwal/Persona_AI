import { useEffect, useRef, useState } from 'react'
import PersonaAvatar from './PersonaAvatar.jsx'
import { personas } from '../data/personas.js'

export default function PersonaDropdown({ activeId, onSelect }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = personas.find((p) => p.id === activeId)

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div className="persona-dropdown" ref={ref}>
      <button className="persona-trigger" onClick={() => setOpen((o) => !o)}>
        <PersonaAvatar persona={active} size={28} />
        <span className="persona-trigger-text">
          <span className="persona-trigger-name">{active.name}</span>
          <span className="persona-trigger-sub">{active.subtitle}</span>
        </span>
        <svg className={`chevron ${open ? 'chevron-open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="persona-menu">
          {personas.map((p) => (
            <button
              key={p.id}
              className={`persona-option ${p.id === activeId ? 'persona-option-active' : ''}`}
              onClick={() => {
                onSelect(p.id)
                setOpen(false)
              }}
            >
              <PersonaAvatar persona={p} size={28} />
              <span className="persona-trigger-text">
                <span className="persona-trigger-name">{p.name}</span>
                <span className="persona-trigger-sub">{p.subtitle}</span>
              </span>
              {p.id === activeId && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="check">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
