<script lang="ts">
	import { MoreHorizontal } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { z } from 'zod';
	export let row: typeof z.object;
	// export let schema;
	// const row = schema.parse(row);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
		>
			<MoreHorizontal class="h-4 w-4" />
			<span class="sr-only">Open menu</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[160px]" align="end">
		<DropdownMenu.Item>Edit</DropdownMenu.Item>
		<DropdownMenu.Item>Make a Copy</DropdownMenu.Item>

		<DropdownMenu.Separator />

		<!-- <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Tags</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
				<DropdownMenu.RadioGroup value={row.tags}>

					{#each modalities as modality}
						<DropdownMenu.RadioItem value={row.tags}>
							{modality.label}
						</DropdownMenu.RadioItem>
					{/each}
				</DropdownMenu.RadioGroup>
			</DropdownMenu.SubContent>
        </DropdownMenu.Sub> -->

		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			Delete
			<DropdownMenu.Shortcut>⌘⌫</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
