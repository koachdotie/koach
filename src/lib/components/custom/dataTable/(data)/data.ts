import {
	Activity,
	ArrowDown,
	Blocks,
	Dumbbell,
	PersonStanding,
	Tally2,
	Tally3,
	Tally4,
	Trophy
} from 'lucide-svelte';

export const modality = [
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

export const experiencelevel = [
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
