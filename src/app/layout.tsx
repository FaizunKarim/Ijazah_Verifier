import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ijazah Verifier - Verifikasi Keaslian Ijazah On-Chain BOT Chain',
  description:
    'Platform verifikasi keaslian ijazah berbasis blockchain BOT Chain (EVM). Cepat, transparan, permanen, dan dapat diverifikasi oleh publik tanpa wallet.',
  keywords: ['ijazah verifier', 'bot chain', 'blockchain education', 'verifikasi ijazah', 'smart contract'],
  icons: {
    icon: '/jokowi.webp',
    shortcut: '/jokowi.webp',
    apple: '/jokowi.webp',
  },
  openGraph: {
    title: 'Ijazah Verifier - Verifikasi Keaslian Ijazah On-Chain',
    description:
      'Verifikasi data ijazah secara transparan & instan yang diterbitkan langsung di BOT Chain Smart Contract.',
    url: 'https://ijazah-verifier.vercel.app/',
    siteName: 'Ijazah Verifier',
    images: [
      {
        url: '/jokowi.webp',
        width: 800,
        height: 800,
        alt: 'Ijazah Verifier Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ijazah Verifier - Verifikasi Keaslian Ijazah On-Chain',
    description:
      'Verifikasi data ijazah secara transparan & instan yang diterbitkan langsung di BOT Chain Smart Contract.',
    images: ['/jokowi.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-slate-50 flex flex-col justify-between`}>
        {children}
      </body>
    </html>
  );
}
