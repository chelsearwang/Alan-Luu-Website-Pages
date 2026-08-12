'use client'

import { useState } from 'react'

type Link = {
  label: string
  url: string
}

type Props = {
  links: Link[]
  isMusicMode: boolean
}

export default function LinkList({ links, isMusicMode }: Props) {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)

  const baseBg = isMusicMode ? 'rgba(234, 246, 255, 0.06)' : '#FFFFFF'
  const baseBorder = isMusicMode ? 'rgba(234, 246, 255, 0.2)' : 'var(--muted-content)55'
  const baseText = isMusicMode ? 'var(--text-music)' : 'var(--text-content)'

  const hoverBg = isMusicMode ? 'var(--accent-music)' : 'var(--accent-content)'
  const hoverText = isMusicMode ? 'var(--on-accent-music)' : 'var(--on-accent-content)'
  const hoverGlow = isMusicMode
    ? '0 4px 24px rgba(34, 211, 238, 0.35)'
    : '0 4px 16px rgba(37, 99, 235, 0.25)'

  const shape = isMusicMode ? 'rounded-full' : 'rounded-xl'

  return (
    <div className="flex flex-col gap-3">
      {links.map(link => {
        const isHovered = hoveredLabel === link.label
        return (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHoveredLabel(link.label)}
            onMouseLeave={() => setHoveredLabel(null)}
            className={`flex items-center justify-between px-6 py-4 border transition-all duration-300 ${shape}`}
            style={{
              backgroundColor: isHovered ? hoverBg : baseBg,
              borderColor: isHovered ? hoverBg : baseBorder,
              color: isHovered ? hoverText : baseText,
              boxShadow: isHovered ? hoverGlow : 'none',
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            <span className="font-medium text-lg">{link.label}</span>
            <span className="text-lg opacity-60">↗</span>
          </a>
        )
      })}
    </div>
  )
}