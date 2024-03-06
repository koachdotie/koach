<script lang="ts">
	import { modalities } from '../../(data)/data';

	export let value: string;
	const modality = modalities.find((modality) => modality.value === value);
	const Icon = modality?.icon;
</script>

{#if modality}
	<div class="flex items-center">
		{#if Icon}
			<svelte:component this={Icon} class="mr-2 h-4 w-4 text-muted-foreground" />
		{/if}
		<span>{modality.label}</span>
	</div>
{/if}
