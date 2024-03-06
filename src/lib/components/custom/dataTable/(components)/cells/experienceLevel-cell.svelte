<script lang="ts">
	import { experiencelevels } from '../../(data)/data';
	export let value: string;
	const expLevel = experiencelevels.find((expLevel) => expLevel.value === value);
</script>

{#if expLevel}
	<div class="flex w-[100px] items-center">
		<span>{expLevel.label}</span>
	</div>
{/if}
