import type { EnumValueScheme } from "$lib/components/custom/generic-datatable/row/generic-cell.svelte";
import { Dumbbell, PersonStanding, Blocks, Trophy, ArrowDown, Activity } from "lucide-svelte";

export const potentialValues: Map<string, EnumValueScheme[]> = new Map([
    [
        'modality',
        [
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
        ]
    ],
    [
        'experienceLevel',
        [
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
        ]
    ]
]);