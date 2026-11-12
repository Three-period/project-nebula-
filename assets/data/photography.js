// Photography content schema. Actual photos are added only after ownership and labels are confirmed.
export const photographyThemes = [
  { id: 'nature', folder: 'nature', photos: [] },
  { id: 'architecture', folder: 'architecture', photos: [] },
  { id: 'travel', folder: 'travel', photos: [] },
  { id: 'details', folder: 'details', photos: [] }
];

export function findPhotographyTheme(id) {
  return photographyThemes.find(theme => theme.id === id) ?? null;
}
