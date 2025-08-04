'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utilities';
import { AuthButton } from '../ui/authButton';
import { useState } from 'react';
import { DropdownMenu } from './DropdownMenu';
import { SquareMenu } from 'lucide-react';

export const links = [
  // { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'My trips', href: '/my-trips' },
  { name: 'Globe', href: '/globe' },
];
export function NavLinks() {
  const pathname = usePathname();

  return (
    <div>
      <div className=' gap-8 items-center hidden md:flex'>
        {links.map((link) => {
          return (
            <Link key={link.name} href={link.href}>
              <p
                className={cn(
                  pathname === link.href
                    ? 'text-green-600'
                    : 'hover:text-green-600'
                )}
              >
                {link.name}
              </p>
            </Link>
          );
        })}
        <AuthButton type='navBar' />
      </div>

      <DropdownMenu />
    </div>
  );
}
