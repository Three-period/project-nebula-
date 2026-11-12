import { findPhotographyTheme } from './photography.js';

// Themes are provisional categories, not claims that photos exist.
// Add each published photo's English title, alt, and description under photos[id].
export const photographyI18n = {
  zh: {
    themes: {
      nature: { title: '自然与植物', description: '以植物、自然肌理与季节变化为线索。' },
      architecture: { title: '城市与建筑', description: '从空间、尺度与城市日常中观察建筑。' },
      travel: { title: '旅行与风景', description: '记录途中所见的风景与片刻。' },
      details: { title: '光影与细节', description: '关注光、影与被忽略的微小细节。' }
    },
    photos: {}
  },
  en: {
    themes: {
      nature: { title: 'Nature & Botanicals', description: 'Observations of plants, textures, and seasonal change.' },
      architecture: { title: 'City & Architecture', description: 'Spaces, scale, and architectural moments in everyday life.' },
      travel: { title: 'Travel & Landscapes', description: 'Places and moments encountered along the way.' },
      details: { title: 'Light & Details', description: 'Light, shadow, and small overlooked details.' }
    },
    photos: {}
  }
};

export function getLocalizedPhotographyTheme(id, language = 'zh') {
  const theme = findPhotographyTheme(id);
  if (!theme) return null;
  const locale = photographyI18n[language] ? language : 'zh';
  const translated = photographyI18n[locale];
  const copy = translated.themes[id] ?? photographyI18n.zh.themes[id] ?? {};
  return {
    ...theme,
    title: copy.title ?? id,
    description: copy.description ?? '',
    photos: theme.photos.map(photo => ({
      ...photo,
      ...(translated.photos[photo.id] ?? {})
    }))
  };
}
