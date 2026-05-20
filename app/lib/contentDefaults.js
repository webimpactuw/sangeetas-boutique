/** Defaults when Sanity has no document or empty fields. */

export const DEFAULT_HERO_SLIDES = [
  {
    title: 'Spring Saris',
    cta: 'SHOP NOW',
    href: '#saris',
    image: '/images/hero-main.png',
    alt: 'Spring Saris collection',
  },
  {
    title: 'New Lehengas',
    cta: 'SHOP NOW',
    href: '#lehengas',
    image: '/images/product-lehenga.png',
    alt: 'Lehenga collection',
  },
  {
    title: 'Dresses for Every Occasion',
    cta: 'SHOP NOW',
    href: '#dresses',
    image: '/images/product-dress.png',
    alt: 'Dresses collection',
  },
]

export const DEFAULT_SHOP_CATEGORIES = [
  { name: 'Lehengas', image: '/images/product-lehenga.png', href: '/apparel?category=lehengas' },
  { name: 'Dresses', image: '/images/product-dress.png', href: '/apparel?category=dresses' },
  { name: 'Jewelry', image: '/images/product-sari.png', href: '/accessories?category=jewelry' },
  { name: 'Kids Wear', image: '/images/product-kurta.png', href: '/apparel?category=kids' },
]

export const DEFAULT_ELEGANCE = {
  words: ['ELEGANCE', 'BEAUTY', 'TRADITION'],
  tagline:
    "Indulge in an experience of elegance where you choose Sanji's Label, " +
    'an exclusive designer-wear brand in the Seattle area.',
}

export const DEFAULT_CRAFTSMANSHIP = {
  heading: 'CRAFTSMANSHIP',
  body:
    "Every piece from Sanji's is handcrafted with the same care, precision, " +
    'and appreciation for detail. Our apparel is made from real silk and ' +
    'thoughtfully designed to reflect true craftsmanship and quality.',
  ctaLabel: 'Explore Gallery',
  ctaHref: '/gallery',
  image: '/images/product-sari.png',
  imageAlt: 'Handcrafted sari embroidery work',
}

export const DEFAULT_REVIEWS = {
  heading: 'Customer Reviews',
  intro:
    "See what our customers are saying. Read real reviews from our community " +
    "on Facebook and discover why people love Sanji's.",
  items: [
    {
      name: 'Seema Jain',
      quote:
        'I recently purchased a lehenga from Sanji. She was amazing to work with. She has a beautiful collection and was very helpful in selecting what was right for me.',
    },
    {
      name: 'Vishal Habib',
      quote:
        'The collection is fabulous, every dress in the boutique has its touch of elegance. Highly recommend.',
    },
    {
      name: 'Soujanya Vemuri',
      quote:
        'Sangeeta has a very delightful and unique collection of Indian wear for all. She is also very diligent about helping you style your costumes with the right accessories and is your personal stylist!',
    },
  ],
}

export const DEFAULT_EXPLORE_JEWELRY = {
  heading: 'Explore Jewelry',
  body:
    'Explore a curated collection of unique jewelry designed to stand out ' +
    'and elevate any look. Each design reflects elegance and individuality, ' +
    'creating pieces that are sure to be the talk of any event.',
  ctaLabel: 'Shop Now',
  ctaHref: '/accessories?category=jewelry',
  images: ['/images/product-sari.png', '/images/product-lehenga.png', '/images/product-dress.png'],
}

export const DEFAULT_TOP_BANNER = {
  prefix: 'Get 25% off when you use code:',
  promoCode: 'SANJI30',
}

export const DEFAULT_SITE_META = {
  title: "Sangeeta's Boutique",
  description: 'Elegance · Beauty · Tradition',
}

export const DEFAULT_FOOTER_CONTACT = {
  phone: '425-862-8572',
  email: 'Sanji@gmail.com',
  hours: [
    { label: 'Mon – Fri', time: '9AM – 8PM' },
    { label: 'Sat, Sun', time: '10AM – 9PM' },
  ],
  copyright: "© 2026 Sanji's Label",
}

export const DEFAULT_HELP = {
  title: 'Need Help?',
  ctaLabel: 'Contact Sanji',
  email: 'Sanji@gmail.com',
}

/** Footer column — edit in Site settings in Sanity. */
export const DEFAULT_FOOTER_QUICK_LINKS = [
  { label: 'Apparel', href: '/apparel' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Booking', href: '/booking' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About Sanji\u2019s', href: '/about' },
]

export const DEFAULT_FOOTER_POLICIES = [
  { label: 'Return Policy', href: '/policies/returns' },
  { label: 'Shipping Policy', href: '/policies/shipping' },
  { label: 'Tailoring Policy', href: '/policies/tailoring' },
]

/** Desktop nav line under the top bar. */
export const DEFAULT_NAVBAR_SHIP_TO = 'Ship To: Issaquah, WA'

/**
 * Plain defaults for Sanity Studio initial values & seed (same copy as the live site).
 * Image slots stay empty in Studio until upload — site falls back to public/images.
 */
export function getSanitySiteSettingsInitialValue() {
  return {
    topBannerPrefix: DEFAULT_TOP_BANNER.prefix,
    promoCode: DEFAULT_TOP_BANNER.promoCode,
    siteTitle: DEFAULT_SITE_META.title,
    siteDescription: DEFAULT_SITE_META.description,
    footerPhone: DEFAULT_FOOTER_CONTACT.phone,
    footerEmail: DEFAULT_FOOTER_CONTACT.email,
    footerHours: [
      { _key: 'def-h1', label: DEFAULT_FOOTER_CONTACT.hours[0].label, time: DEFAULT_FOOTER_CONTACT.hours[0].time },
      { _key: 'def-h2', label: DEFAULT_FOOTER_CONTACT.hours[1].label, time: DEFAULT_FOOTER_CONTACT.hours[1].time },
    ],
    copyrightLine: DEFAULT_FOOTER_CONTACT.copyright,
    helpTitle: DEFAULT_HELP.title,
    helpCtaLabel: DEFAULT_HELP.ctaLabel,
    helpEmail: DEFAULT_HELP.email,
    footerQuickLinks: DEFAULT_FOOTER_QUICK_LINKS.map((l, i) => ({
      _key: `ql-${i}`,
      label: l.label,
      href: l.href,
    })),
    footerPolicies: DEFAULT_FOOTER_POLICIES.map((l, i) => ({
      _key: `pl-${i}`,
      label: l.label,
      href: l.href,
    })),
    navbarShipToLine: DEFAULT_NAVBAR_SHIP_TO,
  }
}

export function getSanityHomePageInitialValue() {
  const slides = DEFAULT_HERO_SLIDES.map((s, i) => ({
    _key: `hero-${i}`,
    title: s.title,
    cta: s.cta,
    href: s.href,
  }))
  const cats = DEFAULT_SHOP_CATEGORIES.map((c, i) => ({
    _key: `cat-${i}`,
    name: c.name,
    href: c.href,
  }))
  return {
    heroSlides: slides,
    shopHeading: 'SHOP BY CATEGORY',
    shopCategories: cats,
    eleganceWords: [...DEFAULT_ELEGANCE.words],
    eleganceTagline: DEFAULT_ELEGANCE.tagline,
    craftsmanshipHeading: DEFAULT_CRAFTSMANSHIP.heading,
    craftsmanshipBody: DEFAULT_CRAFTSMANSHIP.body,
    craftsmanshipCtaLabel: DEFAULT_CRAFTSMANSHIP.ctaLabel,
    craftsmanshipCtaHref: DEFAULT_CRAFTSMANSHIP.ctaHref,
    reviewsHeading: DEFAULT_REVIEWS.heading,
    reviewsIntro: DEFAULT_REVIEWS.intro,
    reviews: DEFAULT_REVIEWS.items.map((r, i) => ({
      _key: `rev-${i}`,
      name: r.name,
      quote: r.quote,
    })),
    exploreHeading: DEFAULT_EXPLORE_JEWELRY.heading,
    exploreBody: DEFAULT_EXPLORE_JEWELRY.body,
    exploreCtaLabel: DEFAULT_EXPLORE_JEWELRY.ctaLabel,
    exploreCtaHref: DEFAULT_EXPLORE_JEWELRY.ctaHref,
  }
}
