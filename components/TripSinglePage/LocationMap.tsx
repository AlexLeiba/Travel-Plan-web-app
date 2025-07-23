'use client';

import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

// Fix missing marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/pin.png',
  iconUrl: '',
  shadowUrl: '',
});

type Props = {
  locationCoordinates: [number, number];
  title: string;
};
export default function LocationMap({ locationCoordinates, title }: Props) {
  return (
    <div className='w-full h-[400px] rounded-md overflow-hidden border-1 border-gray-300'>
      <MapContainer
        center={locationCoordinates as [number, number]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          className='w-full h-[400px]'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={locationCoordinates as [number, number]}>
          <Popup>{title}</Popup>
        </Marker>
        <ResizeMap />
      </MapContainer>
    </div>
  );
}

function ResizeMap() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}
