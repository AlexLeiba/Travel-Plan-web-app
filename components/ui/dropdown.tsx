'use client';

import { SORT_OPTIONS } from '@/lib/consts';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  title: string;
  type: 'type' | 'order';
};
export function Dropdown({ title, type }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSelectParam(v: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (type === 'type') {
      params.set('type', v);
      params.set('page', '1');
      router.replace(`?${params.toString()}`);
    } else {
      params.set('order', v);
      // params.set('page', '1');
      router.replace(`?${params.toString()}`);
    }
  }
  return (
    <div>
      <select
        value={searchParams.get(type) || 'all'}
        className='p-2 bg-gray-100 rounded-md outline-none hover:bg-gray-300  cursor-pointer transition-all'
        name={title}
        id={title}
        onChange={(e) => handleSelectParam(e.target.value)}
      >
        {SORT_OPTIONS.slice(
          type === 'type' ? 0 : 3,
          type === 'type' ? 3 : 5
        ).map((option) => {
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
