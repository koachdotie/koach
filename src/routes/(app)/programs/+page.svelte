<script lang="ts">
	import { GenericDataTable } from '$lib/components/custom/generic-datatable';
	import type { TableColumnKey } from '$lib/components/custom/generic-datatable/column/column-schema';
	import { potentialValues } from '$lib/data/program/program-enums';
	import { fetchPrograms } from '$lib/supabase/supabase';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: programs = data.programs;

	async function refreshPrograms() {
		programs = await fetchPrograms();
	}

	onMount(() => {
		refreshPrograms();
	});

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
	<GenericDataTable data={programs} {tableColumnKeys} {potentialValues} pageData={data} />
</div>
