import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PROFEX - Trading Platform',
  description: 'Next-Generation Trading Terminal and Startup Onboarding Flow.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-full h-full min-h-screen relative flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
