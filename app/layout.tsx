import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Raj Delight Menu | Chandausi',
  description: 'Complete vegetarian menu of Raj Delight, Chandausi.',
  keywords: ['Raj Delight', 'Raj Delight Menu', 'Chandausi', 'vegetarian restaurant menu'],
  icons: {
    icon: 'https://raj-delight-three.vercel.app/grok_1789624913553.jpg',
    apple: 'https://raj-delight-three.vercel.app/grok_1789624913553.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

