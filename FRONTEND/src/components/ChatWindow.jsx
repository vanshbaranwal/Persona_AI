import { useEffect, useRef, useState } from 'react'
import PersonaAvatar from './PersonaAvatar.jsx'

export default function ChatWindow({ persona, messages, onSend }) {
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const submit = () => {
    const text = input.trim()
    if (!text) return
    onSend(text)
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div className="chat-window">
      <div className="chat-scroll" ref={scrollRef}>
        {isEmpty ? (
          <div className="welcome">
            <PersonaAvatar persona={persona} size={72} />
            <h1 className="welcome-name">{persona.name}</h1>
            <p className="welcome-sub">{persona.subtitle}</p>
            <p className="welcome-greeting">{persona.greeting}</p>

            <div className="suggestions">
              {persona.suggestions.map((s) => (
                <button key={s} className="suggestion-chip" onClick={() => onSend(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map((m) => (
              <div key={m.id} className={`message-row ${m.role === 'user' ? 'row-user' : 'row-assistant'}`}>
                {m.role === 'assistant' && <PersonaAvatar persona={persona} size={28} />}
                <div className={`bubble ${m.role === 'user' ? 'bubble-user' : 'bubble-assistant'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="composer">
        <div className="composer-box">
          <textarea
            placeholder={`Message ${persona.name.split(' ')[0]}…`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
          />
          <button className="send-btn" onClick={submit} aria-label="Send message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p className="composer-note">AI persona for educational/demo purposes and may be inaccurate.</p>
      </div>
    </div>
  )
}
