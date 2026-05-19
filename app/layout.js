import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBanner from "./components/TopBanner";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import HelpButton from "./components/HelpButton";
import CartProvider from "./components/CartProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sangeeta's Boutique",
  description: "Elegance · Beauty · Tradition",
};

export default function RootLayout({ children }) {
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
        <CartProvider>
          <TopBanner />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <HelpButton />
        </CartProvider>
      </body>
    </html>
  );
}
