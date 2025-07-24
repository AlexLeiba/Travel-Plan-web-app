import { Github, Linkedin, Mail } from 'lucide-react';
import { Logo } from './Logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className=' bg-white text-white border-t border-black shadow-md flex items-center '>
      <div className='p-4 max-w-5xl mx-auto flex items-center justify-between w-full text-black'>
        <Logo />
        <div className='flex gap-4'>
          <p>Alexandru Leiba Lapteacru</p>
          <Link target='_blank' href={'https://github.com/alexLeiba'}>
            <Github />
          </Link>
          <Link target='_blank' href={'mailto:leiba.alexandru@gmail.com'}>
            <Mail />
          </Link>
          <Link
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
