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
  // handleChange,
  ...restProp
}: Props) {
  return (
    <div>
      <label htmlFor={title}>
        <p className='text-gray-600 mb-2 font-medium'>{title}</p>
      </label>

      {type === 'textarea' ? (
        <textarea
          className='py-2 px-3 focus:outline-none focus:border-t-1  border-b-1   border-green-300 w-full'
          name={title}
          rows={textareaRows}
          // onChange={handleChange}
          {...restProp}
        />
      ) : (
        <input
          className='py-2 px-3 focus:outline-none focus:border-t-1  border-b-1   border-green-300 w-full'
          name={title}
          type={type}
          // onChange={handleChange}
          {...restProp}
        />
      )}
      {error && <p className='text-red-500 body-sm'>{error}</p>}
    </div>
  );
}
