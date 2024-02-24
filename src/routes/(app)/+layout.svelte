<script lang="ts">
    import { ModeWatcher } from 'mode-watcher';
    import Navmenu from '$lib/components/custom/nav/navmenu/navmenu.svelte';
    import Sidebar from '$lib/components/custom/nav/sidebar/sidebar.svelte';
</script>

<ModeWatcher />

<div class="min-h-screen md:flex md:flex-row">
    <div class="border-t bg-background md:w-64"> <!-- Adjust the width as needed -->
        <Sidebar />
    </div>

    <div class="flex-1">
        <div class="hidden md:block">
            <div class="border-t bg-background">
                <div class="relative flex min-h-screen flex-col">
                    <div class="ml-auto flex items-center space-x-4">
                        <!-- <Search /> -->
                        <Navmenu />
                    </div>
					<div class="overflow-hidden rounded-[0.5rem] border bg-background shadow-xl"></div>

                    <slot />
                </div>
            </div>
        </div>
    </div>
</div>
