import { appendBasePath } from '@/utils/paths';

export const profile = {
  name: 'Alan Luu',
  tagline: {
    content: 'Content Creator',
    music: 'Artist',
  },
  about: [
    'Hello everyone! My name is Alan, and I’m a music producer and content creator.',
    'I’ve been in love with creative work for over a decade now, and I don’t plan to stop anytime soon! It first began with learning to edit Valorant and Minecraft gameplay videos for YouTube.',
    'Then, 2021 marked the year I discovered FL Studio and the world of music production. Ever since starting these two hobbies, my life has changed entirely, and I hope to change the lives of others following me!',
  ],
  aboutMusic: [
    'Welcome to my latest project: Beyond These Borders.',
    'Beyond These Borders is Aluuna’s debut EP, consisting of 6 songs. This EP is my journey through becoming a creator in the space, represented by my character Aegle (the fish you see on screen now)!',
    'Aegle is an Angler Fish that lives in an underwater city as a mechanic/engineer. The EP parallels my entrance into the world of art through his mission of breaking through what’s called the “water barrier.”',
    'I hope you enjoy the EP and follow me beyond these borders!',
  ],
  contact: 'email',
}

// Short, bite-sized versions of facts already told in the About copy above —
// swap these out any time for whatever you'd rather feature.
export const funFacts = {
  content: [
    '🎮 Started out editing Valorant clips',
    '⛏️ Also interested in music production',
    '🎧 Discovered FL Studio in 2021',
    '📅 Creating content for over a decade',
  ],
  music: [
    '🐟 meet Aegle the Angler Fish',
    '🔧 Aegle\'s day job: underwater mechanic',
    '💿 Debut EP: Beyond These Borders',
    '🎵 6 tracks featured on this EP',
  ],
}

export const contentLinks = [
  { label: 'YouTube',   url: 'https://www.youtube.com/@alanluuu' },
  { label: 'Instagram', url: 'https://www.instagram.com/alanluuu_/' },
  { label: 'TikTok',    url: 'https://www.tiktok.com/@aluuna__' },
]

export const musicLinks = [
  { label: 'YouTube', url: 'https://www.youtube.com/@Aluunamusic' },
  { label: 'Instagram', url: 'https://www.instagram.com/aluunamusic/' },
  { label: 'Spotify',     url: 'https://open.spotify.com/artist/4MhAs6owaq7efiDkymW7Rs?si=j_iLAEFQSW-bL_oUeNPDgg' },
  { label: 'Apple Music', url: 'https://music.apple.com/us/artist/aluuna/1840067621' },
  { label: 'Kofi', url: 'https://ko-fi.com/alanluu' },
  { label: 'Bandcamp', url: 'https://aluuna.bandcamp.com' },
]

export const videos = [
  {
    id: 1,
    title: 'how i made someones proposal song',
    description: 'The making of Ringo Tsuga’s proposal music',
    url: 'https://youtu.be/EDRd3Awh5N8?si=th6gIK-ZhKIZVenN',
    thumbnail: null, // add a URL or local path later
  },
  {
    id: 2,
    title: 'The Beauty of the YouTube Animation Community',
    description: 'A video essay on what makes the Animation Community so great',
    url: 'https://youtu.be/uJK_2Ui5uks?si=CB81njdhSSKyqjp6',
    thumbnail: null,
  },
  {
    id: 3,
    title: 'Come watch my first video too',
    description: 'A quick introduction to me as a person',
    url: 'https://youtu.be/PBsOG7EAaXI?si=9xkCHR9YZGGTa3Eh',
    thumbnail: null,
  },
]


const rawTracks = [
  {
    id: 1,
    title: 'Aero Era',
    description: 'Single · 2026',
    src: '/music/AeroEra.mp3',
  },
  {
    id: 2,
    title: 'ONETWO',
    description: 'Single · 2026',
    src: '/music/ONETWO.mp3',
  },
  {
    id: 3,
    title: 'i see me',
    description: 'Single · 2026',
    src: '/music/iseeme.mp3',
  },
];

const rawImages = [
  {
    src: "/images/avatar-music.png",
    alt: "Aluuna"
  },
  {
    src: "/images/avatar-content.png",
    alt: "Alan Luu"
  }
];

// Export mapped arrays with prepended base paths
export const tracks = rawTracks.map(track => ({
  ...track,
  src: appendBasePath(track.src)
}));

export const images = rawImages.map(image => ({
  ...image,
  src: appendBasePath(image.src)
}));