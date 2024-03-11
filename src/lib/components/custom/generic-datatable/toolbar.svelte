<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { ViewOptions } from '.';
	import type { TableViewModel } from 'svelte-headless-table';
	// import { Button } from '$lib/components/ui/button';
	// import { Plus } from 'lucide-svelte';
	import type { Writable } from 'svelte/store';
    import type { Program } from '$lib/data/program/program-scheme';

	export let tableModel: TableViewModel<Program>;

	const { pluginStates } = tableModel;
	const {
		filterValue
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	export let hidableCols: string[];

	// const {
	// 	filterValues
	// }: {
	// 	filterValues: Writable<{
	// 		experienceLevel: string[];
	// 		modality: string[];
	// 	}>;
	// } = pluginStates.colFilter;

	// $: showReset = Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0);
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="search"
			bind:value={$filterValue}
		/>

		<!-- {#if showReset}
			<Button
				on:click={() => {
					$filterValue = '';
					$filterValues.modality = [];
					$filterValues.experienceLevel = [];
				}}
				variant="ghost"
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<Plus class="ml-2 h-4 w-4" />
			</Button>
		{/if} -->
	</div>

	<ViewOptions {tableModel} {hidableCols}/>
</div>
