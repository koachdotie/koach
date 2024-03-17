<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { ViewOptions } from '..';
	import type { TableViewModel } from 'svelte-headless-table';
	import type { Writable } from 'svelte/store';
	import CreateProgram from '../../dialogs/create-program/create-program.svelte';
	import type { PageData } from '../../../../../routes/(app)/programs/$types';
	export let tableModel: TableViewModel<any>;

	const { pluginStates } = tableModel;
	const {
		filterValue
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	export let hidableCols: string[];

	export let pageData: PageData;
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="search"
			bind:value={$filterValue}
		/>

		<CreateProgram dialogData={pageData.form} data={pageData} />
	</div>

	<ViewOptions {tableModel} {hidableCols} />
</div>
