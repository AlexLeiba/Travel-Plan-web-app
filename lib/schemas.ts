import { z } from 'zod';

export const TripSchema = z.object({
  title: z.string().min(1, 'Title is required, at least 1 character long'),
  description: z
    .string()
    .min(1, 'Description is required, at least 1 character long'),
  location: z
    .string()
    .min(1, 'Location is required, at least 1 character long'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
});

export type TripSchemaType = z.infer<typeof TripSchema>;
