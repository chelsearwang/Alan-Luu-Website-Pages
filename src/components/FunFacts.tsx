'use client'

type Props = {
  isMusicMode: boolean
  facts: string[]
}

const POST_IT_ROTATIONS = [-4, 3, -2, 4, -3, 2]
const POST_IT_TINTS = ['#FEF9C3', '#FCE7F3', '#DBEAFE', '#DCFCE7', '#FFE4E6', '#E0E7FF']

export default function FunFacts({ isMusicMode, facts }: Props) {
  if (isMusicMode) {
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {facts.map((fact, i) => (
          <span
            key={i}
            className="bubble-pill badge-bob rounded-full px-5 py-3 text-base font-medium"
            style={{
              background: 'linear-gradient(135deg, rgba(56,189,248,0.14), rgba(7,89,133,0.18))',
              border: '1px solid rgba(56,189,248,0.32)',
              color: 'var(--accent-music)',
              animationDelay: `${i * 0.35}s`,
              fontFamily: 'var(--font-outfit)',
            }}
          >
            {fact}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {facts.map((fact, i) => (
        <div
          key={i}
          className="post-it"
          style={{
            backgroundColor: POST_IT_TINTS[i % POST_IT_TINTS.length],
            ['--rotate' as string]: `${POST_IT_ROTATIONS[i % POST_IT_ROTATIONS.length]}deg`,
          }}
        >
          {fact}
        </div>
      ))}
    </div>
  )
}