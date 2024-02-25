<script lang="ts">
	// @ts-ignore
	import { Icons } from '$lib/components/icons';
	// @ts-ignore
	import { Button } from '$lib/components/ui/button';
	// @ts-ignore
	import { cn } from '$lib/utils.js';

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
</script>

<div class={cn('flex justify-center gap-4', className)} {...$$restProps}>
	<Button
		variant="outline"
		type="button"
		disabled={isLoading}
		class="flex h-12 w-12 items-center justify-center"
	>
		{#if isLoading}
			<Icons.spinner class="m-auto animate-spin" style="width: 1rem; height: 1rem;" />
		{:else}
			<Icons.google class="m-auto" style="width: 1rem; height: 1rem;" />
		{/if}
	</Button>

	<Button
		variant="disabled"
		type="button"
		disabled={isLoading}
		class="flex h-12 w-12 items-center justify-center"
	>
		{#if isLoading}
			<Icons.spinner class="m-auto animate-spin" style="width: 1rem; height: 1rem;" />
		{:else}
			<Icons.facebook class="m-auto" style="width: 1rem; height: 1rem;" />
		{/if}
	</Button>

	<Button
		variant="disabled"
		type="button"
		disabled={isLoading}
		class="flex h-12 w-12 items-center justify-center"
	>
		{#if isLoading}
			<Icons.spinner class="m-auto animate-spin" style="width: 1rem; height: 1rem;" />
		{:else}
			<Icons.apple class="m-auto" style="width: 1rem; height: 1rem;" />
		{/if}
	</Button>
</div>

<!-- 
	TODO: Move the below to some other place
	This should only be on sign up page.
 -->
<div class="mt-6 text-center">
	<span class="bg-background px-2 font- text-muted-foreground">
		Already a Koach? <a href="/login" class="text-primary hover:underline">Login</a>
	</span>
</div>
