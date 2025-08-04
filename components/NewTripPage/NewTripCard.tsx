type Props = {
  children: React.ReactNode;
};
export function NewTripCard({ children }: Props) {
  return (
    <div className='border-0 border-gray-300 shadow-sm rounded-md  py-4 space-y-4'>
      {children}
    </div>
  );
}

export function CardHeader({ children }: Props) {
  return <div className='flex justify-between items-center'>{children}</div>;
}

export function CardContent({ children }: Props) {
  return <div className='flex flex-col'>{children}</div>;
}
