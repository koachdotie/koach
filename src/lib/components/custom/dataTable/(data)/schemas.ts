import { z } from 'zod';

export const programSchema = z.object({
	name: z.string(),
	description: z.string(),
	modality: z.string(),
	experienceLevel: z.string()
});

export type Program = z.infer<typeof programSchema>;
