'use client';
// import type { Metadata } from 'next';
import { Navbar } from '../../components/navigations/Navbar';
import { Footer } from '@/components/navigations/Footer';
import { SessionProvider } from 'next-auth/react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <Navbar />

        <main className='flex-grow pt-32 pb-24 bg-[var(--background)] '>
          {children}
        </main>

        <Footer />
      </SessionProvider>
    </>
  );
}
