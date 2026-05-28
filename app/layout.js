import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import TopBanner from "./components/TopBanner";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import HelpButtonwrapper from './components/HelpButtonwrapper'
import CartProvider from "./components/CartProvider";
import FavoritesProvider from "./components/FavoritesProvider";
import { serializeAuthUser } from "./lib/auth/user";
import { getFavoriteProductIds } from "./lib/favoritesDb";
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
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
  };
}

export default async function RootLayout({ children }) {
  const [raw, supabase] = await Promise.all([getSiteSettings(), createClient()]);
  const s = mapSiteSettings(raw);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUser = serializeAuthUser(user);
  const favoriteIds = user ? await getFavoriteProductIds(user.id) : [];

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white`}
      >
        <FavoritesProvider
          key={authUser?.id ?? "guest"}
          userId={authUser?.id ?? null}
          initialFavoriteIds={favoriteIds}
        >
          <CartProvider userId={authUser?.id ?? null}>
            <TopBanner prefix={s.topBannerPrefix} promoCode={s.promoCode} />
            <Suspense
              fallback={
                <div className="bg-white border-b border-navy/10 min-h-[52px] md:min-h-[120px]" />
              }
            >
              <Navbar authUser={authUser} />
            </Suspense>
            <div className="flex-1">{children}</div>
            <Footer
              phone={s.footerPhone}
              email={s.footerEmail}
              hours={s.footerHours}
              copyrightLine={s.copyrightLine}
              quickLinks={s.footerQuickLinks}
              policies={s.footerPolicies}
            />
            <HelpButtonwrapper
              title={s.helpTitle}
              ctaLabel={s.helpCtaLabel}
              email={s.helpEmail}
            />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
