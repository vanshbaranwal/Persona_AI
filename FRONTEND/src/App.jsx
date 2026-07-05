import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import PersonaDropdown from './components/PersonaDropdown.jsx'
import ThemeDropdown from './components/ThemeDropdown.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import { personas, getPersona } from './data/personas.js'

let idCounter = 0
const nextId = () => (idCounter += 1)

const API_URL = 'https://persona-ai-fxev.onrender.com'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [activeId, setActiveId] = useState(personas[0].id)
  // messages are kept per-persona so switching personas preserves each chat
  const [conversations, setConversations] = useState({
    hitesh: [],
    piyush: [],
  })
  const [isSending, setIsSending] = useState(false)

  const persona = getPersona(activeId)
  const messages = conversations[activeId]

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleSend = async (text) => {
    const userMessage = { id: nextId(), role: 'user', content: text }

    // capture the persona this message belongs to, and the history
    // *before* this new message was added (server appends it itself)
    const targetPersona = activeId
    const historyForRequest = conversations[targetPersona].map((m) => ({
      role: m.role,
      content: m.content,
    }))

    setConversations((prev) => ({
      ...prev,
      [targetPersona]: [...prev[targetPersona], userMessage],
    }))

    setIsSending(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: targetPersona,
          message: text,
          history: historyForRequest,
        }),
      })

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}))
        throw new Error(errBody.error || `Request failed (${res.status})`)
      }

      const data = await res.json()

      const reply = { id: nextId(), role: 'assistant', content: data.reply }
      setConversations((prev) => ({
        ...prev,
        [targetPersona]: [...prev[targetPersona], reply],
      }))
    } catch (err) {
      console.error('Chat request failed:', err)
      const errorReply = {
        id: nextId(),
        role: 'assistant',
        content: 'Something went wrong reaching the server. Is the backend running on port 3000?',
      }
      setConversations((prev) => ({
        ...prev,
        [targetPersona]: [...prev[targetPersona], errorReply],
      }))
    } finally {
      setIsSending(false)
    }
  }

  const handleNewChat = () => {
    setConversations((prev) => ({ ...prev, [activeId]: [] }))
  }

  return (
    <div className="app">
      <Sidebar onNewChat={handleNewChat} />

      <div className="main">
        <header className="header">
          <PersonaDropdown activeId={activeId} onSelect={setActiveId} />
          <ThemeDropdown theme={theme} onChange={setTheme} />
        </header>

        <ChatWindow
          persona={persona}
          messages={messages}
          onSend={handleSend}
          isSending={isSending}
        />
      </div>
    </div>
  )
}