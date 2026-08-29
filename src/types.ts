export type Platform = 'instagram' | 'youtube' | 'linkedin' | 'facebook' | 'threads' | 'direct';

export interface Project {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  thumbnail: string;
  videoUrl: string;
  sourceUrl?: string;
  platform: Platform;
  year: string;
  duration?: string;
  description: string;
  client?: string;
  featured?: boolean;
  aspect?: '16:9' | '9:16' | '1:1' | '4:5';
  tags: string[];
  metrics?: {
    views?: string;
    likes?: string;
    shares?: string;
  };
}

export interface GalleryVideo {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  videoUrl: string;
  duration?: string;
  description: string;
  tags: string[];
  driveUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  icon?: string;
  color?: string;
  driveUrl?: string;
  youtubePlaylistUrl?: string;
}

export interface SocialLink {
  platform: Platform;
  url: string;
  label: string;
  handle: string;
  icon: string;
}

export interface Specialty {
  id: string;
  title: string;
  description: string;
  tags: string[];
  gradient?: string;
}

export interface SoftwareTool {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 0-100
  badge: string;
  description: string;
  color: string;
}

export interface CreatorProfile {
  name: string;
  headline: string;
  subHeadline: string;
  bio: string;
  portraitUrl: string;
  location: string;
  email: string;
  whatsapp: string;
  experienceYears: string;
  stats: {
    label: string;
    value: string;
    detail: string;
  }[];
}
