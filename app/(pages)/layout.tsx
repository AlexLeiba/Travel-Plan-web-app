'use client';
// import type { Metadata } from 'next';
import { Navbar } from '../../components/navigations/Navbar';
import { Footer } from '@/components/navigations/Footer';
import { SessionProvider } from 'next-auth/react';
// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

// export const metadata: Metadata = {
//   title: 'Travel-Plan',
//   description: 'Traveling planner to mark your trips',
// };

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <Navbar />

        <main className='flex-grow mt-32 mb-24'>{children}</main>

        <Footer />
      </SessionProvider>
    </>
  );
}
