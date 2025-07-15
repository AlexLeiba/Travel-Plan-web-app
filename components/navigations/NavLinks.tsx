'use client';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utilities';
// import { signIn } from 'next-auth/react';
// import { signIn } from '@/auth';
import { signIn, signOut, useSession } from 'next-auth/react';

const links = [
  { name: 'Home', href: '/' },
  { name: 'My trips', href: '/my-trips' },
  { name: 'Globe', href: '/globe' },
];
export function NavLinks() {
  const pathname = usePathname();

  const { data: session } = useSession(); //getSession in async function to get session

  return (
    <div className='flex gap-8 items-center'>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              pathname === link.href ? 'text-green-600' : 'hover:text-green-600'
            )}
          >
            {link.name}
          </Link>
        );
      })}
      {session?.user?.email ? (
        <button
          className='flex bg-black text-white rounded-full px-4 items-center gap-2 cursor-pointer hover:opacity-80'
          onClick={() => signOut()}
        >
          <Github size={18} color='white' />
          <p>Sign out</p>
        </button>
      ) : (
        <button
          className='flex bg-black text-white rounded-full px-4 items-center gap-2 cursor-pointer hover:opacity-80'
          onClick={() => signIn()}
        >
          <Github size={18} color='white' />
          <p>Sign in</p>
        </button>
      )}
    </div>
  );
}
