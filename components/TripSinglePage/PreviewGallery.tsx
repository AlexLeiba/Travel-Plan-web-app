'use client';
import GridContainer from '../grid/GridContainer';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

type Props = {
  tripImages: Array<{ imageId: string; imageUrl: string }>;
};
export function PreviewGallery({ tripImages }: Props) {
  const [open, setOpen] = useState({ open: false, index: 0 });
  const handleOpen = (index: number) => {
    setOpen({ open: true, index });
  };
  const handleClose = () => {
    setOpen({ open: false, index: 0 });
  };
  return (
    <div>
      <GridContainer cols={4} gap={2} wrap={true}>
        {tripImages.map((image, index) => {
          return (
            <div
              key={image.imageId}
              className='bg-gray-200 rounded-md cursor-zoom-in'
              onClick={() => handleOpen(index)}
            >
              <Image
                src={image.imageUrl || ''}
                alt='image'
                width={800}
                height={600}
                className='object-cover object-center   rounded-md aspect-video w-full'
              />
            </div>
          );
        })}

        <Lightbox
          plugins={[Zoom]}
          open={open.open}
          close={handleClose}
          slides={tripImages.slice(open.index).map((image) => {
            return {
              src: image.imageUrl || '',
              width: 1000,
              height: 800,
            };
          })}
        />
      </GridContainer>
    </div>
  );
}
