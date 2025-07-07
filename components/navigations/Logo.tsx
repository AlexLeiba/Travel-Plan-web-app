import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href={'/'} className='flex items-center justify-center'>
      <Image
        src={'/icons-location-purple.svg'}
        alt='logo'
        width={20}
        height={20}
      />
      <p>Travel-Plan</p>
    </Link>
  );
}
