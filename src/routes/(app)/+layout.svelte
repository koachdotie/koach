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

<div class="min-h-screen md:flex md:flex-row">
	<div class="border-t bg-background md:w-64">
		<Sidebar />
	</div>

	<div class="flex-1">
		<div class="hidden md:block">
			<div class="border-t bg-background">
				<div class="relative flex min-h-screen flex-col">
					<div class="ml-auto flex items-center space-x-4">
						<Navmenu {data} />
					</div>
					<div class="overflow-hidden rounded-[0.5rem] border bg-background shadow-xl"></div>

					<div class="m-8">
						<slot />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
