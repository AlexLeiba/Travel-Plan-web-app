import Image from 'next/image';
import { AuthButton } from '../ui/authButton';
import { Spacer } from '../ui/spacer';

export function HeroSection() {
  return (
    <div className='space-y-10 lg:flex lg:flex-row  items-center justify-center  md:flex-col '>
      <div>
        <h1 className='font-[family-name:var(--font-playwrite)]'>
          Travel , Plan and Enjoy your trips
        </h1>

        <Spacer size={8} />
        <h2 className='font-[family-name:var(--font-playwrite)]'>
          Save your best moments and destinations
        </h2>
        <Spacer size={2} />
        <p>Enjoy the travel experience each time you visit your profile</p>
        <p>Keep track of all visited places, and plan your next trips :)</p>
        <p>
          The <b>theme</b> will be adopted to your system preferences
        </p>

        <Spacer size={8} />
        <div className='flex gap-8 items-center w-full'>
          <AuthButton type='landingPage' />
        </div>
      </div>

      <Image
        className='w-full object-cover hidden md:h-[600px] md:block'
        src={'/travel.png'}
        alt='hero'
        width={600}
        height={600}
      />

      <Spacer md={6} />
    </div>
  );
}
