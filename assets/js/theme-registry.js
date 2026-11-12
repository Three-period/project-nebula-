// Metadata only: planned themes have no stylesheet, UI entry, or active implementation.
export const themeRegistry = Object.freeze({
  landscape: Object.freeze({
    id: 'landscape',
    name: '景观白绿',
    nameEn: 'Landscape White & Green',
    stylesheet: 'assets/css/themes/landscape.css',
    status: 'active'
  }),
  cosmic: Object.freeze({ id: 'cosmic', name: '神秘宇宙', nameEn: 'Mystical Cosmic', stylesheet: null, status: 'planned' }),
  littlePrince: Object.freeze({ id: 'littlePrince', name: '小王子', nameEn: 'Little Prince', stylesheet: null, status: 'planned' }),
  smokyLavender: Object.freeze({ id: 'smokyLavender', name: '冷调烟紫', nameEn: 'Smoky Lavender', stylesheet: null, status: 'planned' })
});

export const availableThemes = () => Object.values(themeRegistry).filter(theme => theme.status === 'active' && theme.stylesheet);
