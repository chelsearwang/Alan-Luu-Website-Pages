'use client'

// pre-generated bubbles
const BUBBLES = [
  { w: 14, l: 8,  b: -8,  dur: 9.2, delay: 0 },
  { w: 22, l: 18, b: -12, dur: 13,  delay: 2.1 },
  { w: 9,  l: 31, b: -5,  dur: 7.8, delay: 4.3 },
  { w: 17, l: 44, b: -15, dur: 11,  delay: 1.2 },
  { w: 28, l: 55, b: -9,  dur: 15,  delay: 3.7 },
  { w: 11, l: 63, b: -6,  dur: 8.5, delay: 6.1 },
  { w: 20, l: 72, b: -18, dur: 12,  delay: 0.8 },
  { w: 8,  l: 82, b: -4,  dur: 6.9, delay: 5.4 },
  { w: 25, l: 90, b: -11, dur: 14,  delay: 2.9 },
  { w: 13, l: 14, b: -20, dur: 10,  delay: 7.2 },
]

export default function AmbientBubbles() {
  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
    >
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className="bg-bubble"
          style={{
            width: `${b.w}px`,
            height: `${b.w}px`,
            left: `${b.l}%`,
            bottom: `${b.b}%`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
