import { Locate, LocateFixed, MapPin, MapPinned } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href={'/'} className='flex items-center justify-center'>
      <MapPinned />
      <p className='font-bold'>Travel-Plan</p>
    </Link>
  );
}
