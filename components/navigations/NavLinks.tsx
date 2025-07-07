import Link from 'next/link';

const links = [
  { name: 'Home', href: '/' },
  { name: 'My trips', href: '/my-trips' },
  { name: 'Globe', href: '/globe' },
  { name: 'Sign in', href: '/sign-in' },
];
export function NavLinks() {
  return (
    <div className='flex gap-8 items-center'>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className='hover:text-green-600'
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
