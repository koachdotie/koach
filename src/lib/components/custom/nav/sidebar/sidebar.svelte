<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import { HomeIcon, NotebookTabs } from 'lucide-svelte';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { includes } from 'valibot';

	let className: string | null | undefined = undefined;
	export { className as class };

	let library: { href: string; title: string; icon: any }[] = [
		{ href: '/', title: 'Dashboard', icon: HomeIcon },
		{ href: '/programs', title: 'Programs', icon: NotebookTabs }
	];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<div class={cn('border-r pb-12', className)}>
	<div class="space-y-4 px-3 py-4">
		<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Library</h2>
		<!-- 
			Taken from the shadcn-svelte example
			https://github.com/huntabyte/shadcn-svelte/blob/main/apps/www/src/routes/examples/forms/(components)/sidebar-nav.svelte
		 -->
		<div class="space-y-1">
			{#each library as item}
				{@const isActive =
					$page.url.pathname === item.href ||
					($page.url.pathname.startsWith(item.href) && item.href !== '/')}
				<div class="!my-4">
					<Button
						href={item.href}
						variant="ghost"
						class={cn(
							'relative flex w-full items-center justify-start hover:bg-transparent',
							!isActive && 'hover:underline',
							isActive ? 'text-white' : 'text-gray-400' // Active items are white, others are grey
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

						<div class="relative flex">
							<svelte:component
								this={item.icon}
								class={isActive ? 'mr-4 text-white' : 'mr-4 text-gray-400'}
							/>
							<span class={isActive ? 'text-white' : 'text-gray-400'}>
								{item.title}
							</span>
						</div>
					</Button>
				</div>
			{/each}
		</div>
	</div>
</div>
