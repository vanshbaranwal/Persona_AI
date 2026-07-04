import { useEffect, useRef, useState } from 'react'

const OPTIONS = [
  {
    id: 'light',
    label: 'Light',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'dark',
    label: 'Dark',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export default function ThemeDropdown({ theme, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = OPTIONS.find((o) => o.id === theme) ?? OPTIONS[0]

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div className="theme-dropdown" ref={ref}>
      <button className="theme-trigger" onClick={() => setOpen((o) => !o)}>
        {active.icon}
        <span>{active.label}</span>
        <svg className={`chevron ${open ? 'chevron-open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="theme-menu">
          {OPTIONS.map((o) => (
            <button
              key={o.id}
              className={`theme-option ${o.id === theme ? 'theme-option-active' : ''}`}
              onClick={() => {
                onChange(o.id)
                setOpen(false)
              }}
            >
              {o.icon}
              <span>{o.label}</span>
              {o.id === theme && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="check">
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
