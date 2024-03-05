<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { DataTableFacetedFilter, DataTableViewOptions } from '.';
	import type { Program } from '$lib/data/program/program';
	import type { TableViewModel } from 'svelte-headless-table';
	import { Button } from '$lib/components/ui/button';
	import { Plus } from 'lucide-svelte';
	import { experienceLevels, modalities } from '../(data)/data';
	import type { Writable } from 'svelte/store';

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
			experienceLevel: string[];
			modalities: string[];
		}>;
	} = pluginStates.colFilter;

	$: showReset = Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0);
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter tasks..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="search"
			bind:value={$filterValue}
		/>

		<DataTableFacetedFilter
			bind:filterValues={$filterValues.experienceLevel}
			title="Experience Level"
			options={experienceLevels}
		/>
		<DataTableFacetedFilter
			bind:filterValues={$filterValues.modalities}
			title="Modality"
			options={modalities}
		/>
		{#if showReset}
			<Button
				on:click={() => {
					$filterValue = '';
					$filterValues.modalities = [];
					$filterValues.experienceLevel = [];
				}}
				variant="ghost"
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<Plus class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>

	<DataTableViewOptions {tableModel} />
</div>
