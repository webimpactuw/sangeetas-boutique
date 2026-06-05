/** Defaults when Sanity has no document or empty fields. */

import { categoryImagePath } from './galleryPhotoMap.js'
import { galleryImagePath } from './galleryImages.js'

export const DEFAULT_HERO_SLIDES = [
  {
    title: 'Spring Saris',
    cta: 'SHOP NOW',
    href: '/apparel?category=sarees',
    image: galleryImagePath(22),
    alt: 'Spring Saris collection',
  },
  {
    title: 'New Lehengas',
    cta: 'SHOP NOW',
    href: '/apparel?category=lehengas',
    image: galleryImagePath(10),
    alt: 'Lehenga collection',
  },
  {
    title: 'Indo-Western Wear',
    cta: 'SHOP NOW',
    href: '/apparel?category=indo-western',
    image: galleryImagePath(21),
    alt: 'Indo-Western fusion wear',
  },
]

export const DEFAULT_SHOP_CATEGORIES = [
  { name: 'Lehengas', image: categoryImagePath('lehengas'), href: '/apparel?category=lehengas' },
  { name: 'Sarees', image: categoryImagePath('sarees'), href: '/apparel?category=sarees' },
  {
    name: 'Indo-Western Wear',
    image: categoryImagePath('indo-western'),
    href: '/apparel?category=indo-western',
  },
  {
    name: 'Readymade Sarees',
    image: categoryImagePath('readymade-sarees'),
    href: '/apparel?category=readymade-sarees',
  },
  { name: 'Jewelry', image: categoryImagePath('jewelry'), href: '/accessories?category=jewelry' },
]

export const NAV_APPAREL_LINKS = [
  { label: 'Lehengas', href: '/apparel?category=lehengas' },
  { label: 'Sarees', href: '/apparel?category=sarees' },
  { label: 'Indo-Western Wear', href: '/apparel?category=indo-western' },
  { label: 'Readymade Sarees', href: '/apparel?category=readymade-sarees' },
]

export const NAV_ACCESSORIES_LINKS = [
  { label: 'Jewelry', href: '/accessories?category=jewelry' },
  { label: 'Bags', href: '/accessories?category=bags' },
  { label: 'Watches', href: '/accessories?category=watches' },
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
  image: galleryImagePath(11),
  imageAlt: 'Handcrafted embroidery and boutique collection',
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
    {
      name: 'Shilpa Puranik',
      quote:
        "Sanji's label carries a great selection of clothing. I always find something special for every occasion.",
    },
    {
      name: 'Rinku Jain',
      quote:
        'Elegant collection at reasonable prices. Highly recommend for anyone looking for traditional wear.',
    },
    {
      name: 'Priya Sharma',
      quote:
        'Beautiful sarees and impeccable tailoring. Sanji listened to what I wanted and the final outfit was perfect for my event.',
    },
    {
      name: 'Anjali Mehta',
      quote:
        'From jewelry to lehengas, everything feels thoughtfully curated. Shopping here always feels personal and warm.',
    },
    {
      name: 'Neha Kapoor',
      quote:
        'I booked a styling session and left with pieces I would never have picked on my own — all stunning. Will definitely be back.',
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
  images: [
    galleryImagePath(34),
    galleryImagePath(36),
    galleryImagePath(38),
  ],
}

export const DEFAULT_TOP_BANNER = {
  prefix: 'Get 25% off when you use code:',
  promoCode: 'SANJI20',
}

export const DEFAULT_SITE_META = {
  title: "Sangeeta's Boutique",
  description: 'Elegance · Beauty · Tradition',
}

export const DEFAULT_FOOTER_CONTACT = {
  phone: '425-677-5848',
  email: 'sanjimunoth@gmail.com',
  hours: [
    { label: 'Mon – Fri', time: '10AM – 5PM' },
    { label: 'Sat – Sun', time: '10AM – 3PM' },
  ],
  hoursNote: 'Hours are subject to change, please contact to confirm.',
  copyright: "© 2026 Sanji's Label",
  shopAddressLabel: 'Request Shop Address',
}

export const DEFAULT_HELP = {
  title: 'Need Help?',
  ctaLabel: 'Contact Sanji',
  phone: '425-677-5848',
  email: 'sanjimunoth@gmail.com',
}

/** PayPal / Venmo QR on cart — Sanji's handle */
export const DEFAULT_PAYMENT_QR = {
  handle: '@sanji_1007',
  imageUrl: null,
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
  { label: 'Return Policy', href: '/about#faq-returns' },
  { label: 'Shipping Policy', href: '/about#faq-shipping' },
  { label: 'Tracking Policy', href: '/about#faq-tracking' },
  { label: 'Tailoring Policy', href: '/about#faq-tailoring' },
]

/** Legacy Sanity field — search replaced ship-to in the navbar. */
export const DEFAULT_NAVBAR_SHIP_TO = ''

export const DEFAULT_FAQ_ITEMS = [
  {
    id: 'buy',
    question: 'How do you buy items?',
    answer:
      'To make a purchase, add items to your bag and enter your contact information to submit a request form. Sanji will reach out to confirm your request within 3–5 business days. Once your order is approved, she will send payment instructions by email. You can also book an appointment for in-person styling.',
  },
  {
    id: 'shipping',
    question: 'What is your Shipping Policy?',
    questionLead: 'What is your',
    questionHighlight: 'Shipping Policy',
    answer:
      'We ship within the United States. Shipping cost and timing depend on your location and selections at checkout. Sanji will confirm details when she approves your order.',
  },
  {
    id: 'returns',
    question: 'What is your Return Policy?',
    questionLead: 'What is your',
    questionHighlight: 'Return Policy',
    answer:
      'Because many pieces are made-to-order or tailored, returns are handled case by case. Contact Sanji as soon as possible if something is not right.',
  },
  {
    id: 'tailoring',
    question: 'What is your Tailoring Policy?',
    questionLead: 'What is your',
    questionHighlight: 'Tailoring Policy',
    answer:
      'Alterations and custom tailoring may be available depending on the garment. Mention your needs when booking or in your order notes.',
  },
  {
    id: 'tracking',
    question: 'What is your Tracking Policy?',
    questionLead: 'What is your',
    questionHighlight: 'Tracking Policy',
    answer:
      'After your order ships, Sanji will share tracking information by email or phone. Reach out if you have questions about delivery status.',
  },
]

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
