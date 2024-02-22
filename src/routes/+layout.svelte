<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	// @ts-ignore - unsure why this is needed but will fix later
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';

	let className: string | null | undefined = undefined;
	export { className as class };
</script>

<ModeWatcher />

<div class="hidden md:block min-h-screen">
  <div class="border-t">
    <div class="bg-background">
      <div class="grid lg:grid-cols-5">
        <div class={cn('pb-12 border-r', className)}>
          <div class="space-y-4 py-4">
            <div class="px-3 py-2">
              <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Library</h2>
              <div class="space-y-1">
                <Button variant="secondary" class="w-full justify-start">Programs</Button>
                <Button variant="ghost" class="w-full justify-start">Workouts</Button>
                <Button variant="ghost" class="w-full justify-start">Radio</Button>
              </div>
            </div>
			<div class="px-3 py-2">
				<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">People</h2>
				<div class="space-y-1">
				  <Button variant="secondary" class="w-full justify-start">Clients</Button>
				  <Button variant="ghost" class="w-full justify-start">Messaging</Button>
				</div>
			  </div>
          </div>
        </div>

        <div class="relative flex min-h-screen flex-col">
          <slot />
        </div>

        <div class="col-span-3 lg:col-span-4 lg:border-l"></div>
      </div>
    </div>
  </div>
</div>

<div class="overflow-hidden rounded-[0.5rem] border bg-background shadow-xl"></div>