'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import GridContainer from '@/components/grid/GridContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spacer } from '@/components/ui/spacer';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TripSchema, TripSchemaType } from '@/lib/schemas';
import { Plane } from 'lucide-react';
import toast from 'react-hot-toast';
import { parseDateInDefaultFormat } from '@/lib/parseDateInDefaultFormat';
import { editTripAction } from '@/lib/server-actions/edit-trip';
import { UploadMultipleImage } from '@/components/ui/UploadMultipleImages';
import { Toggle } from '@/components/ui/toggle';
import { StarRate } from '@/components/ui/starRate';
import { SearchLocationInput } from '@/components/ui/searchLocationInput';
import { Trip } from '@prisma/client';

export function EditTripForm({
  data: { data: tripData, error },
}: {
  data: {
    data:
      | (Trip & {
          images: Array<{
            imageId: string;
            imageUrl: string;
          }>;
        })
      | null;
    error?: string;
  };
}) {
  const navigate = useRouter();
  const [creating, setCreating] = useState(false);
  const [withLink, setWithLink] = useState(false);

  const defaultStartDate = new Date(tripData?.startDate || new Date());
  const defaultEndDate = new Date(tripData?.endDate || new Date());

  const startDate = parseDateInDefaultFormat(defaultStartDate);
  const endDate = parseDateInDefaultFormat(defaultEndDate);

  const formMethods = useForm<TripSchemaType>({
    resolver: zodResolver(TripSchema),
    mode: 'onChange',

    defaultValues: {
      title: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      imageUrl: '',
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

  useEffect(() => {
    function getTrip() {
      if (error) {
        return toast.error(error);
      }

      if (!tripData) {
        return;
      }

      //SET DEFAULT VALUES IN FORM
      setValue('title', tripData.title);
      setValue('description', tripData.description);
      setValue('location', tripData.location);
      setValue('imageUrl', tripData.imageUrl);
      setValue('imageId', tripData.imageId);
      setValue('linkUrl', tripData.linkUrl || '');
      setValue('linkTitle', tripData.linkTitle || '');
      setValue('images', tripData.images);
      setValue('isLinkSelected', tripData.linkUrl ? true : false);
      setValue('starRate', tripData.starRate || 0);

      setWithLink(tripData.linkUrl ? true : false);
    }
    getTrip();
  }, [tripData]);

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
    if (!tripData) {
      return;
    }
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
      await editTripAction(formData, tripData.id);

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
      url: tripData?.imageUrl || '',
      id: tripData?.imageId || '',
    };
  }, [tripData?.imageUrl, tripData?.imageId]);
  return (
    <>
      <form
        action=''
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <GridContainer cols={2} gap={10}>
          <div className='flex flex-col gap-4'>
            <Input
              disabled={!tripData}
              {...register('title')}
              placeholder='Type the title of the trip...'
              title='Title'
              type='text'
              error={errors.title?.message}
            />
            <Input
              disabled={!tripData}
              placeholder='Type the description of the trip...'
              title='Description'
              type='textarea'
              error={errors.description?.message}
              {...register('description')}
            />

            <FormProvider {...formMethods}>
              <SearchLocationInput
                defaultInputValue={tripData?.location}
                placeholder='Type the location...'
                title='Location *'
                type='text'
                error={errors.location?.message}
              />
            </FormProvider>

            <Controller
              name='startDate'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    disabled={!tripData}
                    handleChange={onChange}
                    value={value}
                    placeholder=''
                    title='Start date'
                    type='date'
                    min={'1980-01-01'}
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
                    disabled={!tripData}
                    handleChange={onChange}
                    value={value}
                    placeholder=''
                    title='End date'
                    type='date'
                    min={'1980-01-01'}
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
                  disabled={!tripData}
                  placeholder='Type link url here'
                  title='Link url'
                  type='text'
                  error={errors.linkUrl?.message}
                  {...register('linkUrl')}
                />
                <Input
                  disabled={!tripData}
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
                <StarRate defaultValue={tripData?.starRate || 0} />
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
          disabled={creating || !tripData}
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
    </>
  );
}
