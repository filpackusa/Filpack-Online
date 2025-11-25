import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '../context/LanguageContext';

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://filpackonline.com'),
  title: {
    default: 'Filpack Online - Professional Food Packaging Solutions',
    template: '%s | Filpack Online',
  },
  description: 'America\'s trusted food packaging supplier. High-quality plastic containers, eco-friendly paper boxes, and comprehensive packaging solutions for the food industry.',
  keywords: [
    'food packaging',
    'plastic containers',
    'paper boxes',
    'food service packaging',
    'takeout containers',
    'disposable packaging',
    'eco-friendly packaging',
    'restaurant supplies',
    'food packaging USA',
    'wholesale packaging',
  ],
  authors: [{ name: 'Filpack Ambalaj San. Tic. Ltd. Şti.' }],
  creator: 'Filpack Online',
  publisher: 'Filpack Online',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://filpackonline.com',
    siteName: 'Filpack Online',
    title: 'Filpack Online - Professional Food Packaging Solutions',
    description: 'America\'s trusted food packaging supplier. High-quality plastic containers, eco-friendly paper boxes, and comprehensive packaging solutions.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Filpack Online Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Filpack Online - Professional Food Packaging Solutions',
    description: 'America\'s trusted food packaging supplier. High-quality plastic containers and eco-friendly paper boxes.',
    images: ['/logo.png'],
    creator: '@filpackonline',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-50/50 min-h-screen`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
