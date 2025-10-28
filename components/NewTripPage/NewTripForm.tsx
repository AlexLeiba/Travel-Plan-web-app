"use client";
import React, { useState } from "react";
import GridContainer from "@/components/grid/GridContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spacer } from "@/components/ui/spacer";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TripSchema, TripSchemaType } from "@/lib/schemas";
import { Plane } from "lucide-react";
import { createTripAction } from "@/server-actions/create-trip";
import { useRouter } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";
import { UploadMultipleImage } from "@/components/ui/UploadMultipleImages";
import { StarRate } from "@/components/ui/starRate";
import { SearchLocationInput } from "@/components/ui/searchLocationInput";
import toast from "react-hot-toast";

export function NewTripForm() {
  const navigate = useRouter();
  const [creating, setCreating] = useState(false);
  const [withLink, setWithLink] = useState(false);
  const formMethods = useForm<TripSchemaType>({
    resolver: zodResolver(TripSchema),
    mode: "onChange",

    defaultValues: {
      title: "",
      description: "",
      location: "",
      lattitude: "0",
      lngitude: "0",
      startDate: "",
      endDate: "",
      imageUrl: "",
      linkUrl: "",
      linkTitle: "",
      isLinkSelected: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = formMethods;

  async function onSubmit(formData: TripSchemaType) {
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (startDate >= endDate) {
      setError("startDate", {
        message: "Start date must be before the End date",
      });
      return;
    }

    try {
      // UPLOAD IMAGES

      setCreating(true);
      await createTripAction(formData);

      toast.success("Trip created successfully!");
      navigate.push(`/my-trips`);
    } catch (error: any) {
      toast.error("Failed to create trip. Please try again.");
      console.log("🚀 ~ onSubmit ~ error:", error);
    } finally {
      setCreating(false);
    }
  }

  function handleLinkChange() {
    setWithLink((prevState) => {
      formMethods.setValue("isLinkSelected", !prevState);
      return !prevState;
    });
  }
  return (
    <form
      action=""
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <GridContainer gap={10} wrap className="md:grid-cols-2 sm:grid-cols-1">
        <div className="flex flex-col gap-4">
          {/* Inputs */}
          <Input
            {...register("title")}
            placeholder="Type the title of the trip..."
            title="Title *"
            type="text"
            error={errors.title?.message}
          />
          <Input
            placeholder="Type the description of the trip..."
            title="Description *"
            type="textarea"
            error={errors.description?.message}
            {...register("description")}
          />

          <FormProvider {...formMethods}>
            <SearchLocationInput
              placeholder="Type the location..."
              title="Location *"
              type="text"
              error={errors.location?.message}
            />
          </FormProvider>

          {/* Dates */}
          <Input
            min={"1993-01-01"}
            placeholder=""
            title="Start date *"
            type="date"
            error={errors.startDate?.message}
            {...register("startDate")}
          />
          <Input
            min={"1993-01-01"}
            placeholder=""
            title="End date *"
            type="date"
            error={errors.endDate?.message}
            {...register("endDate")}
          />

          {/* Add link */}
          <Spacer size={4} />
          <div>
            <Toggle handleChange={handleLinkChange} selected={withLink} />
          </div>
          {withLink && (
            <>
              <Input
                disabled={!withLink}
                placeholder="Type link url here"
                title="Link url"
                type="text"
                error={errors.linkUrl?.message}
                {...register("linkUrl")}
              />
              <Input
                disabled={!withLink}
                placeholder="Type link title here"
                title="Link title"
                type="text"
                error={errors.linkTitle?.message}
                {...register("linkTitle")}
              />
            </>
          )}
        </div>
        <FormProvider {...formMethods}>
          <div className="flex flex-col gap-4">
            {/* Star rate */}

            <StarRate />

            {/* Upload cover image */}
            <UploadMultipleImage
              type="single"
              title="Upload cover image *"
              fieldName="imageUrl"
            />

            {/* Upload images */}
            <UploadMultipleImage
              type="multiple"
              title="Upload more images"
              fieldName="images"
            />
          </div>
        </FormProvider>
      </GridContainer>

      {/* Submit button */}
      <Spacer size={2} />
      <Button
        disabled={creating}
        loading={creating}
        type="submit"
        onClick={handleSubmit((data) => onSubmit(data))}
        variant="secondary"
        classNameCustome="flex justify-center items-center gap-2"
      >
        Create trip
        <Plane size={15} />
      </Button>
    </form>
  );
}
