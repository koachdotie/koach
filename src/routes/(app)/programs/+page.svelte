<script lang="ts">
	import { GenericDataTable } from '$lib/components/custom/generic-datatable';
	import rawdata from './programs.json';
	import type { TableColumnKey } from '$lib/components/custom/generic-datatable/column/column-schema';
	import { potentialValues } from '../../../lib/data/program/program-enums';
	import { programSchema, type Program } from '$lib/data/program/program-scheme';
	import { z } from 'zod';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	console.log('\n=> +page.svelte session userId: ', session?.user.id);

	let programData: Program[] = z.array(programSchema).parse(rawdata);
	$: if (rawdata) {
		try {
			const parsedData = z.array(programSchema).parse(rawdata);
			programData = parsedData;
		} catch (error) {
			console.error('Data validation error:', error);
		}
	}
	let tableColumnKeys: TableColumnKey[] = [
		{
			accessor: 'name',
			id: 'name',
			header: 'Name'
		},
		{
			accessor: 'description',
			id: 'description',
			header: 'Description'
		},
		{
			accessor: 'modality',
			id: 'modality',
			header: 'Modality'
		},
		{
			accessor: 'experienceLevel',
			id: 'experienceLevel',
			header: 'Experience Level'
		}
	];
</script>

<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Programs</h2>
			<p class="text-muted-foreground">Blah blah im a cool data table blah</p>
		</div>
	</div>
	<GenericDataTable data={programData} {tableColumnKeys} {potentialValues} pageData={data} />
</div>
