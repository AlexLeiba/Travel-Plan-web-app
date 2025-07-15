import { v2 as cloudinary } from 'cloudinary';

// Return "https" URLs by setting secure: true

export default function cloudinaryUpload() {
  cloudinary.config({
    secure: process.env.NODE_ENV === 'production',
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export const ALLOWED_FORMATS = [
  'jpg',
  'png',
  'gif',
  'webp',
  'svg',
  'jpeg',
  'avif',
];
