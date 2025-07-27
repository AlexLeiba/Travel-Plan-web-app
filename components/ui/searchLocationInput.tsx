'use client';
import React from 'react';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utilities';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider.js';
import { RawResult } from 'leaflet-geosearch/dist/providers/civilDefenseMapProvider.js';
import { Loader } from './loader';
import { useFormContext } from 'react-hook-form';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import toast from 'react-hot-toast';

type Props = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    title: string;
    error?: string;
    defaultInputValue?: string;
  };
export function SearchLocationInput({
  title,
  error,
  defaultInputValue,
  ...restProp
}: Props) {
  const [OpenStreetMapProvider, setProvider] = useState<any>(null);

  useEffect(() => {
    import('leaflet-geosearch').then((mod) => {
      setProvider(() => mod.OpenStreetMapProvider);
    });
  }, []);

  const { setValue } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const [selectedInputValues, setSelectedInputValues] = useState<string>('');
  const [results, setResults] = useState<SearchResult<RawResult>[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getLocation() {
      setLoading(true);
      try {
        const provider = new OpenStreetMapProvider();

        const results = await provider?.search({ query: inputValue });

        setResults(results);
      } catch (error) {
        toast.error('Failed to get location');
        console.log('🚀 ~ getLocation ~ error:', error);
      } finally {
        setLoading(false);
      }
    }

    const timeoutId = setTimeout(() => {
      if (inputValue.length > 0 && inputValue !== selectedInputValues)
        getLocation();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  useEffect(() => {
    if (defaultInputValue) {
      setSelectedInputValues(defaultInputValue);
      setInputValue(defaultInputValue);
    }
  }, [defaultInputValue]);

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
            restProp?.disabled
              ? 'text-gray-200'
              : 'text-gray-600 dark:text-white',
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
            className='absolute text-gray-500 z-20 right-2 top-2 cursor-pointer'
            onClick={cleanSearch}
          />
        ) : (
          <Search className='absolute text-gray-500 right-2 top-2 ' />
        )}
        <input
          disabled={loading}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='py-2 pl-3 pr-8 focus:outline-none rounded-md bg-gray-100 dark:bg-transparent dark:border-white dark:border-1 dark:text-white  w-full hover:bg-gray-300  dark:hover:opacity-80 dark:hover:bg-transparent transition-all dark:placeholder:text-gray-400'
          name={title}
          type={'text'}
          {...restProp}
        />

        {error && <p className='text-red-500 body-sm'>{error}</p>}
      </div>

      {results.length > 0 && (
        <div className='bg-white dark:bg-gray-300 rounded-md p-2 shadow-lg max-h-[300px] overflow-y-auto'>
          {results.map((result: SearchResult<RawResult>, index: number) => (
            <div
              onClick={() => handleSelectLocation(result)}
              key={index}
              className='mb-4 hover:bg-gray-400 rounded-md  hover:text-white cursor-pointer p-2'
            >
              <p className='dark:text-gray-600'>{result.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
