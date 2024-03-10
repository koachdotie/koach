<script lang="ts">
	export let potentialValues: EnumValueScheme[] = [];
	console.log(potentialValues);
	export let value: string;

	const enumValue = potentialValues.find((enumValue) => enumValue.value === value);
</script>

<script lang="ts" context="module">
	import type { ComponentType } from "svelte";

	export type EnumValueScheme = {
		value: string;
		label: string;
		icon?: ComponentType;
	};
</script>

{#if enumValue}
	<div class="flex items-center">
		{#if enumValue.icon}
			<svelte:component this={enumValue.icon} class="mr-2 h-4 w-4 text-muted-foreground" />
		{/if}
		<span>{enumValue.label}</span>
	</div>
{:else}
	<div class="flex space-x-2">
		<span class="max-w-[500px] truncate font-medium">
			{value}
		</span>
	</div>
{/if}
