import { ArrowDown } from 'lucide-svelte';

export const labels = [
	{
		value: 'bug',
		label: 'Bug'
	},
	{
		value: 'feature',
		label: 'Feature'
	},
	{
		value: 'documentation',
		label: 'Documentation'
	}
];

export const statuses = [
	{
		value: 'backlog',
		label: 'Backlog',
		icon: ArrowDown
	},
	{
		value: 'todo',
		label: 'Todo',
		icon: ArrowDown
	},
	{
		value: 'in progress',
		label: 'In Progress',
		icon: ArrowDown
	},
	{
		value: 'done',
		label: 'Done',
		icon: ArrowDown
	},
	{
		value: 'canceled',
		label: 'Canceled',
		icon: ArrowDown
	}
];

export const modalities = [
	{
		label: 'Beginner',
		value: 'beginner',
		icon: ArrowDown
	},
	{
		label: 'Late Beginner',
		value: 'latebeginner',
		icon: ArrowDown
	},
	{
		label: 'Early Intermediate',
		value: 'earlyintermediate',
		icon: ArrowDown
	},
	{
		label: 'Intermediate',
		value: 'intermediate',
		icon: ArrowDown
	},
	{
		label: 'Late Intermediate',
		value: 'lateintermediate',
		icon: ArrowDown
	},
	{
		label: 'Advanced',
		value: 'advanced',
		icon: ArrowDown
	}
];
