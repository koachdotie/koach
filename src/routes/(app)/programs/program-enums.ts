import type { EnumValueScheme } from '$lib/components/custom/generic-datatable/generic-cell.svelte';
import { experienceLevels, modalities } from '$lib/data/program/program-scheme';

export const potentialValues: Map<string, EnumValueScheme[]> = new Map([
	['modality', modalities],
	['experienceLevel', experienceLevels]
]);
