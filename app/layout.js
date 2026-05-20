import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBanner from "./components/TopBanner";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import HelpButton from "./components/HelpButton";
import { serializeAuthUser } from "./lib/auth/user";
import { mapSiteSettings } from "./lib/mapSanityContent";
import { createClient } from "./lib/supabase/server";
import { getSiteSettings } from "../sanity/lib/fetchPublicContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const revalidate = 60;

export async function generateMetadata() {
  const raw = await getSiteSettings();
  const s = mapSiteSettings(raw);
  return {
    title: s.siteTitle,
    description: s.siteDescription,
  };
}

export default async function RootLayout({ children }) {
  const [raw, supabase] = await Promise.all([getSiteSettings(), createClient()]);
  const s = mapSiteSettings(raw);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUser = serializeAuthUser(user);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
        <link rel="icon" href="/images/brand-logo-small.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white`}
      >
        <TopBanner prefix={s.topBannerPrefix} promoCode={s.promoCode} />
        <Navbar shipToLine={s.navbarShipToLine} authUser={authUser} />
        <div className="flex-1">{children}</div>
        <Footer
          phone={s.footerPhone}
          email={s.footerEmail}
          hours={s.footerHours}
          copyrightLine={s.copyrightLine}
          quickLinks={s.footerQuickLinks}
          policies={s.footerPolicies}
        />
        <HelpButton
          title={s.helpTitle}
          ctaLabel={s.helpCtaLabel}
          email={s.helpEmail}
        />
      </body>
    </html>
  );
}
