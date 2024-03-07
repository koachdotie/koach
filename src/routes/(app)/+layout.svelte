<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import Navmenu from '$lib/components/custom/nav/navmenu/navmenu.svelte';
	import Sidebar from '$lib/components/custom/nav/sidebar/sidebar.svelte';

	import { onMount } from 'svelte';
	import { session } from '$lib/firebase/session.js';
	import type { LayoutData } from './$types.js';

	export let data: LayoutData;

	let loading: boolean = true;
	let loggedIn: boolean = false;

	session.subscribe((cur: any) => {
		loading = cur?.loading;
		loggedIn = cur?.loggedIn;
	});

	onMount(async () => {
		const user: any = await data.getAuthUser();

		const loggedIn = !!user ;
		session.update((cur: any) => {
			loading = false;
			return {
				...cur,
				user,
				loggedIn,
				loading: false
			};
		});
	});
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
						<Navmenu />
					</div>
					<div class="overflow-hidden rounded-[0.5rem] border bg-background shadow-xl"></div>

					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
