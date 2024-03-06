<script lang="ts">
	import { experiencelevels } from '../../(data)/data';
	export let value: string;
	const expLevel = experiencelevels.find((expLevel) => expLevel.value === value);
	const Icon = expLevel?.icon;
</script>

{#if expLevel}
	<div class="flex w-[100px] items-center">
		{#if Icon}
			<svelte:component this={Icon} class="mr-2 h-4 w-4 text-muted-foreground" />
		{/if}
		<span>{expLevel.label}</span>
	</div>
{/if}
