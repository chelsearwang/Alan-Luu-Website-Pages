'use client'

import { useState, useRef, useEffect } from 'react'
import { tracks } from '@/data/alan'
import TrackItem from './TrackItem' // Adjust path if necessary

type AudioState = {
  trackId: number
  currentTime: number 
  duration: number
}

export default function TrackList() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [audioState, setAudioState] = useState<AudioState | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // TrackList unmounts whenever the user leaves the Works tab, or toggles out of music mode
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  function handlePlay(track: typeof tracks[0]) {
    if (playingId === track.id) {
      audioRef.current?.pause()
      setPlayingId(null)
    } else {
      if (expandedId === track.id && audioRef.current && audioState?.trackId === track.id) {
        audioRef.current.play()
        setPlayingId(track.id)
      } else {
        audioRef.current?.pause()
        const audio = new Audio(track.src)

        audio.onloadedmetadata = () => {
          setAudioState({ trackId: track.id, currentTime: 0, duration: audio.duration })
        }

        audio.ontimeupdate = () => {
          setAudioState({ trackId: track.id, currentTime: audio.currentTime, duration: audio.duration })
        }

        audio.onended = () => {
          setPlayingId(null)
          setAudioState(prev => prev ? { ...prev, currentTime: 0 } : null)
        }

        audio.play()
        audioRef.current = audio
        setPlayingId(track.id)
        setExpandedId(track.id)
      }
    }
  }

  function handleToggleExpand(trackId: number) {
    if (expandedId === trackId) {
      audioRef.current?.pause()
      setPlayingId(null)
      setExpandedId(null)
      setAudioState(null)
    } else {
      setExpandedId(trackId)
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setAudioState(prev => prev ? { ...prev, currentTime: newTime } : null)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {tracks.map(track => {
        const isPlaying = playingId === track.id
        const isExpanded = expandedId === track.id
        const trackAudio = audioState?.trackId === track.id ? audioState : null

        return (
          <TrackItem
            key={track.id}
            track={track}
            isPlaying={isPlaying}
            isExpanded={isExpanded}
            trackAudio={trackAudio}
            onPlay={handlePlay}
            onToggleExpand={handleToggleExpand}
            onSeek={handleSeek}
          />
        )
      })}
    </div>
  )
}