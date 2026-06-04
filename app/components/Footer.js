import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/images/brand-logo-small.png'
import {
  DEFAULT_FOOTER_CONTACT,
  DEFAULT_FOOTER_POLICIES,
  DEFAULT_FOOTER_QUICK_LINKS,
} from '../lib/contentDefaults'

function HoursRow({ label, time }) {
  return (
    <li className="flex items-baseline gap-1.5 font-cardo text-sm md:text-[15px] text-white/85">
      <span className="whitespace-nowrap">{label}</span>
      <span
        aria-hidden
        className="flex-1 border-b border-dotted border-white/40 translate-y-[-3px]"
      />
      <span className="whitespace-nowrap">{time}</span>
    </li>
  )
}

/**
 * @param {{
 *   phone?: string
 *   email?: string
 *   hours?: Array<{ label: string; time: string }>
 *   copyrightLine?: string
 *   quickLinks?: Array<{ label: string; href: string }>
 *   policies?: Array<{ label: string; href: string }>
 * }} props
 */
export default function Footer({
  phone,
  email,
  hours,
  copyrightLine,
  quickLinks,
  policies,
}) {
  const tel = phone?.trim() || DEFAULT_FOOTER_CONTACT.phone
  const em = email?.trim() || DEFAULT_FOOTER_CONTACT.email
  const hourRows = hours?.length ? hours : DEFAULT_FOOTER_CONTACT.hours
  const copy = copyrightLine?.trim() || DEFAULT_FOOTER_CONTACT.copyright
  const ql = quickLinks?.length ? quickLinks : DEFAULT_FOOTER_QUICK_LINKS
  const pol = policies?.length ? policies : DEFAULT_FOOTER_POLICIES
  const telHref = `tel:+1${tel.replace(/\D/g, '')}`

  return (
    <footer className="bg-navy text-white pt-10 md:pt-14 pb-6 md:pb-7 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-10 md:mb-12">
          <Link href="/" aria-label="Sanji's Label home" className="flex flex-col items-center gap-2">
            <Image
              src={logo}
              alt=""
              width={160}
              height={160}
              className="object-contain w-[96px] md:w-[128px] h-auto mix-blend-screen"
              priority={false}
            />
            <div className="text-center">
              <p className="font-cardo font-bold tracking-[0.16em] text-sm md:text-base uppercase">
                Sanji&apos;s
              </p>
              <p className="font-cardo italic text-xl md:text-2xl leading-none -mt-0.5">Label</p>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 md:gap-x-10 lg:gap-x-16 xl:gap-x-20 mb-8 md:mb-10">
          <div>
            <h3 className="font-cardo font-bold text-base md:text-lg mb-3 md:mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-1.5 md:gap-2 font-cardo text-sm md:text-[15px] text-white/85">
              {ql.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:underline underline-offset-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-cardo font-bold text-base md:text-lg mb-3 md:mb-4">
              Policies
            </h3>
            <ul className="flex flex-col gap-1.5 md:gap-2 font-cardo text-sm md:text-[15px] text-white/85">
              {pol.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:underline underline-offset-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-cardo font-bold text-base md:text-lg mb-3 md:mb-4">
              Shop Hours
            </h3>
            <ul className="flex flex-col gap-1.5 md:gap-2 mb-3">
              {hourRows.map((row) => (
                <HoursRow key={`${row.label}-${row.time}`} label={row.label} time={row.time} />
              ))}
            </ul>
            <p className="font-cardo italic text-white/60 text-xs md:text-sm leading-relaxed">
              {DEFAULT_FOOTER_CONTACT.hoursNote}
            </p>
          </div>

          <div>
            <h3 className="font-cardo font-bold text-base md:text-lg mb-3 md:mb-4">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-1.5 md:gap-2 font-cardo text-sm md:text-[15px] text-white/85 mb-5 md:mb-6">
              <li>
                <span className="block">Phone:</span>
                <a
                  href={telHref}
                  className="block hover:text-white hover:underline underline-offset-2 transition-colors"
                >
                  {tel}
                </a>
              </li>
              <li>
                <span className="block">Email:</span>
                <a
                  href={`mailto:${em}`}
                  className="block hover:text-white hover:underline underline-offset-2 transition-colors"
                >
                  {em}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${em}?subject=${encodeURIComponent('Shop address request')}`}
                  className="hover:text-white hover:underline underline-offset-2 transition-colors"
                >
                  {DEFAULT_FOOTER_CONTACT.shopAddressLabel}
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-3 md:gap-4">
              <a href="#instagram" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <Image src="/images/social-instagram.png" alt="" width={22} height={22} className="object-contain" />
              </a>
              <a href="#facebook" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                <Image src="/images/social-facebook.png" alt="" width={22} height={22} className="object-contain" />
              </a>
              <a href="#whatsapp" aria-label="WhatsApp" className="hover:opacity-80 transition-opacity">
                <Image src="/images/social-whatsapp.png" alt="" width={22} height={22} className="object-contain" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-4 md:pt-5">
          <p className="font-cardo italic text-white/60 text-xs md:text-sm text-center">
            {copy}
          </p>
        </div>
      </div>
    </footer>
  )
}
