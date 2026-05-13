import Image from 'next/image'
import Link from 'next/link'
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

function PaymentIcon({ label, children, bg = '#ffffff' }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="inline-flex items-center justify-center w-10 h-6 md:w-11 md:h-7 rounded-[3px] border border-white/30"
      style={{ background: bg }}
    >
      {children}
    </span>
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

  return (
    <footer className="bg-navy text-white pt-10 md:pt-14 pb-6 md:pb-7 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8 md:mb-10">
          <Link href="/" aria-label="Sanji's Label home">
            <Image
              src="/images/boutique-logo-bw.png"
              alt="Sanji's Label"
              width={120}
              height={120}
              className="object-contain w-[80px] md:w-[110px] h-auto"
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-10">
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
              Payment Methods
            </h3>
            <div className="grid grid-cols-2 gap-2 max-w-[140px] mb-5 md:mb-6">
              <PaymentIcon label="American Express" bg="#2e77bb">
                <span
                  className="text-white font-bold tracking-tight"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '7.5px' }}
                >
                  AMEX
                </span>
              </PaymentIcon>
              <PaymentIcon label="Klarna" bg="#ffa8cd">
                <span
                  className="text-black font-bold tracking-tight"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '8px' }}
                >
                  Klarna.
                </span>
              </PaymentIcon>
              <PaymentIcon label="Visa" bg="#1a1f71">
                <span
                  className="text-white font-bold italic tracking-tight"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '9px' }}
                >
                  VISA
                </span>
              </PaymentIcon>
              <PaymentIcon label="Apple Pay" bg="#000000">
                <span
                  className="text-white font-bold tracking-tight flex items-center gap-0.5"
                  style={{ fontFamily: '-apple-system, system-ui, sans-serif', fontSize: '8px' }}
                >
                  <svg width="7" height="9" viewBox="0 0 16 20" fill="currentColor" aria-hidden>
                    <path d="M13.6 10.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.9-.9-3.1-.9-1.6 0-3.1 1-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.7 2.5 2.9 2.4 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.2 2.8-2.4c.9-1.4 1.2-2.7 1.3-2.8-.1 0-2.4-.9-2.4-3.6zM11.4 4c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.6-.9 2.6 1 .1 2-.5 2.6-1.2z"/>
                  </svg>
                  Pay
                </span>
              </PaymentIcon>
              <PaymentIcon label="Mastercard" bg="#ffffff">
                <span className="relative inline-block w-7 h-4">
                  <span
                    className="absolute left-0 top-0 w-4 h-4 rounded-full"
                    style={{ background: '#eb001b' }}
                  />
                  <span
                    className="absolute right-0 top-0 w-4 h-4 rounded-full mix-blend-multiply"
                    style={{ background: '#f79e1b' }}
                  />
                </span>
              </PaymentIcon>
              <PaymentIcon label="Discover" bg="#ffffff">
                <span className="flex items-center gap-0.5">
                  <span
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '7px', color: '#231f20', fontWeight: 700 }}
                  >
                    DISC
                  </span>
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: '#ff6000' }}
                  />
                </span>
              </PaymentIcon>
            </div>
            <h3 className="font-cardo font-bold text-base md:text-lg mb-3 md:mb-4">
              Shop Hours
            </h3>
            <ul className="flex flex-col gap-1.5 md:gap-2">
              {hourRows.map((row) => (
                <HoursRow key={`${row.label}-${row.time}`} label={row.label} time={row.time} />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-cardo font-bold text-base md:text-lg mb-3 md:mb-4">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-1.5 md:gap-2 font-cardo text-sm md:text-[15px] text-white/85 mb-5 md:mb-6">
              <li>
                <span className="block">Phone:</span>
                <span className="block">{tel}</span>
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
                <Link
                  href="#contact"
                  className="hover:text-white hover:underline underline-offset-2 transition-colors"
                >
                  Request Shop Address
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-3 md:gap-4">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/social-instagram.png"
                  alt=""
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/social-facebook.png"
                  alt=""
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </a>
              <a
                href="#whatsapp"
                aria-label="WhatsApp"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/social-whatsapp.png"
                  alt=""
                  width={22}
                  height={22}
                  className="object-contain"
                />
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
