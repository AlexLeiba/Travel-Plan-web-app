'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function ErrorPage() {
  return (
    <div className='grid place-items-center h-screen'>
      <div className='text-center grid gap-12'>
        <h1 className='dark:text-black'>
          Ups it seems that something went wrong
        </h1>
        <Link href='/'>
          <Button size='md'>Go back to home page</Button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
