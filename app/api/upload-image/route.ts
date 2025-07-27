import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { ALLOWED_FORMATS } from '@/lib/cloudinary';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 });
  }

  const { imageUrl } = await req.json();

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image not found' }, { status: 400 });
  }

  const storedImage = await cloudinary.uploader.upload(imageUrl, {
    folder: 'travel-plan',
    allowed_formats: ALLOWED_FORMATS,
    resource_type: 'image',
    use_filename: true,
    unique_filename: false,
  });
  console.log('🚀 ~ POST ~ storedImage:\n\n\n\n\n', storedImage);

  if (storedImage.error) {
    console.log('🚀 ~ POST ~ storedImage.error:', storedImage.error);
    return NextResponse.json(
      { error: `Image upload failed: ${storedImage.error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { imageUrl: storedImage.secure_url, imageId: storedImage.public_id },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 });
  }

  const imageId = req.nextUrl.searchParams.get('imageId');
  if (!imageId) {
    return NextResponse.json(
      { error: 'Image ID is required' },
      { status: 400 }
    );
  }

  const deleteImage = await cloudinary.uploader.destroy(imageId, {
    resource_type: 'image',
  });

  if (deleteImage.error) {
    console.log('🚀 ~ DELETE ~ deleteImage.error:', deleteImage.error);
    return NextResponse.json(
      { error: `Image delete failed: ${deleteImage.error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: 'Image deleted successfully' },
    {
      status: 200,
    }
  );
}
