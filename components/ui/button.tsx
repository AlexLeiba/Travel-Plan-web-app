'use client';
import { cva } from 'class-variance-authority';
import { Loader } from './loader';

const buttonVariants = cva(
  [
    'w-full ',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 cursor-pointer',
    'disabled:pointer-events-none  disabled:bg-neutral-500 disabled:text-white disabled:cursor-none',
    'transition-colors',
    'rounded-md',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-green-500 text-white',
          'hover:bg-green-600 border-1 border-black/50',
        ],
        secondary:
          'bg-black text-white hover:opacity-80 border-1 dark:border-gray-400 border-black/50',
        outline:
          'bg-white text-black border-1 border-black/50 hover:opacity-80',
      },
      size: {
        sm: ['p-1'],
        md: ['p-2'],
        lg: ['p-3'],
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
    //  compoundVariants: [ //Based on cva props to change the UI conditionally (Each key in obj is a condition, and the value is the UI to be displayed if the condition is true)
    //   {
    //     variant: 'outline',
    //     size: 'large',
    //     className: 'border-2',
    //   },
    // ],
  }
);
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  error?: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  classNameCustome?: string;
  handleClick?: () => void;
};
export function Button({
  error,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  handleClick,
  classNameCustome,
  ...restProps
}: Props) {
  return (
    <div>
      <button
        className={`${buttonVariants({
          variant,
          size,
          className: classNameCustome,
        })}`}
        {...restProps}
        onClick={(e) => {
          e.stopPropagation();
          handleClick?.();
        }}
      >
        {loading ? <Loader /> : children}
      </button>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
}
