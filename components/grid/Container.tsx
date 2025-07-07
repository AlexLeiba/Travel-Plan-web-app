import { cn } from '@/lib/utilities';

type Props = {
  children: React.ReactNode;
  fluid?: boolean;
};
export function Container({ children, fluid }: Props) {
  return (
    <div
      className={cn(
        fluid ? 'w-full' : 'w-full max-w-5xl',
        ' mx-auto px-4 flex flex-col'
      )}
    >
      {children}
    </div>
  );
}
