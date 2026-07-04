import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import PersonaDropdown from './components/PersonaDropdown.jsx'
import ThemeDropdown from './components/ThemeDropdown.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import { personas, getPersona } from './data/personas.js'

let idCounter = 0
const nextId = () => (idCounter += 1)

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [activeId, setActiveId] = useState(personas[0].id)
  // messages are kept per-persona so switching personas preserves each chat
  const [conversations, setConversations] = useState({
    hitesh: [],
    piyush: [],
  })

  const persona = getPersona(activeId)
  const messages = conversations[activeId]

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleSend = (text) => {
    const userMessage = { id: nextId(), role: 'user', content: text }

    setConversations((prev) => ({
      ...prev,
      [activeId]: [...prev[activeId], userMessage],
    }))

    // Placeholder reply — swap this out for a real LLM API call.
    // e.g. call your backend with { persona: activeId, message: text }
    // and stream/return the model's response here.
    setTimeout(() => {
      const reply = {
        id: nextId(),
        role: 'assistant',
        content: `(${persona.name}'s response will appear here once the LLM backend is connected.)`,
      }
      setConversations((prev) => ({
        ...prev,
        [activeId]: [...prev[activeId], reply],
      }))
    }, 400)
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

        <ChatWindow persona={persona} messages={messages} onSend={handleSend} />
      </div>
    </div>
  )
}
