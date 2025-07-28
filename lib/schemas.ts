import { z } from 'zod';

const discriminatedLinkSchema = z.discriminatedUnion('isLinkSelected', [
  z.object({
    isLinkSelected: z.literal(true),
    linkUrl: z.url().min(1, 'Link URL is required'),
    linkTitle: z.string().min(1, 'Link title is required'),
  }),
  z.object({
    isLinkSelected: z.literal(false),
    linkUrl: z.string().optional(),
    linkTitle: z.string().optional(),
  }),
]);

export const TripSchema = z
  .object({
    title: z.string().min(1, 'Title is required, at least 1 character long'),
    description: z
      .string()
      .min(1, 'Description is required, at least 1 character long'),

    location: z
      .string()
      .min(1, 'Location is required, at least 1 character long'),
    lattitude: z.string().optional(),
    lngitude: z.string().optional(),

    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),

    imageUrl: z.string().min(1, 'Image URL is required'),
    imageId: z.string().min(1, 'Image ID is required'),
    images: z.array(
      z.object({
        imageUrl: z.string().optional(),
        imageId: z.string().optional(),
      })
    ),
    starRate: z.number().optional(),

    isLinkSelected: z.boolean().optional(),
  })

  .and(discriminatedLinkSchema);

export type TripSchemaType = z.infer<typeof TripSchema>;
