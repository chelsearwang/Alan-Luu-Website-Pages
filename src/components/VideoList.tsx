import { videos } from '@/data/alan'
import { getYouTubeId } from '@/utils/youtube'

export default function VideoList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {videos.map(video => {
        const ytId = getYouTubeId(video.url)
        const thumbnail = video.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null)

        return (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noreferrer"
            className="yt-card block rounded-xl overflow-hidden border"
            style={{
              borderColor: 'var(--muted-content)33',
              backgroundColor: 'var(--panel-content)',
              transition: 'background-color 0.8s ease 400ms, border-color 0.22s ease',
            }}
          >
            <div className="relative w-full aspect-video bg-gray-200 overflow-hidden">
              {thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnail}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-3xl">
                  🎬
                </div>
              )}

              <div className="yt-play-overlay absolute inset-0 flex items-center justify-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: '#111827', paddingLeft: 3 }}
                >
                  ▶
                </div>
              </div>
            </div>

            <div className="p-4">
              <p
                className="font-semibold text-lg leading-snug"
                style={{ color: 'var(--text-content)' }}
              >
                {video.title}
              </p>
              <p className="text-sm opacity-50 mt-1" style={{ color: 'var(--text-content)' }}>
                {video.description}
              </p>
            </div>
          </a>
        )
      })}
    </div>
  )
}
