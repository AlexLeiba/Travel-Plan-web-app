import { Github, Linkedin, Mail } from 'lucide-react';
import { Logo } from './Logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className=' bg-white dark:bg-black dark:border-1 dark:border-t-white text-white border-t border-black shadow-md flex items-center '>
      <div className='p-4 max-w-5xl mx-auto flex items-center justify-between w-full text-black'>
        <Logo />
        <div className='flex gap-4 dark:text-white'>
          <p>Alexandru Leiba Lapteacru</p>
          <Link
            target='_blank'
            href={'https://github.com/alexLeiba'}
            title='Github'
          >
            <Github />
          </Link>
          <Link
            target='_blank'
            href={'mailto:leiba.alexandru@gmail.com'}
            title='Mail'
          >
            <Mail />
          </Link>
          <Link
            title='Linkedin'
            target='_blank'
            href={
              'https://www.linkedin.com/in/alex-leiba-9205801ba/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
            }
          >
            <Linkedin />
          </Link>
        </div>
      </div>
    </footer>
  );
}
