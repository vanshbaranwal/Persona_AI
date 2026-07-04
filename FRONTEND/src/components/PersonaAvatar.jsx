export default function PersonaAvatar({ persona, size = 36 }) {
  if (persona.avatar) {
    return (
      <img
        src={persona.avatar}
        alt={persona.name}
        className="avatar avatar-photo"
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: persona.accent,
      }}
    >
      {persona.initials}
    </div>
  )
}
