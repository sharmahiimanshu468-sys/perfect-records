export const SITE = {
  name: "Perfect Records Official",
  shortName: "Perfect Records",
  tagline: "Your Global Music Production Partner",
  description:
    "A global music production studio crafting records, visuals and artwork for independent artists and labels. From the first idea to the final master — we build sound that travels.",
  youtubeUrl: "https://youtube.com/@PerfectRecordsofficial",
  youtubeHandle: "@Perfectrecordsofficial",
  whatsappNumber: "+91 79741 22658",
  whatsappUrl: "https://wa.me/917974122658",
  email: "Perfectrecords2023@gmail.com",
  instagramUrl: "https://instagram.com/perfectrecordsofficial",
  instagramHandle: "@Perfectrecordsofficial",
  location: "Mumbai · London · Remote worldwide",
  emblem: "/assets/generated/logo-emblem.png",
  emblemAlt:
    "Perfect Records emblem — a gold guitar headstock over a black vinyl record with blue wings and gold broadcast arcs",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Video Editing", href: "#video-editing" },
  { label: "Poster Design", href: "#poster-design" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  id: string;
  title: string;
  blurb: string;
  points: string[];
  image: string;
  imageAlt: string;
};

export const SERVICES: Service[] = [
  {
    id: "full-track-production",
    title: "Full Track Production",
    blurb:
      "A complete record built around your voice — arrangement, session players and a sound that fits the song, from first idea to final bounce.",
    points: ["Beat & arrangement", "Vocal production", "Session musicians"],
    image: "/assets/generated/service-music-production.dim_1200x900.jpg",
    imageAlt:
      "Condenser microphone in a bright recording booth with soft daylight",
  },
  {
    id: "devotional-spiritual",
    title: "Devotional & Spiritual",
    blurb:
      "Bhajans, kirtans and spiritual releases handled with the reverence they deserve — live instruments, clean vocals and a mix that carries the emotion.",
    points: ["Bhajan & kirtan", "Live instrumentation", "Choir & harmony"],
    image: "/assets/generated/service-video-editing.dim_1200x900.jpg",
    imageAlt: "Soft daylight falling across a clean studio performance space",
  },
  {
    id: "custom-compositions",
    title: "Custom Compositions",
    blurb:
      "Original scores and bespoke songs written to your brief — for films, weddings, brands and creators who need music that exists nowhere else.",
    points: ["Original scoring", "Jingles & brand music", "Lyric writing"],
    image: "/assets/generated/service-poster-design.dim_1200x900.jpg",
    imageAlt:
      "Creative prints arranged on a light studio surface in neutral tones",
  },
  {
    id: "mixing-mastering",
    title: "Mixing & Mastering",
    blurb:
      "Streaming-ready mixes with depth and headroom, mastered for Spotify, Apple Music and YouTube without losing the punch.",
    points: ["Stem mixing", "Analog-style mastering", "Streaming loudness"],
    image: "/assets/generated/service-mixing-mastering.dim_1200x900.jpg",
    imageAlt: "Audio waveform bars on a clean white background",
  },
];

/**
 * Dedicated portrait album-cover poster for the Video Editing branch.
 * Kept as its own slot (not a SERVICES entry) so a replacement poster can be
 * dropped in without touching layout or the service cards.
 */
export const VIDEO_ALBUM_POSTER = {
  image: "/assets/generated/video-album-poster.dim_900x1200.png",
  imageAlt:
    "Perfect Records video album cover — gold guitar headstock over a black vinyl record with blue wings",
  label: "Video Album",
  caption: "Release artwork for a full video album",
} as const;

export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export const STATS: Stat[] = [
  { id: "subscribers", value: 128, suffix: "K+", label: "YouTube subscribers" },
  { id: "videos", value: 340, suffix: "+", label: "Videos delivered" },
  { id: "views", value: 24, suffix: "M+", label: "Total views" },
  { id: "artists", value: 90, suffix: "+", label: "Artists produced" },
];

export const GENRES: string[] = [
  "Indie Pop",
  "Cinematic Romantic",
  "Devotional",
  "Lo-Fi",
  "Dance",
];

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  meta: string;
  image: string;
  imageAlt: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "midnight-monsoon",
    title: "Midnight Monsoon",
    category: "Music Production",
    meta: "Single · 2025",
    image: "/assets/generated/service-music-production.dim_1200x900.jpg",
    imageAlt: "Microphone in a bright recording booth under soft daylight",
  },
  {
    id: "neon-bazaar",
    title: "Neon Bazaar",
    category: "Video Editing",
    meta: "Music video · 2025",
    image: "/assets/generated/service-video-editing.dim_1200x900.jpg",
    imageAlt: "Video editing timeline on a studio monitor in a bright room",
  },
  {
    id: "paper-hearts",
    title: "Paper Hearts",
    category: "Poster Design",
    meta: "Artwork suite · 2024",
    image: "/assets/generated/service-poster-design.dim_1200x900.jpg",
    imageAlt: "Music poster prints on a light surface in neutral tones",
  },
];

export type ProcessStep = {
  id: string;
  step: string;
  title: string;
  body: string;
};

export const PROCESS: ProcessStep[] = [
  {
    id: "brief",
    step: "01",
    title: "Brief & Direction",
    body: "We start with a call — your references, your voice, the feeling you want the record to leave behind.",
  },
  {
    id: "produce",
    step: "02",
    title: "Produce & Refine",
    body: "Production, vocals and arrangement shaped in the room, with rough mixes shared at every milestone.",
  },
  {
    id: "finish",
    step: "03",
    title: "Mix, Master & Deliver",
    body: "Final mix, streaming-ready master and the visual package — artwork, video and release assets.",
  },
];
