'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utilities';
import { AuthButton } from '../ui/authButton';

const links = [
  // { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'My trips', href: '/my-trips' },
  { name: 'Globe', href: '/globe' },
];
export function NavLinks() {
  const pathname = usePathname();

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
      <AuthButton type='navBar' />
    </div>
  );
}
