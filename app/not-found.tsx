import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function NotFoundPage() {
  return (
    <div className='grid place-items-center h-screen'>
      <div className='text-center grid gap-12'>
        <h1>Ups it seems that this page doesn`t exist</h1>
        <Link href='/'>
          <Button size='md'>Go back to home page</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
