import type { EnumValueScheme } from '$lib/components/custom/generic-datatable/row/generic-cell.svelte';
import { Dumbbell, PersonStanding, Blocks, Trophy, ArrowDown, Activity } from 'lucide-svelte';
import { z } from 'zod';

export const modalities: EnumValueScheme[] = [
	{
		value: 'hypertrophy',
		label: 'Hyperthrophy',
		icon: Dumbbell
	},
	{
		value: 'strength',
		label: 'Strength',
		icon: PersonStanding
	},
	{
		value: 'powerbuilding',
		label: 'Powerbuilding',
		icon: Blocks
	},
	{
		value: 'sportspecific',
		label: 'Sport-Specific',
		icon: Trophy
	},
	{
		value: 'power',
		label: 'Power',
		icon: ArrowDown
	},
	{
		value: 'cardiovascular',
		label: 'Cardiovascular',
		icon: Activity
	}
];

export const experienceLevels: EnumValueScheme[] = [
	{
		label: 'Beginner',
		value: 'beginner'
	},
	{
		label: 'Intermediate',
		value: 'intermediate'
	},
	{
		label: 'Advanced',
		value: 'advanced'
	}
];

export const modalityEnum = z.enum([
	'Hypertrophy',
	'Strength',
	'Powerbuilding',
	'Sport-Specific',
	'Power',
	'Cardiovascular',
	'Flexibility'
]);
export const dayOfWeekEnum = z.enum([
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
]);
export const experienceLevelEnum = z.enum(['Beginner', 'Intermediate', 'Advanced']);

export const setSchema = z.object({
	id: z.string().uuid(),
	weight: z.number().optional(),
	reps: z.string().regex(/^[0-9]+(-[0-9]+)?$/),
	rir: z.number().positive().lte(10).optional(),
	rest: z.number().positive().optional()
});

export type Set = z.infer<typeof setSchema>;

export const exerciseSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	instructions: z.string(),
	sets: z.array(setSchema)
});

export type Exercise = z.infer<typeof exerciseSchema>;

export const workoutSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	exercises: z.map(z.number(), exerciseSchema)
});

export type Workout = z.infer<typeof workoutSchema>;

export const daySchema = z.object({
	id: z.string().uuid(),
	name: dayOfWeekEnum,
	restDay: z.boolean(),
	workouts: z.map(z.number(), workoutSchema)
});

export type Day = z.infer<typeof daySchema>;

export const weekSchema = z.object({
	id: z.string().uuid(),
	days: z.map(z.number(), daySchema)
});

export type Week = z.infer<typeof weekSchema>;

export const programSchema = z.object({
	id: z.string().uuid(),
	clientId: z.string().uuid().optional(),
	name: z.string(),
	description: z.string(),
	modality: modalityEnum,
	experienceLevel: experienceLevelEnum,
	weeks: z.array(z.string().uuid())
});

export type Program = z.infer<typeof programSchema>;
