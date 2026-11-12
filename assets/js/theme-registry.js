// Metadata only: planned themes have no stylesheet, UI entry, or active implementation.
export const themeRegistry = Object.freeze({
  landscape: Object.freeze({
    id: 'landscape',
    name: '景观白绿',
    nameEn: 'Landscape White & Green',
    stylesheet: 'assets/css/themes/landscape.css',
    preview: { page: '#FFFFFF', surface: '#F5F8F6', accent: '#285C43', line: '#B9CCBE', motif: 'architecture' },
    status: 'active'
  }),
  cosmic: Object.freeze({ id: 'cosmic', name: '神秘宇宙', nameEn: 'Mystical Cosmic', stylesheet: null, status: 'planned', preview: { page: '#F3F1EE', surface: '#FAF9F6', accent: '#77522E', line: '#DCC8A5', motif: 'celestial' } }),
  littlePrince: Object.freeze({ id: 'littlePrince', name: '小王子', nameEn: 'Little Prince', stylesheet: null, status: 'planned', preview: { page: '#FFF9EF', surface: '#FFFCF7', accent: '#79503B', line: '#DDECF8', motif: 'story' } }),
  smokyLavender: Object.freeze({ id: 'smokyLavender', name: '冷调烟紫', nameEn: 'Smoky Lavender', stylesheet: null, status: 'planned', preview: { page: '#F8F6FA', surface: '#FEFDFF', accent: '#5E4B72', line: '#B7AABD', motif: 'editorial' } })
});

export const availableThemes = () => Object.values(themeRegistry).filter(theme => theme.status === 'active' && theme.stylesheet);
