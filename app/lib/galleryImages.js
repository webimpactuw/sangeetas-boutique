/** Total gallery images shipped in public/images/gallery (updated when new batches are added). */
export const GALLERY_IMAGE_COUNT = 41

export function galleryImagePath(index) {
  return `/images/gallery/photo-${String(index).padStart(2, '0')}.jpg`
}

/** All default gallery URLs (photo-01 … photo-N). */
export const ALL_GALLERY_PATHS = Array.from({ length: GALLERY_IMAGE_COUNT }, (_, i) =>
  galleryImagePath(i + 1),
)

/** Default gallery items for pages that fall back when Sanity has no images. */
export function getLocalGalleryImages() {
  return ALL_GALLERY_PATHS.map((src, i) => ({
    src,
    alt: `Gallery photo ${i + 1}`,
  }))
}

/** Pick paths for site sections (hero, categories, product placeholders). */
export function pickGalleryPaths(indices) {
  return indices.map((n) => galleryImagePath(n))
}
