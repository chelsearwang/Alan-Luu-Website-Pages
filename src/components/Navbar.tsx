'use client'

import { useState } from 'react'

type Section = 'about' | 'works' | 'links'

type Props = {
  isMusicMode: boolean
  onToggle: () => void
  activeSection: Section
  onSectionChange: (section: Section) => void
  isMobile: boolean
}

export default function Navbar({ isMusicMode, onToggle, activeSection, onSectionChange, isMobile }: Props) {
  const accent = isMusicMode ? 'var(--accent-music)' : 'var(--accent-content)'
  const onAccent = isMusicMode ? 'var(--on-accent-music)' : 'var(--on-accent-content)'
  const panel = isMusicMode ? 'var(--panel-music)' : 'var(--panel-content)'
  const muted = isMusicMode ? 'var(--muted-music)' : 'var(--muted-content)'

  const [toggleHovered, setToggleHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuRendered, setMenuRendered] = useState(false)
  const [closing, setClosing] = useState(false)

  const menuBg = isMusicMode ? 'var(--menu-bg-music)' : 'var(--menu-bg-content)'

  function openMenu() {
    setMenuRendered(true)
    setClosing(false)
    requestAnimationFrame(() => setMenuOpen(true))
  }

  function closeMenu() {
    setMenuOpen(false)
    setClosing(true)
    setTimeout(() => {
      setMenuRendered(false)
      setClosing(false)
    }, 220)
  }

  if (isMobile) {
    return (
      <>
        {menuRendered && (
          <>
            <div
              className={closing ? 'backdrop-fade-exit' : 'backdrop-fade-enter'}
              style={{ position: 'fixed', inset: 0, zIndex: 40, backgroundColor: 'rgba(0,0,0,0.45)' }}
              onClick={closeMenu}
            />
            <div
              className={`fixed bottom-20 left-4 right-4 z-50 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl ${
                closing ? 'menu-pop-exit' : 'menu-pop-enter'
              }`}
              style={{
                background: menuBg,
                border: `1px solid ${accent}55`,
                boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${accent}22`,
              }}
            >
              {[
                { label: 'About', section: 'about' as Section },
                { label: 'Works', section: 'works' as Section },
                { label: 'Links', section: 'links' as Section },
              ].map((item, i) => (
                <div
                  key={item.section}
                  className="menu-item-fade"
                  style={{ animationDelay: closing ? '0ms' : `${i * 60}ms` }}
                >
                  <MobileNavButton
                    label={item.label}
                    active={activeSection === item.section}
                    muted={muted}
                    accent={accent}
                    onAccent={onAccent}
                    onClick={() => { onSectionChange(item.section); closeMenu() }}
                  />
                </div>
              ))}
              <div className="menu-item-fade" style={{ animationDelay: closing ? '0ms' : '180ms' }}>
                <a
                  href="mailto:luua103232@gmail.com"
                  onClick={closeMenu}
                  className="bubble-pill h-12 px-5 rounded-xl text-sm font-medium tracking-wide flex items-center justify-center text-center w-full"
                  style={{
                    border: `1px solid ${accent}`,
                    color: accent,
                    backgroundColor: isMusicMode ? 'rgba(56,189,248,0.08)' : 'rgba(37,99,235,0.05)',
                  }}
                >
                  luua103232@gmail.com
                </a>
              </div>
            </div>
          </>
        )}

        {/* Mobile bar */}
        <nav
          className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-between px-5 z-30"
          style={{
            background: panel,
            borderTop: `1px solid ${muted}44`,
            transition: 'background-color 0.8s ease 400ms, border-color 0.8s ease 400ms',
          }}
        >
          <button
            onClick={onToggle}
            className="toggle-btn h-10 px-4 rounded-full font-bold text-xs tracking-widest"
            style={{ backgroundColor: accent, color: onAccent }}
          >
            {isMusicMode ? 'MUSIC' : 'CONTENT'}
          </button>

          <button
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: menuOpen ? accent : 'transparent',
              color: menuOpen ? onAccent : muted,
              border: `1px solid ${menuOpen ? accent : muted}`,
            }}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </nav>
      </>
    )
  }

  return (
    <nav
      className="absolute bottom-0 left-0 right-0 h-24 flex items-center px-10 gap-10"
      style={{
        background: panel,
        borderTop: `1px solid ${muted}44`,
        transition: 'background-color 0.8s ease 400ms, border-color 0.8s ease 400ms',
      }}
    >
      <button
        onClick={onToggle}
        onMouseEnter={() => setToggleHovered(true)}
        onMouseLeave={() => setToggleHovered(false)}
        className="toggle-btn w-20 h-20 rounded-full font-bold text-xs tracking-widest shrink-0 transition-transform duration-200"
        style={{
          backgroundColor: accent,
          color: onAccent,
          transform: toggleHovered ? 'scale(1.06)' : 'scale(1)',
          boxShadow: toggleHovered ? `0 6px 20px ${isMusicMode ? 'rgba(56,189,248,0.4)' : 'rgba(37,99,235,0.35)'}` : 'none',
        }}
      >
        {isMusicMode ? 'MUSIC' : 'CONTENT'}
      </button>

      <div className="flex items-center gap-9">
        <NavButton
          label="About"
          active={activeSection === 'about'}
          muted={muted}
          accent={accent}
          isMusicMode={isMusicMode}
          onClick={() => onSectionChange('about')}
        />
        <NavButton
          label="Works"
          active={activeSection === 'works'}
          muted={muted}
          accent={accent}
          isMusicMode={isMusicMode}
          onClick={() => onSectionChange('works')}
        />
        <NavButton
          label="Links"
          active={activeSection === 'links'}
          muted={muted}
          accent={accent}
          isMusicMode={isMusicMode}
          onClick={() => onSectionChange('links')}
        />
      </div>

      <a
        href="mailto:luua103232@gmail.com"
        className="bubble-pill h-12 px-5 rounded-full text-base font-medium tracking-wide transition-all duration-300 flex items-center ml-auto whitespace-nowrap"
        style={{
          border: `1px solid ${accent}77`,
          color: accent,
          backgroundColor: isMusicMode ? 'rgba(56,189,248,0.1)' : 'rgba(37,99,235,0.06)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = isMusicMode
            ? '0 6px 20px rgba(56,189,248,0.3)'
            : '0 6px 16px rgba(37,99,235,0.22)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        luua103232@gmail.com
      </a>
    </nav>
  )
}

function NavButton({ label, active, muted, accent, isMusicMode, onClick }: {
  label: string
  active: boolean
  muted: string
  accent: string
  isMusicMode: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const softAccent = isMusicMode ? 'var(--accent-music-soft)' : 'var(--accent-content-soft)'

  const color = active ? accent : (hovered ? softAccent : muted)
  const borderColor = active ? accent : (hovered ? softAccent : 'transparent')

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="nav-tab text-sm"
      style={{
        color,
        borderBottomColor: borderColor,
        textShadow: active && isMusicMode ? '0 0 12px rgba(56,189,248,0.5)' : 'none',
      }}
    >
      {label}
    </button>
  )
}

function MobileNavButton({ label, active, muted, accent, onAccent, onClick }: {
  label: string
  active: boolean
  muted: string
  accent: string
  onAccent: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="nav-tab-mobile h-12 px-5 rounded-xl text-base font-bold tracking-wide text-left w-full"
      style={{
        border: `1px solid ${active ? accent : muted}`,
        color: active ? onAccent : muted,
        backgroundColor: active ? accent : 'transparent',
      }}
    >
      {label}
    </button>
  )
}