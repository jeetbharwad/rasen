import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display,Bodoni_Moda, Great_Vibes, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const bodoni = Bodoni_Moda({ 
  subsets: ['latin'],
  variable: '--font-serif',
});

const scriptFont = Great_Vibes({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
});
export const metadata: Metadata = {
  title: "Rasen — Your words, powered with voice and feeling",
  description:
    "Rasen is an AI that speaks with emotion, turning your words into voice and feeling.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${bodoni.variable} ${scriptFont.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
