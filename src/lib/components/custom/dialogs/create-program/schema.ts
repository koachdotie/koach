import { experienceLevelEnum, modalityEnum } from '$lib/data/program/program-scheme';
import { z } from 'zod';

export const createProgramSchema = z.object({
	name: z.string().min(2).max(30),
    description: z.string().min(2).max(250),
    // modality: modalityEnum,
    // experienceLevel: experienceLevelEnum,
    // weeks: z.number().int().min(1).max(52),
});

export type ProgramFormSchema = typeof createProgramSchema;
