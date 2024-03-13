import { experienceLevelEnum, modalityEnum } from '$lib/data/program/program-scheme';
import { z } from 'zod';

export const createProgramSchema = z.object({
	name: z.string().min(2).max(30),
	description: z.string().min(2).max(250),
	modality: modalityEnum,
	experienceLevel: experienceLevelEnum
});

export type ProgramFormSchema = typeof createProgramSchema;
