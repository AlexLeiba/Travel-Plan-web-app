'use client';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { cn } from '@/lib/utilities';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider.js';
import { RawResult } from 'leaflet-geosearch/dist/providers/civilDefenseMapProvider.js';
import { Loader } from './loader';
import { useFormContext } from 'react-hook-form';

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
  };
export function SearchLocationInput({
  title,
  error,
  type = 'text',
  ...restProp
}: Props) {
  const { setValue } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const [selectedInputValues, setSelectedInputValues] = useState<string>('');
  const [results, setResults] = useState<SearchResult<RawResult>[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getLocation() {
      setLoading(true);
      const provider = new OpenStreetMapProvider();

      const results = await provider.search({ query: inputValue });

      setResults(results);

      setLoading(false);
    }

    const timeoutId = setTimeout(() => {
      if (inputValue.length > 0 && inputValue !== selectedInputValues)
        getLocation();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  function cleanSearch() {
    setInputValue('');
    setValue('location', '');
    setValue('lattitude', '');
    setValue('lngitude', '');
    setResults([]);
  }

  function handleSelectLocation(result: SearchResult<RawResult>) {
    setInputValue(result.label);
    setSelectedInputValues(result.label);
    setValue('location', result.label);
    setValue('lattitude', result.raw.lat);
    setValue('lngitude', result.raw.lon);
    setResults([]);
  }

  return (
    <div>
      <label htmlFor={title}>
        <p
          className={cn(
            restProp?.disabled ? 'text-gray-200' : 'text-gray-600',
            ' mb-2 font-medium'
          )}
        >
          {title}
        </p>
      </label>
      <div className='relative'>
        {loading ? (
          <div className='absolute right-2 top-2'>
            <Loader color='black' />
          </div>
        ) : inputValue.length > 0 ? (
          <X
            className='absolute text-gray-500 right-2 top-2 cursor-pointer'
            onClick={cleanSearch}
          />
        ) : (
          <Search className='absolute text-gray-500 right-2 top-2 ' />
        )}
        <input
          disabled={loading}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='py-2 pl-3 pr-8 focus:outline-none rounded-md bg-gray-100  w-full hover:bg-gray-300 transition-all'
          name={title}
          type={type}
          {...restProp}
        />

        {error && <p className='text-red-500 body-sm'>{error}</p>}
      </div>

      {results.length > 0 && (
        <div className='bg-white rounded-md p-2 shadow-lg max-h-[300px] overflow-y-auto'>
          {results.map((result: SearchResult<RawResult>, index: number) => (
            <div
              onClick={() => handleSelectLocation(result)}
              key={index}
              className='mb-4 hover:bg-gray-400 hover:text-white cursor-pointer p-2'
            >
              <p>{result.label}</p>
              {/* <p>{result.description}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
