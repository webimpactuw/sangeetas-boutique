import { urlForImage } from '../../sanity/lib/image'
import {
  DEFAULT_CRAFTSMANSHIP,
  DEFAULT_ELEGANCE,
  DEFAULT_EXPLORE_JEWELRY,
  DEFAULT_FOOTER_CONTACT,
  DEFAULT_FOOTER_POLICIES,
  DEFAULT_FOOTER_QUICK_LINKS,
  DEFAULT_HELP,
  DEFAULT_HERO_SLIDES,
  DEFAULT_NAVBAR_SHIP_TO,
  DEFAULT_REVIEWS,
  DEFAULT_SHOP_CATEGORIES,
  DEFAULT_SITE_META,
  DEFAULT_TOP_BANNER,
} from './contentDefaults'

function imageUrl(img, width = 2000) {
  if (!img?.asset) return null
  return urlForImage(img).width(width).quality(85).auto('format').url()
}

/**
 * @param {import('@sanity/client').SanityDocument | null} raw
 */
export function mapSiteSettings(raw) {
  const hours =
    raw?.footerHours?.filter((r) => r?.label && r?.time) ?? DEFAULT_FOOTER_CONTACT.hours

  const quick =
    raw?.footerQuickLinks?.filter((l) => l?.label?.trim() && l?.href?.trim()) ?? []
  const pol =
    raw?.footerPolicies?.filter((l) => l?.label?.trim() && l?.href?.trim()) ?? []

  return {
    siteTitle: raw?.siteTitle?.trim() || DEFAULT_SITE_META.title,
    siteDescription: raw?.siteDescription?.trim() || DEFAULT_SITE_META.description,
    topBannerPrefix: raw?.topBannerPrefix?.trim() || DEFAULT_TOP_BANNER.prefix,
    promoCode: raw?.promoCode?.trim() || DEFAULT_TOP_BANNER.promoCode,
    footerPhone: raw?.footerPhone?.trim() || DEFAULT_FOOTER_CONTACT.phone,
    footerEmail: raw?.footerEmail?.trim() || DEFAULT_FOOTER_CONTACT.email,
    copyrightLine: raw?.copyrightLine?.trim() || DEFAULT_FOOTER_CONTACT.copyright,
    helpTitle: raw?.helpTitle?.trim() || DEFAULT_HELP.title,
    helpCtaLabel: raw?.helpCtaLabel?.trim() || DEFAULT_HELP.ctaLabel,
    helpEmail: raw?.helpEmail?.trim() || DEFAULT_HELP.email,
    footerHours: hours.length ? hours : DEFAULT_FOOTER_CONTACT.hours,
    footerQuickLinks: quick.length ? quick : DEFAULT_FOOTER_QUICK_LINKS,
    footerPolicies: pol.length ? pol : DEFAULT_FOOTER_POLICIES,
    navbarShipToLine: raw?.navbarShipToLine?.trim() || DEFAULT_NAVBAR_SHIP_TO,
  }
}

/**
 * @param {import('@sanity/client').SanityDocument | null} home
 */
export function mapHomePage(home) {
  if (!home) {
    return {
      heroSlides: DEFAULT_HERO_SLIDES,
      shopHeading: 'SHOP BY CATEGORY',
      shopCategories: DEFAULT_SHOP_CATEGORIES,
      elegance: DEFAULT_ELEGANCE,
      craftsmanship: DEFAULT_CRAFTSMANSHIP,
      reviews: DEFAULT_REVIEWS,
      exploreJewelry: DEFAULT_EXPLORE_JEWELRY,
    }
  }

  const heroSlides = (home.heroSlides ?? [])
    .map((s, i) => {
      const image = imageUrl(s.photo) ?? null
      if (!image) return null
      return {
        title: s.title,
        cta: s.cta?.trim() || 'SHOP NOW',
        href: s.href?.trim() || '/',
        image,
        alt: (s.photo?.alt ?? s.title ?? `Slide ${i + 1}`).toString(),
      }
    })
    .filter(Boolean)

  const shopCategories = (home.shopCategories ?? [])
    .map((c, i) => {
      const image = imageUrl(c.photo, 900) ?? null
      if (!image || !c.name) return null
      return {
        name: c.name,
        href: c.href?.trim() || '/apparel',
        image,
        alt: (c.photo?.alt ?? c.name ?? `Category ${i + 1}`).toString(),
      }
    })
    .filter(Boolean)

  const fromArray = (home.eleganceWords ?? [])
    .map((w) => (typeof w === 'string' ? w : String(w ?? '')).trim())
    .filter(Boolean)
  const elegance = {
    words:
      fromArray.length === 3
        ? fromArray
        : DEFAULT_ELEGANCE.words,
    tagline: home.eleganceTagline?.trim() || DEFAULT_ELEGANCE.tagline,
  }

  const craftImg = imageUrl(home.craftsmanshipPhoto, 1600)
  const craftsmanship = {
    heading: home.craftsmanshipHeading?.trim() || DEFAULT_CRAFTSMANSHIP.heading,
    body: home.craftsmanshipBody?.trim() || DEFAULT_CRAFTSMANSHIP.body,
    ctaLabel: home.craftsmanshipCtaLabel?.trim() || DEFAULT_CRAFTSMANSHIP.ctaLabel,
    ctaHref: home.craftsmanshipCtaHref?.trim() || DEFAULT_CRAFTSMANSHIP.ctaHref,
    image: craftImg || DEFAULT_CRAFTSMANSHIP.image,
    imageAlt:
      home.craftsmanshipPhoto?.alt?.trim() ||
      DEFAULT_CRAFTSMANSHIP.imageAlt,
  }

  const reviewItems = (home.reviews ?? [])
    .map((r) => {
      if (!r?.name || !r?.quote) return null
      return { name: r.name, quote: r.quote.trim() }
    })
    .filter(Boolean)

  const reviews = {
    heading: home.reviewsHeading?.trim() || DEFAULT_REVIEWS.heading,
    intro: home.reviewsIntro?.trim() || DEFAULT_REVIEWS.intro,
    items: reviewItems.length >= 1 ? reviewItems : DEFAULT_REVIEWS.items,
  }

  const exploreImages = (home.explorePhotos ?? [])
    .map((ph, i) => imageUrl(ph, 1200) || null)
    .filter(Boolean)

  const exploreJewelry = {
    heading: home.exploreHeading?.trim() || DEFAULT_EXPLORE_JEWELRY.heading,
    body: home.exploreBody?.trim() || DEFAULT_EXPLORE_JEWELRY.body,
    ctaLabel: home.exploreCtaLabel?.trim() || DEFAULT_EXPLORE_JEWELRY.ctaLabel,
    ctaHref: home.exploreCtaHref?.trim() || DEFAULT_EXPLORE_JEWELRY.ctaHref,
    images:
      exploreImages.length > 0 ? exploreImages : DEFAULT_EXPLORE_JEWELRY.images,
  }

  return {
    heroSlides: heroSlides.length ? heroSlides : DEFAULT_HERO_SLIDES,
    shopHeading: home.shopHeading?.trim() || 'SHOP BY CATEGORY',
    shopCategories: shopCategories.length ? shopCategories : DEFAULT_SHOP_CATEGORIES,
    elegance,
    craftsmanship,
    reviews,
    exploreJewelry,
  }
}
