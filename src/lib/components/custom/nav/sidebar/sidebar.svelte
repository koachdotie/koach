<script lang="ts">
	import { page } from '$app/stores';
	// @ts-ignore
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	let className: string | null | undefined = undefined;
	export { className as class };

	let items: { href: string; title: string }[];
	items = [
		{ href: '/programs', title: 'Programs' },
		{ href: '/workouts', title: 'Workouts' }
	];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<div class={cn('border-r pb-12', className)}>
	<h2
		class="scroll-m-20 border-b p-4 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		KOACH
	</h2>
	<div class="space-y-4 px-3 py-4">
		<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Library</h2>
		<!-- 
			Taken from the shadcn-svelte example
			https://github.com/huntabyte/shadcn-svelte/blob/main/apps/www/src/routes/examples/forms/(components)/sidebar-nav.svelte
		 -->
		<div class="space-y-1">
			{#each items as item}
				{@const isActive = $page.url.pathname === item.href}

				<Button
					href={item.href}
					variant="ghost"
					class={cn(
						!isActive && 'hover:underline',
						'relative w-full justify-start hover:bg-transparent'
					)}
					data-sveltekit-noscroll
				>
					{#if isActive}
						<div
							class="absolute inset-0 rounded-md bg-muted"
							in:send={{ key: 'active-sidebar-tab' }}
							out:receive={{ key: 'active-sidebar-tab' }}
						/>
					{/if}
					<div class="relative">
						{item.title}
					</div>
				</Button>
			{/each}
		</div>
	</div>
</div>
