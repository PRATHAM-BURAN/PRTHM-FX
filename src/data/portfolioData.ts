import { Category, CreatorProfile, Project, SocialLink, SoftwareTool, Specialty, GalleryVideo } from '../types';

export const creatorProfile: CreatorProfile = {
  name: "PRTHM",
  headline: "HELLO, I'M PRTHM",
  subHeadline: "VIDEO EDITOR • VISUAL STORYTELLER • CREATIVE",
  bio: "I turn raw footage into visual stories designed to capture attention, emotion and atmosphere. Specializing in high-energy reels, cinematic short films, color grading, and dynamic visual rhythms that keep viewers hooked from the very first frame.",
  portraitUrl: "/assets/prthm_portrait.png",
  location: "Global / Remote",
  email: "prathamb72official@gmail.com",
  whatsapp: "+91 9067372943",
  experienceYears: "4+ Years",
  stats: [
    { label: "Instagram Channels", value: "2 Active", detail: "@prthm_fx & @pratham_buran" },
    { label: "YouTube Studio", value: "@prthm_fx", detail: "Official Showcase Channel" },
    { label: "Master Standards", value: "4K HDR", detail: "DaVinci Wide Gamut Workflow" },
    { label: "Drive Vault", value: "Cloud 4K", detail: "Raw Uncompressed Archives" }
  ]
};

export const mainDriveUrl = "https://drive.google.com/drive/folders/1Y7agX_zArUDnIWYpbUmKAPTaTqSrcwDR?usp=sharing";
export const whatsappDmUrl = "https://wa.me/919067372943?text=Hi%20Prthm,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20collaborate%20on%20a%20project!";
export const instaMainDmUrl = "https://ig.me/m/pratham_buran";
export const instaCreatorDmUrl = "https://ig.me/m/prthm_fx";
export const youtubeChannelUrl = "https://youtube.com/@prthm_fx?si=Sfmw8HprEmlbrguH";

export const socialLinks: (SocialLink & { qrCode?: string; isMain?: boolean })[] = [
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/prthm_fx?igsi=dXBhcXg3Zjc1YnZh',
    label: 'Instagram (Creator & VFX)',
    handle: '@prthm_fx',
    icon: 'Instagram',
    qrCode: '/assets/qr/qr_insta_creator.jpg',
    isMain: true
  },
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/pratham_buran?igsi=M2w1bjRnc2gybWdv',
    label: 'Instagram (Main Profile)',
    handle: '@pratham_buran',
    icon: 'Instagram',
    qrCode: '/assets/qr/qr_insta_main.jpg'
  },
  {
    platform: 'youtube',
    url: youtubeChannelUrl,
    label: 'YouTube Channel',
    handle: '@prthm_fx',
    icon: 'Youtube'
  },
  {
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/pratham-buran?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    label: 'LinkedIn',
    handle: 'in/pratham-buran',
    icon: 'Linkedin'
  },
  {
    platform: 'threads',
    url: 'https://www.threads.com/@pratham_buran',
    label: 'Threads',
    handle: '@pratham_buran',
    icon: 'AtSign',
    qrCode: '/assets/qr/qr_threads.jpg'
  },
  {
    platform: 'direct',
    url: mainDriveUrl,
    label: 'Main Google Drive',
    handle: 'Raw Vault',
    icon: 'HardDrive'
  }
];

export const categories: Category[] = [
  { id: '1', name: 'Reels & Shorts', slug: 'reels', description: 'High-retention vertical edits with punchy hooks', count: 42, color: '#FF2A2A', driveUrl: 'https://drive.google.com/drive/folders/16Ckg17L5iqXoHs8ilb7_fks70HN-339f?usp=sharing' },
  { id: '2', name: 'College Life', slug: 'college-life', description: 'Nostalgic vibes, campus memories, and energetic youth beats', count: 14, color: '#C00000', driveUrl: 'https://drive.google.com/drive/folders/161aExRVBb64wO-CKVFG9dW_OsDDUziS-?usp=sharing' },
  { id: '3', name: 'Travel & Explore', slug: 'travel', description: 'Atmospheric landscapes, speed ramps, and wanderlust', count: 16, color: '#980000', driveUrl: 'https://drive.google.com/drive/folders/1FG2hph3zXe3Rx8KQaQowGkLajpQ35Cn9?usp=sharing' },
  { id: '4', name: 'Short Films', slug: 'short-films', description: 'Narrative pacing, emotional arcs, and multi-cam sync', count: 8, color: '#FF4D4D', driveUrl: 'https://drive.google.com/drive/folders/1Ho5bL__eNBu7ZQXTC7kO_ALgZyOZoR9I?usp=sharing' },
  { id: '5', name: 'Vlogs', slug: 'vlogs', description: 'Story-driven lifestyle chronicles and engaging narratives', count: 22, color: '#E60000', driveUrl: 'https://drive.google.com/drive/folders/1pc7Uhj90Iu3ftDOX3dikwdTzgRNH0rV2?usp=sharing', youtubePlaylistUrl: 'https://youtube.com/playlist?list=PLEWW45ZeUmDw&si=MMPcvk_QbQdxDJJM' },
  { id: '6', name: 'Mini Vlogs', slug: 'mini-vlogs', description: 'Fast-paced 60-second micro stories crafted for TikTok & Reels', count: 29, color: '#D60000', driveUrl: 'https://drive.google.com/drive/folders/1HOpRnM4pYGhYyGLVyDY3LYIvh7PQ7ovm?usp=sharing' },
  { id: '7', name: 'Projects', slug: 'projects', description: 'Brand campaigns, commercial showreels, and client spotlights', count: 12, color: '#B30000', driveUrl: 'https://drive.google.com/drive/folders/16Xkl1aOKtIQeD-Rk53ZAkB6DWCU4Qz6n?usp=sharing' },
  { id: '8', name: 'Cooking & Food', slug: 'cooking', description: 'Crisp ASMR sound bites, macro transitions, and sizzling color palettes', count: 11, color: '#FF3333', driveUrl: 'https://drive.google.com/drive/folders/1lIMyZ9CL37Tkyz5a6c0L9CHYCJ9Horml?usp=sharing' },
  { id: '9', name: 'Events & Aftermovies', slug: 'events', description: 'Concerts, festivals, night clubs, and high-adrenaline flashes', count: 19, color: '#E60000', driveUrl: 'https://drive.google.com/drive/folders/1f5mcn7si6n7dJdiQsYxrWtIRp3QdShX-?usp=sharing' },
  { id: '10', name: 'Experimental', slug: 'experimental', description: '3D VFX, glitch art, mixed frame rates, and surreal soundscapes', count: 9, color: '#FF6666', driveUrl: mainDriveUrl }
];

export const galleryVideos: GalleryVideo[] = [
  {
    id: 'vid-1',
    title: '3D VFX & DIMENSION WARP',
    category: 'Experimental & VFX',
    categorySlug: 'experimental',
    videoUrl: '/assets/videos/vid_1.mp4',
    duration: '0:22',
    description: 'Dynamic 3D perspective warp, optical glitch transitions, spatial depth mapping, and heavy impact bass drops.',
    tags: ['3D VFX', 'Dimension Warp', 'Glitch Art', 'Spatial Sound'],
    driveUrl: 'https://drive.google.com/drive/folders/16Ckg17L5iqXoHs8ilb7_fks70HN-339f?usp=sharing'
  },
  {
    id: 'vid-2',
    title: 'CINEMATIC RHYTHM & CUTS',
    category: 'Reels & Shorts',
    categorySlug: 'reels',
    videoUrl: '/assets/videos/vid_2.mp4',
    duration: '0:18',
    description: 'Ultra high-retention reel edit with frame-precise rhythm matching, speed ramps, and sub-bass whooshes.',
    tags: ['Velocity', 'Rhythm Match', 'Sound Ramps', 'High Retention'],
    driveUrl: 'https://drive.google.com/drive/folders/16Ckg17L5iqXoHs8ilb7_fks70HN-339f?usp=sharing'
  },
  {
    id: 'vid-3',
    title: 'CAMPUS & COLLEGE LIFE NOSTALGIA',
    category: 'College Life',
    categorySlug: 'college-life',
    videoUrl: '/assets/videos/vid_3.mp4',
    duration: '0:26',
    description: 'Nostalgic youth chronicles, warm golden-hour color grading, fast cuts, and sentimental pacing.',
    tags: ['College Life', 'Nostalgia', 'Warm Grade', 'Fast Cuts'],
    driveUrl: 'https://drive.google.com/drive/folders/161aExRVBb64wO-CKVFG9dW_OsDDUziS-?usp=sharing'
  },
  {
    id: 'vid-4',
    title: 'WANDERLUST TRAVEL CHRONICLE',
    category: 'Travel & Explore',
    categorySlug: 'travel',
    videoUrl: '/assets/videos/vid_4.mp4',
    duration: '0:45',
    description: 'Atmospheric landscapes, cinematic drone sweeps, seamless whip-pan transitions, and travel story pacing.',
    tags: ['Travel', 'Cinematic Drone', 'Whip Pan', 'Teal & Orange'],
    driveUrl: 'https://drive.google.com/drive/folders/1FG2hph3zXe3Rx8KQaQowGkLajpQ35Cn9?usp=sharing'
  },
  {
    id: 'vid-5',
    title: 'NARRATIVE SHORT FILM ARC',
    category: 'Short Films',
    categorySlug: 'short-films',
    videoUrl: '/assets/videos/vid_5.mp4',
    duration: '0:32',
    description: 'Dramatic storytelling arc with cinematic scope bars, multi-camera audio sync, and suspenseful tone curves.',
    tags: ['Narrative', 'Multi-Cam', 'Film Tone', 'Emotional Arc'],
    driveUrl: 'https://drive.google.com/drive/folders/1Ho5bL__eNBu7ZQXTC7kO_ALgZyOZoR9I?usp=sharing'
  },
  {
    id: 'vid-6',
    title: 'LIFESTYLE & NARRATIVE VLOG',
    category: 'Vlogs',
    categorySlug: 'vlogs',
    videoUrl: '/assets/videos/vid_6.mp4',
    duration: '0:30',
    description: 'Engaging lifestyle story edit with dynamic zooms, clean vocal enhancement, and ambient Foley textures.',
    tags: ['Vlog', 'Dynamic Zoom', 'Voice Enhance', 'Ambient Foley'],
    driveUrl: 'https://drive.google.com/drive/folders/1pc7Uhj90Iu3ftDOX3dikwdTzgRNH0rV2?usp=sharing'
  },
  {
    id: 'vid-7',
    title: '60-SECOND MICRO STORY',
    category: 'Mini Vlogs',
    categorySlug: 'mini-vlogs',
    videoUrl: '/assets/videos/vid_7.mp4',
    duration: '0:28',
    description: 'Rapid-fire 60-second vertical micro-story built for viral feeds with snappy punch-in hooks.',
    tags: ['Mini Vlog', 'Micro Story', 'Punch In', 'Retention Hook'],
    driveUrl: 'https://drive.google.com/drive/folders/1HOpRnM4pYGhYyGLVyDY3LYIvh7PQ7ovm?usp=sharing'
  },
  {
    id: 'vid-8',
    title: 'COMMERCIAL BRAND SHOWCASE',
    category: 'Projects',
    categorySlug: 'projects',
    videoUrl: '/assets/videos/vid_8.mp4',
    duration: '0:35',
    description: 'High-impact commercial campaign showreel with premium product color timing and crisp typography motion.',
    tags: ['Brand Campaign', 'Commercial', 'Product Grade', 'Motion Type'],
    driveUrl: 'https://drive.google.com/drive/folders/16Xkl1aOKtIQeD-Rk53ZAkB6DWCU4Qz6n?usp=sharing'
  },
  {
    id: 'vid-9',
    title: 'ASMR CULINARY SIZZLE & TASTE',
    category: 'Cooking & Food',
    categorySlug: 'cooking',
    videoUrl: '/assets/videos/vid_9.mp4',
    duration: '0:24',
    description: 'Crisp macro food transitions, sizzling acoustic sound design, and mouth-watering saturated color grading.',
    tags: ['Cooking ASMR', 'Macro Cut', 'Sound FX', 'Sizzling Color'],
    driveUrl: 'https://drive.google.com/drive/folders/1lIMyZ9CL37Tkyz5a6c0L9CHYCJ9Horml?usp=sharing'
  },
  {
    id: 'vid-10',
    title: 'HIGH-VOLTAGE EVENT AFTERMOVIE',
    category: 'Events & Aftermovies',
    categorySlug: 'events',
    videoUrl: '/assets/videos/vid_10.mp4',
    duration: '0:40',
    description: 'Concert & festival adrenaline rush with optical strobe transitions, strobe sync, and heavy drops.',
    tags: ['Aftermovie', 'Concert FX', 'Strobe Sync', 'Beat Drops'],
    driveUrl: 'https://drive.google.com/drive/folders/1f5mcn7si6n7dJdiQsYxrWtIRp3QdShX-?usp=sharing'
  },
  {
    id: 'vid-11',
    title: 'GLITCH ART & OPTICAL FLOW',
    category: 'Experimental & VFX',
    categorySlug: 'experimental',
    videoUrl: '/assets/videos/vid_11.mp4',
    duration: '0:25',
    description: 'Experimental speed ramping, mixed framerates, RGB split distortion, and surreal audiovisual pacing.',
    tags: ['RGB Split', 'Glitch Art', 'Optical Flow', 'Mixed FPS'],
    driveUrl: 'https://drive.google.com/drive/folders/1f5mcn7si6n7dJdiQsYxrWtIRp3QdShX-?usp=sharing'
  }
];

export const projects: Project[] = [];

export const specialties: Specialty[] = [
  {
    id: 'spec-1',
    title: 'DIRECTOR-GRADE COLOR GRADING',
    description: 'Bespoke tone curves, skin-tone isolation, contrast balance, and cinematic look development in DaVinci Resolve.',
    tags: ['DaVinci Resolve', 'Skin Tone Isolation', 'Contrast Balance', 'Cinematic Looks']
  },
  {
    id: 'spec-2',
    title: 'EMOTIONAL STORYTELLING PACING',
    description: 'Structuring raw scenes into emotional narratives with deliberate breathing room, hook architecture, and captivating story arcs.',
    tags: ['Narrative Flow', 'Emotional Pacing', 'Pacing Theory', 'Director Vision']
  },
  {
    id: 'spec-3',
    title: 'VIRAL SHORT-FORM RETENTION',
    description: 'Engineered retention techniques for Instagram Reels, YouTube Shorts, and TikTok with sub-2s hooks, kinetic captions, and sound ramps.',
    tags: ['High Retention', 'Hook Architecture', 'Audio Ramps', 'Kinetic Text']
  },
  {
    id: 'spec-4',
    title: 'VISUAL RHYTHM & PACING',
    description: 'Structuring rapid timeline cuts, kinetic energy, frame rhythm, match cuts, and scene transitions that keep viewer attention locked.',
    tags: ['Timeline Pacing', 'Frame Rhythm', 'Speed Ramping', 'Retention Design']
  },
  {
    id: 'spec-5',
    title: 'SPATIAL SOUND DESIGN',
    description: 'Bespoke SFX layering (whooshes, risers, sub-drops, environmental textures) that makes edits hit with gut-punching impact.',
    tags: ['Sub Drops', 'Foley', 'Layered SFX', 'Binaural Audio']
  },
  {
    id: 'spec-6',
    title: 'DYNAMIC TRANSITIONS',
    description: 'Seamless match cuts, speed ramps, whip pans, mask transitions, and geometric zooms that keep eyes locked on screen.',
    tags: ['Match Cuts', 'Speed Ramping', 'Masking', 'Seamless Warps']
  }
];

export const softwareTools: SoftwareTool[] = [
  {
    id: 'tool-vn',
    name: 'VN Video Editor',
    category: 'Mobile & Timeline NLE',
    proficiency: 75,
    badge: 'Moderate',
    description: 'Multi-track audio-visual editing, custom speed curve ramping, keyframe animations, and precision cutting.',
    color: '#00D2FF'
  },
  {
    id: 'tool-capcut',
    name: 'CapCut Pro',
    category: 'Viral Reels & Shorts',
    proficiency: 78,
    badge: 'Moderate',
    description: 'Trending sound synchronization, velocity transitions, kinetic captions, auto-cut rhythms, and masking.',
    color: '#FF0055'
  },
  {
    id: 'tool-davinci',
    name: 'DaVinci Resolve',
    category: 'Color Grading & Finishing',
    proficiency: 45,
    badge: 'Basic (Learner)',
    description: 'Node tree fundamentals, primary color wheels, contrast curve balancing, skin-tone isolation, and cinematic look building.',
    color: '#FF6B6B'
  },
  {
    id: 'tool-googleflow',
    name: 'Google Flow',
    category: 'AI Generative Workflow',
    proficiency: 80,
    badge: 'AI Suite',
    description: 'AI-driven generative motion, prompt-to-video experimentation, visual flow ideation, and storyboard conceptualization.',
    color: '#4285F4'
  },
  {
    id: 'tool-gemini',
    name: 'Gemini AI',
    category: 'Creative Script & Vision',
    proficiency: 85,
    badge: 'AI Co-Pilot',
    description: 'Retention hook crafting, video pacing ideation, storytelling arcs, visual scene descriptions, and caption strategies.',
    color: '#A155B9'
  },
  {
    id: 'tool-alightmotion',
    name: 'Alight Motion',
    category: 'Keyframing & Mobile Cuts',
    proficiency: 40,
    badge: 'Basic (Learner)',
    description: 'Vector layers, speed graph curves, shake transitions, and mobile video effects.',
    color: '#00E676'
  },
  {
    id: 'tool-instaedits',
    name: 'Instagram In-App Edits',
    category: 'Native Reel Studio',
    proficiency: 90,
    badge: 'Advanced / Native',
    description: 'Direct native audio matching, trending algorithmic formats, interactive overlays, and platform-native compression mastery.',
    color: '#E1306C'
  }
];
