'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import ContentPanel from '@/components/ContentPanel'
import ProfileHeader from '@/components/ProfileHeader'
import Avatar from '@/components/Avatar'
import AmbientBubbles from '@/components/AmbientBubbles'
import EasterEgg from '@/components/EasterEgg'
import { useIsMobileLayout } from '@/hooks/useIsMobileLayout'

type Section = 'about' | 'works' | 'links'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export default function Home() {
  const [isMusicMode, setIsMusicMode] = useState(false)
  const [activeSection, setActiveSection] = useState<Section>('about')
  const [easterEgg, setEasterEgg] = useState(false)
  const isMobile = useIsMobileLayout()
  const konamiSeq = useRef<string[]>([])

  // Konami code easter egg
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const next = [...konamiSeq.current, e.key].slice(-KONAMI.length)
      konamiSeq.current = next
      if (next.join(',') === KONAMI.join(',')) {
        triggerEasterEgg()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  function triggerEasterEgg() {
    setEasterEgg(true)
    setTimeout(() => setEasterEgg(false), 6000)
  }

  const bgStyle = {
    backgroundColor: isMusicMode ? 'var(--bg-music)' : 'var(--bg-content)',
    color: isMusicMode ? 'var(--text-music)' : 'var(--text-content)',
    transition: 'background-color 0.8s ease 400ms, color 0.8s ease 400ms',
  }

  if (isMobile) {
    return (
      <main
        className="relative w-screen min-h-screen overflow-x-hidden flex flex-col items-center gap-6 px-6 pt-10 pb-28"
        style={bgStyle}
      >
        {isMusicMode && <AmbientBubbles />}

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
          <ProfileHeader isMusicMode={isMusicMode} isMobile />
          <Avatar isMusicMode={isMusicMode} isMobile onEasterEgg={triggerEasterEgg} />
          <ContentPanel isMusicMode={isMusicMode} activeSection={activeSection} isMobile />
        </div>

        <Navbar
          isMusicMode={isMusicMode}
          onToggle={() => setIsMusicMode(prev => !prev)}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isMobile
        />

        {easterEgg && <EasterEgg isMusicMode={isMusicMode} />}
      </main>
    )
  }

  return (
    <main
      className="relative w-screen h-screen overflow-hidden"
      style={bgStyle}
    >
      {isMusicMode && <AmbientBubbles />}

      <div className="absolute top-0 left-0 w-[55%] h-[calc(100vh-96px)] p-12 flex flex-col gap-6 overflow-y-auto" style={{ zIndex: 1 }}>
        <ProfileHeader isMusicMode={isMusicMode} isMobile={false} />
        <ContentPanel isMusicMode={isMusicMode} activeSection={activeSection} isMobile={false} />
      </div>

      <Avatar isMusicMode={isMusicMode} isMobile={false} onEasterEgg={triggerEasterEgg} />

      <Navbar
        isMusicMode={isMusicMode}
        onToggle={() => setIsMusicMode(prev => !prev)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isMobile={false}
      />

      {easterEgg && <EasterEgg isMusicMode={isMusicMode} />}
    </main>
  )
}