import { Geist, Geist_Mono, Playwrite_HU } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Footer } from '@/components/navigations/Footer';
import { Navbar } from '@/components/navigations/Navbar';
import ClientLayout from './client-layout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  //passed this variables to all body to use it across all components
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
const playwrite = Playwrite_HU({
  //passed this variables to all body to use it across all components
  variable: '--font-playwrite',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playwrite.variable} antialiased flex flex-col min-h-screen  `}
      >
        <Toaster />
        <ClientLayout>
          <Navbar />
          <main className='flex-grow pt-32 pb-24 bg-[var(--background)] '>
            {children}
          </main>
        </ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
