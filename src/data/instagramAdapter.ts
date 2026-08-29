import { Project, Platform } from '../types';

/**
 * Raw Instagram / Social Post Interface
 * Used when importing reels manually or via the official Instagram Graph / Basic Display API.
 */
export interface RawSocialPost {
  id: string;
  caption: string;
  media_type: 'VIDEO' | 'IMAGE' | 'CAROUSEL_ALBUM' | 'REEL';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  views_count?: number;
  custom_category_override?: string;
  platform?: Platform;
}

/**
 * Automatic Category Mapping based on hashtags and keywords
 */
export const HASHTAG_CATEGORY_MAP: Record<string, { name: string; slug: string }> = {
  college: { name: 'College Life', slug: 'college-life' },
  campus: { name: 'College Life', slug: 'college-life' },
  student: { name: 'College Life', slug: 'college-life' },
  project: { name: 'Projects', slug: 'projects' },
  commercial: { name: 'Projects', slug: 'projects' },
  client: { name: 'Projects', slug: 'projects' },
  vlog: { name: 'Vlogs', slug: 'vlogs' },
  lifestyle: { name: 'Vlogs', slug: 'vlogs' },
  daily: { name: 'Vlogs', slug: 'vlogs' },
  minivlog: { name: 'Mini Vlogs', slug: 'mini-vlogs' },
  short: { name: 'Mini Vlogs', slug: 'mini-vlogs' },
  shortfilm: { name: 'Short Films', slug: 'short-films' },
  film: { name: 'Short Films', slug: 'short-films' },
  cinema: { name: 'Short Films', slug: 'short-films' },
  indoor: { name: 'Projects', slug: 'projects' },
  studio: { name: 'Projects', slug: 'projects' },
  podcast: { name: 'Vlogs', slug: 'vlogs' },
  cooking: { name: 'Cooking & Food', slug: 'cooking' },
  food: { name: 'Cooking & Food', slug: 'cooking' },
  recipe: { name: 'Cooking & Food', slug: 'cooking' },
  cinematic: { name: 'Short Films', slug: 'short-films' },
  colorgrade: { name: 'Short Films', slug: 'short-films' },
  davinci: { name: 'Short Films', slug: 'short-films' },
  reels: { name: 'Reels & Shorts', slug: 'reels' },
  trending: { name: 'Reels & Shorts', slug: 'reels' },
  event: { name: 'Events & Aftermovies', slug: 'events' },
  aftermovie: { name: 'Events & Aftermovies', slug: 'events' },
  concert: { name: 'Events & Aftermovies', slug: 'events' },
  travel: { name: 'Travel & Explore', slug: 'travel' },
  nature: { name: 'Travel & Explore', slug: 'travel' },
  wanderlust: { name: 'Travel & Explore', slug: 'travel' },
  experimental: { name: 'Experimental', slug: 'experimental' },
  vfx: { name: 'Experimental', slug: 'experimental' },
  glitch: { name: 'Experimental', slug: 'experimental' },
  blender: { name: 'Experimental', slug: 'experimental' },
};

/**
 * Extracts hashtags from a caption text
 */
export function extractHashtags(text: string): string[] {
  const matches = text.match(/#[\w\u0590-\u05ff]+/g);
  return matches ? matches.map(tag => tag.toLowerCase()) : [];
}

/**
 * Automatically determines category from caption, tags, or manual override
 */
export function categorizePost(caption: string, manualOverride?: string): { name: string; slug: string } {
  if (manualOverride) {
    const slug = manualOverride.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { name: manualOverride, slug };
  }

  const tags = extractHashtags(caption);
  const lowerCaption = caption.toLowerCase();

  // 1. Check extracted hashtags
  for (const tag of tags) {
    const cleanTag = tag.replace('#', '');
    if (HASHTAG_CATEGORY_MAP[cleanTag]) {
      return HASHTAG_CATEGORY_MAP[cleanTag];
    }
  }

  // 2. Check caption keywords
  for (const [key, category] of Object.entries(HASHTAG_CATEGORY_MAP)) {
    if (lowerCaption.includes(key)) {
      return category;
    }
  }

  // Default fallback
  return { name: 'Reels & Shorts', slug: 'reels' };
}

/**
 * Transforms raw social post (API or manual input) into a unified Project item
 */
export function transformSocialPostToProject(post: RawSocialPost): Project {
  const category = categorizePost(post.caption, post.custom_category_override);
  const tags = extractHashtags(post.caption);
  
  // Format numbers nicely (e.g. 15000 -> 15K)
  const formatCount = (n?: number) => {
    if (!n) return undefined;
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return String(n);
  };

  const year = post.timestamp ? new Date(post.timestamp).getFullYear().toString() : new Date().getFullYear().toString();

  // First line or first sentence as title
  const cleanTitle = post.caption.split('\n')[0].replace(/#\w+/g, '').trim() || 'UNTITLED REEL';

  return {
    id: post.id,
    title: cleanTitle.toUpperCase(),
    category: category.name,
    categorySlug: category.slug,
    thumbnail: post.thumbnail_url || post.media_url,
    videoUrl: post.media_url,
    sourceUrl: post.permalink,
    platform: post.platform || 'instagram',
    year,
    description: post.caption.replace(/#\w+/g, '').trim(),
    featured: false,
    aspect: '9:16',
    tags: tags.length > 0 ? tags : ['#reels', '#cinematic'],
    metrics: {
      views: formatCount(post.views_count) || '250K',
      likes: formatCount(post.like_count) || '24K',
      shares: '2.5K'
    }
  };
}
