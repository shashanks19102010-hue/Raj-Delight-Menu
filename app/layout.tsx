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

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
