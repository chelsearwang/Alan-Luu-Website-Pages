'use client'

type Props = {
  isMusicMode: boolean
}

export default function EasterEgg({ isMusicMode }: Props) {
  return (
    <div
      className="easter-egg-card"
      style={{
        position: 'fixed',
        bottom: '5.5rem',
        right: '1.5rem',
        zIndex: 9999,
        maxWidth: '260px',
        padding: '1rem 1.25rem',
        borderRadius: '1rem',
        backgroundColor: isMusicMode ? 'var(--menu-bg-music)' : 'var(--menu-bg-content)',
        border: `1px solid ${isMusicMode ? 'var(--accent-music)55' : 'var(--accent-content)33'}`,
        color: isMusicMode ? 'var(--accent-music)' : 'var(--accent-content)',
        boxShadow: isMusicMode
          ? '0 12px 40px rgba(0,0,0,0.4), 0 0 24px rgba(56,189,248,0.2)'
          : '0 12px 32px rgba(0,0,0,0.15)',
        lineHeight: 1.5,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>you found me!</div>
      <div style={{ opacity: 0.75, fontSize: '0.8rem', color: isMusicMode ? 'var(--muted-music)' : 'var(--muted-content)' }}>
        made with ❤️ by chelsea
      </div>
    </div>
  )
}