import { Container } from '../grid/Container';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';

export function Navbar() {
  return (
    <header className=' bg-white shadow-md flex items-center fixed top-0 left-0 right-0 z-50'>
      <Container>
        <div className='py-4  flex items-center justify-between w-full'>
          <Logo />
          <NavLinks />
        </div>
      </Container>
    </header>
  );
}
