import { Loader } from '@/components/ui/loader';
import React from 'react';

function LoadingPage() {
  return (
    <div className='grid place-items-center h-screen'>
      <Loader color='black' />
    </div>
  );
}

export default LoadingPage;
