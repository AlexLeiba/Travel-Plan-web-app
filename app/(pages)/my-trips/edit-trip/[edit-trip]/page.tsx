'use client';
import { Container } from '@/components/grid/Container';
import GridContainer from '@/components/grid/GridContainer';
import { CardContent, NewTripCard } from '@/components/NewTripPage/NewTripCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spacer } from '@/components/ui/spacer';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TripSchema, TripSchemaType } from '@/lib/schemas';
import { Plane } from 'lucide-react';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import { Trip } from '@/lib/generated/prisma';
import axios from 'axios';
import { parseDateInDefaultFormat } from '@/lib/parseDateInDefaultFormat';
import { editTripAction } from '@/lib/server-actions/edit-trip';
import { Loader } from '@/components/ui/loader';
import { UploadMultipleImage } from '@/components/ui/UploadMultipleImages';
import { Toggle } from '@/components/ui/toggle';
import { StarRate } from '@/components/ui/starRate';

function EditTripPage() {
  const pathname = usePathname();
  const navigate = useRouter();
  const [creating, setCreating] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [withLink, setWithLink] = useState(false);

  const tripId = pathname.split('/')[3];

  const defaultStartDate = new Date(selectedTrip?.startDate || new Date());
  const defaultEndDate = new Date(selectedTrip?.endDate || new Date());

  const startDate = parseDateInDefaultFormat(defaultStartDate);
  const endDate = parseDateInDefaultFormat(defaultEndDate);

  const formMethods = useForm<TripSchemaType>({
    resolver: zodResolver(TripSchema),
    mode: 'onChange',

    defaultValues: {
      title: selectedTrip?.title || '',
      description: selectedTrip?.description || '',
      location: selectedTrip?.location || '',
      startDate: '',
      endDate: '',
      imageUrl: selectedTrip?.imageUrl || '', // Initialize with null (no file selected)
      linkUrl: '',
      linkTitle: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    control,
    setError,
  } = formMethods;
  console.log('🚀 ~ EditTripPage ~ errors:', errors);

  useEffect(() => {
    async function getTrip() {
      const response = await axios.get('/api/trips?id=' + tripId);

      setSelectedTrip(response.data.data);

      setValue('title', response.data.data.title);
      setValue('description', response.data.data.description);
      setValue('location', response.data.data.location);
      setValue('imageUrl', response.data.data.imageUrl);
      setValue('imageId', response.data.data.imageId);
      setValue('linkUrl', response.data.data.linkUrl);
      setValue('linkTitle', response.data.data.linkTitle);
      setValue('images', response.data.data.images);
      setValue('isLinkSelected', response.data.data.linkUrl ? true : false);

      setWithLink(response.data.data.linkUrl ? true : false);
    }
    getTrip();
  }, [tripId]);

  useEffect(() => {
    setValue('startDate', startDate);
    setValue('endDate', endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    if (!isDirty) return;

    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();

      window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
    }

    if (isDirty) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  async function onSubmit(formData: TripSchemaType) {
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (startDate >= endDate) {
      setError('startDate', {
        message: 'Start date must be before the End date',
      });
      return;
    }

    try {
      setCreating(true);
      await editTripAction(formData, tripId);

      toast.success('Trip updated successfully!');
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
      if (!prevState === false) {
        formMethods.setValue('linkUrl', '');
        formMethods.setValue('linkTitle', '');
      }
      return !prevState;
    });
  }

  const defaultCoverImage = useMemo(() => {
    return {
      url: selectedTrip?.imageUrl || '',
      id: selectedTrip?.imageId || '',
    };
  }, [selectedTrip?.imageUrl, selectedTrip?.imageId]);
  return (
    <Container>
      <div className='flex  gap-4'>
        <h2>Edit trip</h2>
        {!selectedTrip && <Loader color='black' />}
      </div>
      <Spacer sm={12} md={12} lg={24} />

      <NewTripCard>
        <CardContent>
          <form
            action=''
            className='flex flex-col gap-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <GridContainer cols={2} gap={10}>
              <div className='flex flex-col gap-4'>
                <Input
                  disabled={!selectedTrip}
                  {...register('title')}
                  placeholder='Type the title of the trip...'
                  title='Title'
                  type='text'
                  error={errors.title?.message}
                />
                <Input
                  disabled={!selectedTrip}
                  placeholder='Type the description of the trip...'
                  title='Description'
                  type='textarea'
                  error={errors.description?.message}
                  {...register('description')}
                />
                <Input
                  disabled={!selectedTrip}
                  placeholder='Type the location...'
                  title='Location'
                  type='text'
                  error={errors.location?.message}
                  {...register('location')}
                />

                <Controller
                  name='startDate'
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Input
                        disabled={!selectedTrip}
                        handleChange={onChange}
                        value={value}
                        placeholder=''
                        title='Start date'
                        type='date'
                        min={'1993-01-01'}
                        error={errors.startDate?.message}
                        {...register('startDate')}
                      />
                    );
                  }}
                />

                <Controller
                  name='endDate'
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Input
                        disabled={!selectedTrip}
                        handleChange={onChange}
                        value={value}
                        placeholder=''
                        title='End date'
                        type='date'
                        min={'1993-01-01'}
                        error={errors.endDate?.message}
                        {...register('endDate')}
                      />
                    );
                  }}
                />

                <Spacer size={4} />

                <div>
                  <Toggle handleChange={handleLinkChange} selected={withLink} />
                </div>

                {withLink && (
                  <>
                    <Input
                      disabled={!selectedTrip}
                      placeholder='Type link url here'
                      title='Link url'
                      type='text'
                      error={errors.linkUrl?.message}
                      {...register('linkUrl')}
                    />
                    <Input
                      disabled={!selectedTrip}
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
                  {/* Star rate */}
                  <FormProvider {...formMethods}>
                    <StarRate defaultValue={selectedTrip?.starRate || 0} />
                  </FormProvider>

                  <UploadMultipleImage
                    type='single'
                    title='Upload cover image *'
                    fieldName='imageUrl'
                    imageDefault={defaultCoverImage}
                  />

                  <UploadMultipleImage
                    type='multiple'
                    title='Upload more images'
                    fieldName='images'
                  />
                </div>
              </FormProvider>
            </GridContainer>

            <Button
              disabled={creating || !selectedTrip}
              loading={creating}
              type='submit'
              onClick={handleSubmit((data) => onSubmit(data))}
              variant='secondary'
              classNameCustome='flex justify-center items-center gap-2'
            >
              Save changes
              <Plane size={15} />
            </Button>
          </form>
        </CardContent>
      </NewTripCard>
    </Container>
  );
}

export default EditTripPage;
