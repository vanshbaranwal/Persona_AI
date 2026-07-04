# Persona Chat — Frontend

A minimal, ChatGPT-style chat interface for talking to two personas —
**Hitesh Choudhary** and **Piyush Garg** — with a dropdown to switch between
them and a light/dark theme toggle.

This repo contains **only the frontend**. It is not wired up to a real LLM
yet — see "Connecting a backend" below.

## Stack

- React 18
- Vite
- Plain CSS (CSS variables for theming, no UI framework)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  data/personas.js         # persona metadata: name, tagline, suggestions
  components/
    Sidebar.jsx             # left rail: brand + "New chat"
    PersonaDropdown.jsx      # header dropdown to switch persona
    ThemeToggle.jsx          # Light / Dark toggle
    PersonaAvatar.jsx        # initials avatar
    ChatWindow.jsx           # welcome screen, messages, composer
  App.jsx                   # app state: active persona, per-persona messages, theme
  index.css                 # all styling + light/dark variables
```

## Connecting a backend

All the chat logic lives in `handleSend` inside `src/App.jsx`. Right now it
just pushes the user's message and echoes a placeholder reply after a short
delay. Replace the placeholder `setTimeout` block with a real call, e.g.:

```js
const res = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ persona: activeId, message: text, history: messages }),
})
const data = await res.json()
// then push { id: nextId(), role: 'assistant', content: data.reply }
```

Each persona's conversation is stored separately in `conversations` state, so
switching personas never mixes up chat history.

## Persona data

Persona display data (name, subtitle, greeting, suggested prompts) lives in
`src/data/personas.js`. Add fields there (e.g. a `systemPrompt`) as needed
once you wire up the LLM backend and prompt engineering.
