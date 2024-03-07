<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { CreateProgramButton, DataTableFacetedFilter, DataTableViewOptions } from '.';
	import type { TableViewModel } from 'svelte-headless-table';
	import { Button } from '$lib/components/ui/button';
	import { Plus } from 'lucide-svelte';
	import { experiencelevels, modalities } from '../(data)/data';
	import type { Writable } from 'svelte/store';
	import type { Program } from '../(data)/schemas';

	export let tableModel: TableViewModel<Program>;

	const { pluginStates } = tableModel;
	const {
		filterValue
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	const {
		filterValues
	}: {
		filterValues: Writable<{
			experiencelevel: string[];
			modality: string[];
		}>;
	} = pluginStates.colFilter;


	$: showReset = Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0);
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter programs..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="search"
			bind:value={$filterValue}
		/>

		<DataTableFacetedFilter
			bind:filterValues={$filterValues.experiencelevel}
			title="Experience Level"
			options={experiencelevels}
		/>
		<DataTableFacetedFilter
			bind:filterValues={$filterValues.modality}
			title="Modality"
			options={modalities}
		/>
		{#if showReset}
			<Button
				on:click={() => {
					$filterValue = '';
					$filterValues.modality = [];
					$filterValues.experiencelevel = [];
				}}
				variant="ghost"
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<Plus class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>

	<!-- <CreateProgramButton  /> -->

	<DataTableViewOptions {tableModel} />

</div>
