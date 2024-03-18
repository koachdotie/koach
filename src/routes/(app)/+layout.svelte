<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import Navmenu from '$lib/components/custom/nav/navmenu/navmenu.svelte';
	import Sidebar from '$lib/components/custom/nav/sidebar/sidebar.svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;

	let loading: boolean = true;
	let loggedIn: boolean = false;
</script>

<ModeWatcher />

<div class="relative">
	<!-- Sticky Navmenu at the top -->
	<div
		class="sticky top-0 z-50 flex items-center justify-between overflow-hidden rounded-[0.5rem] border bg-background p-2 shadow-xl"
	>
		<div class="flex items-center justify-start">
			<h2 class="ml-4 text-3xl font-semibold tracking-tight transition-colors">KOACH</h2>
		</div>

		<div class="flex items-center justify-end">
			<Navmenu {data} />
		</div>
	</div>

	<!--Sidebar and Slot -->
	<div class="flex min-h-screen">
		<div class="fixed z-40 h-full w-52 border-r bg-background">
			<Sidebar />
		</div>

		<div class="ml-52 flex-1">
			<div class="m-8 h-full overflow-auto">
				<slot />
			</div>
		</div>
	</div>
</div>
