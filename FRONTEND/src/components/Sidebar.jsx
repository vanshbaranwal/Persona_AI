export default function Sidebar({ onNewChat }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">Persona Chat</div>
      <button className="new-chat-btn" onClick={onNewChat}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        New chat
      </button>
    </aside>
  )
}
