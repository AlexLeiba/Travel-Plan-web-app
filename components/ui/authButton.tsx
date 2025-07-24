'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Plane } from 'lucide-react';
import Link from 'next/link';
import { Button } from './button';
import Image from 'next/image';

type Props = {
  type: 'navBar' | 'landingPage';
};
export function AuthButton({ type }: Props) {
  const { data: session } = useSession(); //getSession in async function to get session
  return (
    <>
      {session?.user?.email ? (
        type === 'navBar' ? (
          <button
            className='flex bg-black dark:border-1 dark:border-white text-white rounded-md px-4 py-2 items-center gap-2 cursor-pointer hover:opacity-80'
            onClick={() => signOut()}
          >
            <Image
              src={'/google-color.webp'}
              alt='google'
              width={20}
              height={20}
            />
            <p className='text-white'>Sign out</p>
          </button>
        ) : (
          <Link href={'/my-trips/new-trip'}>
            <Button classNameCustome='px-12 flex items-center gap-2'>
              New trip <Plane size={15} />
            </Button>
          </Link>
        )
      ) : (
        <button
          className='flex dark:border-1 dark:border-white bg-black text-white rounded-md px-4 py-2 items-center gap-2 cursor-pointer hover:opacity-80'
          onClick={() => signIn()}
        >
          {/* <Github size={18} color='white' /> */}

          <Image
            src={'/google-color.webp'}
            alt='google'
            width={20}
            height={20}
          />
          <p className='text-white'>Sign in</p>
        </button>
      )}
    </>
  );
}
