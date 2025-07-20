'use client';
import { Container } from '@/components/grid/Container';
import GridContainer from '@/components/grid/GridContainer';
import {
  CardContent,
  CardHeader,
  NewTripCard,
} from '@/components/NewTripPage/NewTripCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spacer } from '@/components/ui/spacer';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TripSchema, TripSchemaType } from '@/lib/schemas';
import { UploadImage } from '@/components/ui/UploadImage';
import { Plane } from 'lucide-react';
import { createTripAction } from '@/lib/server-actions/create-trip';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Toggle } from '@/components/ui/toggle';
import { UploadMultipleImage } from '@/components/ui/UploadMultipleImages';

function NewTripPage() {
  const navigate = useRouter();
  const [creating, setCreating] = useState(false);
  const [withLink, setWithLink] = useState(false);
  const formMethods = useForm<TripSchemaType>({
    resolver: zodResolver(TripSchema),
    mode: 'onChange',

    defaultValues: {
      title: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      imageUrl: '', // Initialize with null (no file selected)
      linkUrl: '',
      linkTitle: '',
      isLinkSelected: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  async function onSubmit(formData: TripSchemaType) {
    setCreating(true);

    try {
      await createTripAction(formData);

      toast.success('Trip created successfully!');
      navigate.push(`/my-trips`);
    } catch (error: any) {
      toast.error('Failed to create trip. Please try again.');
      console.log('🚀 ~ onSubmit ~ error:', error);
    } finally {
      setCreating(false);
    }
  }

  function handleLinkChange() {
    setWithLink((prevState) => {
      formMethods.setValue('isLinkSelected', !prevState);
      return !prevState;
    });
  }
  return (
    <Container>
      <h2>New trip</h2>
      <Spacer sm={12} md={12} lg={24} />

      <NewTripCard>
        <CardHeader>
          <h3>Create a new trip</h3>
        </CardHeader>

        <CardContent>
          <form
            action=''
            className='flex flex-col gap-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <GridContainer cols={2} gap={10}>
              <div className='flex flex-col gap-4'>
                <Input
                  {...register('title')}
                  placeholder='Type the title of the trip...'
                  title='Title *'
                  type='text'
                  error={errors.title?.message}
                />
                <Input
                  placeholder='Type the description of the trip...'
                  title='Description *'
                  type='textarea'
                  error={errors.description?.message}
                  {...register('description')}
                />
                <Input
                  placeholder='Type the location...'
                  title='Location *'
                  type='text'
                  error={errors.location?.message}
                  {...register('location')}
                />

                <Input
                  min={'1993-01-01'}
                  placeholder=''
                  title='Start date *'
                  type='date'
                  error={errors.startDate?.message}
                  {...register('startDate')}
                />
                <Input
                  min={'1993-01-01'}
                  placeholder=''
                  title='End date *'
                  type='date'
                  error={errors.endDate?.message}
                  {...register('endDate')}
                />

                <Spacer size={4} />
                <div>
                  <Toggle handleChange={handleLinkChange} selected={withLink} />
                </div>
                {withLink && (
                  <>
                    <Input
                      disabled={!withLink}
                      placeholder='Type link url here'
                      title='Link url'
                      type='text'
                      error={errors.linkUrl?.message}
                      {...register('linkUrl')}
                    />
                    <Input
                      disabled={!withLink}
                      placeholder='Type link title here'
                      title='Link title'
                      type='text'
                      error={errors.linkTitle?.message}
                      {...register('linkTitle')}
                    />
                  </>
                )}
              </div>
              <FormProvider {...formMethods}>
                <div className='flex flex-col gap-4'>
                  <UploadImage title='Upload cover image *' />

                  <UploadMultipleImage
                    type='multiple'
                    title='Upload images'
                    fieldName='images'
                  />
                </div>
              </FormProvider>
            </GridContainer>

            <Spacer size={2} />
            <Button
              disabled={creating}
              loading={creating}
              type='submit'
              onClick={handleSubmit((data) => onSubmit(data))}
              variant='secondary'
              classNameCustome='flex justify-center items-center gap-2'
            >
              Create trip
              <Plane size={15} />
            </Button>
          </form>
        </CardContent>
      </NewTripCard>
    </Container>
  );
}

export default NewTripPage;
