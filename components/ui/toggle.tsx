import { cn } from '@/lib/utilities';

type Props = {
  handleChange: () => void;
  selected?: boolean;
};
export function Toggle({ handleChange, selected }: Props) {
  return (
    <div className='flex gap-2'>
      <p className={cn('text-gray-600 font-medium')}>Link +</p>
      <div
        onClick={handleChange}
        className='bg-white border-1 w-[50px] border-gray-300 rounded-full p-1 cursor-pointer hover:opacity-80'
      >
        <div
          className={cn(
            !selected
              ? 'translate-x-0 bg-gray-500'
              : 'translate-x-[25px] bg-green-500',
            'size-4 rounded-full  transition-all'
          )}
        ></div>
      </div>
    </div>
  );
}
