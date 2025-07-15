import { z } from 'zod';

export const TripSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  imageUrl: z.string().optional(),
});

export type TripSchemaType = z.infer<typeof TripSchema>;
