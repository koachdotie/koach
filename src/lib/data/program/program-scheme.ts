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
    "Hypertrophy",
    "Strength",
    "Powerbuilding",
    "Sport-Specific",
    "Power",
    "Cardiovascular"
]);
export const experienceLevelEnum = z.enum([
    "Beginner",
    "Intermediate",
    "Advanced"
]);

export const programSchema = z.object({
	uid: z.string().uuid(),
	clientUid: z.string().uuid().optional(),
	name: z.string(),
	description: z.string(),
    modality: modalityEnum,
    experienceLevel: experienceLevelEnum,
	plannedWorkouts: z.array(z.object({}))
});

export type Program = z.infer<typeof programSchema>;