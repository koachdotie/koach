<script lang="ts">
	import { SlidersHorizontal } from "lucide-svelte";
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import type { Program } from "$lib/data/program/program";
	import type { TableViewModel } from "svelte-headless-table";

	export let tableModel: TableViewModel<Program>;
	const { pluginStates, flatColumns } = tableModel;
	const { hiddenColumnIds } = pluginStates.hide;

	const ids = flatColumns.map((col: { id: string }) => col.id);

	let hideForId = Object.fromEntries(ids.map((id: string) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const hidableCols = ["description", "modality", "experiencelevel"];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex" builders={[builder]}>
			<SlidersHorizontal class="mr-2 h-4 w-4" />
			View
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Label>Toggle columns</DropdownMenu.Label>
		<DropdownMenu.Separator />
		{#each flatColumns as col}
			{#if hidableCols.includes(col.id)}
				<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
					{col.header}
				</DropdownMenu.CheckboxItem>
			{/if}
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
