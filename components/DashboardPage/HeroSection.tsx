import { AuthButton } from '../ui/authButton';

export function HeroSection() {
  return (
    <div className='space-y-10'>
      <h1 className='font-[family-name:var(--font-serif)]'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        ullam.
      </h1>

      <div className='flex gap-8 items-center w-full'>
        <p className='font-[family-name:var(--font-geist-sans)]'>
          Home Page Lorem ipsum dolor sit amet.
        </p>

        <AuthButton type='landingPage' />
      </div>
    </div>
  );
}
