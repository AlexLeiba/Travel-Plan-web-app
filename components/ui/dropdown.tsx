'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  title: string;
  options: string[];
};
export function Dropdown({ title, options }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSelectParam(v: string) {
    console.log('🚀 ~ handleSelectParam ~ v:', v);
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', v);
    router.replace(`?${params.toString()}`);
  }
  return (
    <div>
      <select
        value={searchParams.get('type') || 'all'}
        className='p-2 bg-gray-100 rounded-md outline-none hover:bg-gray-300  cursor-pointer transition-all'
        name={title}
        id={title}
        onChange={(e) => handleSelectParam(e.target.value)}
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
