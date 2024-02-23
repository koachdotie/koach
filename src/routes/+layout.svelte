<script lang="ts">
	import SideBar from '../lib/components/custom/nav/sidebar/sidebar.svelte';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />

<div class="hidden min-h-screen md:block">
	<div class="border-t bg-background">
		<div class="grid lg:grid-cols-5">
			<SideBar />

			<div class="relative flex min-h-screen flex-col">
				<slot />
			</div>
		</div>
	</div>
</div>

<div class="overflow-hidden rounded-[0.5rem] border bg-background shadow-xl"></div>
