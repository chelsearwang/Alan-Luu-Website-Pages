'use client'

import { profile, contentLinks, musicLinks, funFacts } from '@/data/alan'
import VideoList from '@/components/VideoList'
import TrackList from '@/components/TrackList'
import LinkList from '@/components/LinkList'
import FunFacts from '@/components/FunFacts'

type Section = 'about' | 'works' | 'links'

type Props = {
  isMusicMode: boolean
  activeSection: Section
  isMobile: boolean
}

export default function ContentPanel({ isMusicMode, activeSection, isMobile }: Props) {
  return (
    <div key={`${activeSection}-${isMusicMode}`} className="w-full flex flex-col gap-4 section-fade">

      {activeSection === 'about' && (
        <div className={`flex flex-col gap-4 ${isMobile ? '' : 'max-w-3xl'}`}>
          {(isMusicMode ? profile.aboutMusic : profile.about).map((paragraph, i) => (
            <p
              key={i}
              className="text-xl leading-relaxed"
              style={{
                color: isMusicMode ? 'var(--body-music)' : 'var(--body-content)',
                fontFamily: 'var(--font-outfit)',
              }}
            >
              {paragraph}
            </p>
          ))}

          <FunFacts isMusicMode={isMusicMode} facts={isMusicMode ? funFacts.music : funFacts.content} />
        </div>
      )}

      {activeSection === 'works' && !isMusicMode && <VideoList />}
      {activeSection === 'works' && isMusicMode && <TrackList />}

      {activeSection === 'links' && (<LinkList
         links={isMusicMode ? musicLinks : contentLinks}
          isMusicMode={isMusicMode}
        />
      )}

    </div>
  )
}