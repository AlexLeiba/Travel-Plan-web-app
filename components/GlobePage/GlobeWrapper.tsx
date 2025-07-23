'use client';
import dynamic from 'next/dynamic';

const GlobeView = dynamic(() => import('./GlobeView'), {
  ssr: false, // Disable server-side rendering
});

type Props = {
  locationsData:
    | {
        data: {
          location: string;
          lattitude: string;
          lngitude: string;
        }[];
        error: undefined;
      }
    | {
        data: null;
        error: string;
      };
};
export function GlobeWrapper(locationsData: Props) {
  return <GlobeView locationsData={locationsData.locationsData} />;
}
