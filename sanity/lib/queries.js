import { defineQuery } from 'next-sanity'

/** Fixed ids — match `npm run sanity:seed` and the Studio sidebar. */
export const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  siteTitle,
  siteDescription,
  topBannerPrefix,
  promoCode,
  footerPhone,
  footerEmail,
  copyrightLine,
  helpTitle,
  helpCtaLabel,
  helpEmail,
  navbarShipToLine,
  footerHours[]{ label, time },
  footerQuickLinks[]{ label, href },
  footerPolicies[]{ label, href }
}`)

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "homePage"][0]{
  shopHeading,
  eleganceWords,
  eleganceTagline,
  craftsmanshipHeading,
  craftsmanshipBody,
  craftsmanshipCtaLabel,
  craftsmanshipCtaHref,
  craftsmanshipPhoto,
  reviewsHeading,
  reviewsIntro,
  reviews[]{ name, quote },
  exploreHeading,
  exploreBody,
  exploreCtaLabel,
  exploreCtaHref,
  explorePhotos,
  heroSlides[]{ title, cta, href, photo },
  shopCategories[]{ name, href, photo }
}`)

export const PRODUCTS_QUERY = defineQuery(`*[_type == "product" && published != false] | order(name asc) {
  name,
  "slug": slug.current,
  department,
  category,
  price,
  published,
  description,
  fabric,
  colors,
  sizes,
  mainImage,
  gallery
}`)

export const GALLERY_PAGE_QUERY = defineQuery(`*[_id == "galleryPage"][0]{
  title,
  intro,
  photos
}`)
