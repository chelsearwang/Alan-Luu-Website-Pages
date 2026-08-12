'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { images } from '@/data/alan'

type Props = {
  isMusicMode: boolean
  isMobile: boolean
  onEasterEgg?: () => void
}

const EXIT_DURATION = 900

export default function Avatar({ isMusicMode, isMobile, onEasterEgg }: Props) {
  const [renderMode, setRenderMode] = useState<'music' | 'content'>(isMusicMode ? 'music' : 'content')
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const target = isMusicMode ? 'music' : 'content'
    if (target === renderMode) return

    setExiting(true)
    const timer = setTimeout(() => {
      setRenderMode(target)
      setExiting(false)
    }, EXIT_DURATION)

    return () => clearTimeout(timer)
  }, [isMusicMode, renderMode])

  const wrapperClass = isMobile
    ? 'relative w-full flex items-center justify-center shrink-0'
    : 'absolute top-0 right-0 w-[45%] h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden'

  return (
    <div className={wrapperClass} style={isMobile ? { minHeight: 340 } : undefined}>
      {renderMode === 'music' ? (
        <MusicAvatar exiting={exiting} isMobile={isMobile} onEasterEgg={onEasterEgg} />
      ) : (
        <ContentAvatar exiting={exiting} isMobile={isMobile} onEasterEgg={onEasterEgg} />
      )}
    </div>
  )
}

// read Aegle's current rotation (in deg) off computed transform matrix for smooth settle
function getCurrentRotationDeg(el: HTMLElement): number {
  const transform = getComputedStyle(el).transform
  if (!transform || transform === 'none') return 0
  const match = transform.match(/matrix\(([^)]+)\)/)
  if (!match) return 0
  const [a, b] = match[1].split(',').map((v) => parseFloat(v))
  return Math.atan2(b, a) * (180 / Math.PI)
}

// how long the pendulum swings before easing to a stop on a mobile tap
const CLICK_SWING_DURATION = 700

// How many swings before the easter egg fires
const SWING_THRESHOLD = 5

// drop down & reel up Aegle
function MusicAvatar({ exiting, isMobile, onEasterEgg }: { exiting: boolean; isMobile: boolean; onEasterEgg?: () => void }) {
  const [visible, setVisible] = useState(false)
  const [swinging, setSwinging] = useState(false)
  const [settling, setSettling] = useState(false)
  const pendulumRef = useRef<HTMLDivElement>(null)
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const swingCount = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    }
  }, [])

  function startSwinging() {
    setSettling(false)
    setSwinging(true)

    swingCount.current += 1
    if (swingCount.current >= SWING_THRESHOLD) {
      swingCount.current = 0
      onEasterEgg?.()
    }
  }

  // gets pendulum's live angle, passes to CSS settle animation (ease down)
  function settleToStop() {
    const el = pendulumRef.current
    if (el) {
      const angle = getCurrentRotationDeg(el)
      el.style.setProperty('--settle-start', `${angle}deg`)
    }
    setSwinging(false)
    setSettling(true)
  }

  function handlePendulumEnter() {
    if (isMobile) return
    startSwinging()
  }

  function handlePendulumLeave() {
    if (isMobile) return
    settleToStop()
  }

  function handlePendulumClick() {
    if (!isMobile) return
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    startSwinging()
    clickTimeoutRef.current = setTimeout(settleToStop, CLICK_SWING_DURATION)
  }

  function handleSettleAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    if (e.animationName === 'pendulumSettle') setSettling(false)
  }

  const { src, alt } = images[0];
  const size = isMobile ? 380 : 800
  const isUp = !visible || exiting

  return (
    <div
      style={{
        transform: isUp ? 'translateY(-115%)' : 'translateY(0)',
        opacity: isUp ? 0 : 1,
        transition: exiting
          ? 'transform 0.8s cubic-bezier(0.55, 0, 0.85, 0.35), opacity 0.7s ease-in'
          : 'transform 0.7s ease-out, opacity 0.7s ease-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: isMobile ? 8 : 14,
        width: isMobile ? 'min(78vw, 380px)' : 'min(100%, 800px, 68vh)',
      }}
    >
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          className="underwater-glow"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '85%',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div
          ref={pendulumRef}
          className={`pendulum-hover cursor-pointer ${swinging ? 'pendulum-swinging' : ''} ${settling ? 'pendulum-settling' : ''}`}
          onMouseEnter={handlePendulumEnter}
          onMouseLeave={handlePendulumLeave}
          onClick={handlePendulumClick}
          onAnimationEnd={handleSettleAnimationEnd}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            style={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',
              filter: 'drop-shadow(0 8px 24px rgba(14, 165, 233, 0.25))',
            }}
            priority
          />
        </div>
      </div>
      <span
        className={`badge-bob bubble-pill rounded-full whitespace-nowrap mr-1 ${isMobile ? 'px-3 py-1 text-sm' : 'px-4 py-1.5 text-base'}`}
        style={{
          background: 'linear-gradient(135deg, rgba(56,189,248,0.16), rgba(7,89,133,0.2))',
          color: 'var(--accent-music)',
          border: '1px solid rgba(56,189,248,0.35)',
          boxShadow: '0 0 12px rgba(56, 189, 248, 0.25)',
        }}
      >
        Art by @megshrooom
      </span>
    </div>
  )
}

// polaroid tilt / shake
const CLICK_THRESHOLD = 5

function ContentAvatar({ exiting, isMobile, onEasterEgg }: { exiting: boolean; isMobile: boolean; onEasterEgg?: () => void }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [wobbling, setWobbling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const clickCount = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isMobile) return
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    const maxTilt = 10
    setTilt({ x: y * maxTilt, y: x * maxTilt })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
  }

  function handlePolaroidClick() {
    clickCount.current += 1
    if (clickCount.current >= CLICK_THRESHOLD) {
      clickCount.current = 0
      onEasterEgg?.()
    }

    if (!isMobile) return
    // remove then re-add class on next frame
    // animation restarts even if it's re-triggered mid-wobble
    setWobbling(false)
    requestAnimationFrame(() => setWobbling(true))
  }

  function handleWobbleAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    if (e.animationName === 'polaroidWobble') setWobbling(false)
  }

  const { src, alt } = images[1];
  const size = isMobile ? 340 : 400

  let transform: string
  if (exiting) {
    transform = 'scale(0.25) translateX(110px) rotate(12deg)'
  } else if (!visible) {
    transform = 'scale(0.55) translateY(-50px) rotate(-10deg)'
  } else {
    transform = 'scale(1) translateX(0) rotate(0deg)'
  }

  const hidden = exiting || !visible

  // hidden easter egg code!
  const revealOpacity = isMobile
    ? (wobbling ? 0.4 : 0.07)
    : Math.min(0.07 + ((Math.abs(tilt.x) + Math.abs(tilt.y)) / 20) * 0.4, 0.5)

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handlePolaroidClick}
      className="cursor-pointer"
      style={{
        position: 'relative',
        perspective: '800px',
        transform,
        opacity: hidden ? 0 : 1,
        transition: exiting
          ? 'transform 0.75s ease-in, opacity 0.65s ease-in'
          : 'transform 0.6s ease-out, opacity 0.6s ease-out',
        width: isMobile ? 'min(80vw, 380px)' : 'min(100%, 400px, 60vh)',
      }}
    >
      {/* hidden konami*/}
      <span
        style={{
          position: 'absolute',
          bottom: '-6px',
          right: '2px',
          fontSize: '0.62rem',
          letterSpacing: '0.12em',
          color: '#111827',
          opacity: revealOpacity,
          transform: 'rotate(9deg)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'opacity 0.25s ease',
          whiteSpace: 'nowrap',
        }}
      >
        ↑↑↓↓←→←→BA
      </span>

      <div
        className={`transition-transform duration-200 ease-out ${wobbling ? 'polaroid-wobble' : ''}`}
        onAnimationEnd={handleWobbleAnimationEnd}
        style={{
          position: 'relative',
          zIndex: 1,
          transform: `rotateX(${-tilt.x}deg) rotateY(${tilt.y}deg) rotate(-3deg)`,
        }}
      >
        {/* Polaroid frame */}
        <div
          className="bg-white p-3 pb-10 shadow-2xl"
          style={{ boxShadow: '4px 8px 24px rgba(0,0,0,0.18)' }}
        >
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            style={{
              objectFit: 'cover',
              display: 'block',
              width: '100%',
              height: 'auto',
            }}
            priority
          />
        </div>
      </div>
    </div>
  )
}