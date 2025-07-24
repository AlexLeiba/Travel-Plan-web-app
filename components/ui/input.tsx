import { cn } from '@/lib/utilities';

type Props = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    title: string;
    error?: string;
    type?:
      | 'text'
      | 'email'
      | 'tel'
      | 'password'
      | 'number'
      | 'textarea'
      | 'date';
    textareaRows?: number;
    handleChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
  };
export function Input({
  title,
  error,
  type = 'text',
  textareaRows = 4,
  handleChange,
  ...restProp
}: Props) {
  return (
    <div>
      <label htmlFor={title}>
        <p
          className={cn(
            restProp?.disabled
              ? 'text-gray-200'
              : 'text-gray-600 dark:text-white',
            ' mb-2 font-medium'
          )}
        >
          {title}
        </p>
      </label>

      {type === 'textarea' ? (
        <textarea
          className={cn(
            restProp?.disabled ? ' border-gray-300' : ' border-green-300 ',
            'py-2 px-3 focus:outline-none focus:border-t-1  border-b-1   w-full'
          )}
          name={title}
          rows={textareaRows}
          onChange={handleChange}
          {...restProp}
        />
      ) : (
        <input
          className={cn(
            restProp?.disabled ? ' border-gray-300' : ' border-green-300',
            'py-2 px-3 focus:outline-none focus:border-t-1  border-b-1    w-full '
          )}
          name={title}
          type={type}
          onChange={handleChange}
          {...restProp}
        />
      )}
      {error && <p className='text-red-500 body-sm'>{error}</p>}
    </div>
  );
}
