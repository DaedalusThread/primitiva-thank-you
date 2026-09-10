import type { Metadata } from 'next';
import { Geist, Cormorant_Garamond, Caveat } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thank-you.primitivaglobal.com'),
  title: 'One Year Together · Primitiva Global',
  description: 'A first-year anniversary letter from a small team with a big year.',
  openGraph: {
    title: 'One Year Together · Primitiva Global',
    description: 'A small team · A big year',
    images: [{ url: '/og.png', width: 1733, height: 908, alt: 'One Year Together — A small team, a big year' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One Year Together · Primitiva Global',
    description: 'A small team · A big year',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${cormorant.variable} ${caveat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
