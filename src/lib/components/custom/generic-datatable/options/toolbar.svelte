<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { ViewOptions } from '..';
	import type { TableViewModel } from 'svelte-headless-table';
	import type { Writable } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';
	import { SquarePen } from 'lucide-svelte';

	export let tableModel: TableViewModel<any>;

	const { pluginStates } = tableModel;
	const {
		filterValue
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	export let hidableCols: string[];
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="search"
			bind:value={$filterValue}
		/>

		<Button variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex">
			<SquarePen class="mr-2 h-4 w-4" />
			Create
		</Button>
	</div>

	<ViewOptions {tableModel} {hidableCols} />
</div>
