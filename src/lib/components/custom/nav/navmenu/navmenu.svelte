<script lang="ts">
	// @ts-ignore - ignoring below because of weird import error i dont care to fix rn
	import * as Avatar from '$lib/components/ui/avatar';
	// @ts-ignore
	import { Button } from '$lib/components/ui/button';
	// @ts-ignore
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import { MoonIcon, SunIcon } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { toggleMode } from 'mode-watcher';
	import { auth } from '$lib/firebase/firebase.client.js';

	async function handleSignOut() {
		try {
			auth.signOut();

			// goodbye cookkie
			await fetch('/auth/session', {
				method: 'DELETE'
			});

			// back to auth
			await goto('/auth', { invalidateAll: true });
		} catch (error) {
			console.error('Error signing out:', error);
		}
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button on:click={toggleMode} variant="outline" size="icon">
			<SunIcon
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<MoonIcon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>

		<Button variant="ghost" builders={[builder]} class="relative !m-2 h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8">
				<Avatar.Fallback>SC</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">Bryan Keane</p>
				<p class="text-xs leading-none text-muted-foreground">bryan@koach.ie</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				Profile
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				Billing
				<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				Settings
				<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>New Team</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />

		<DropdownMenu.Item on:click={handleSignOut} class="hover:cursor-pointer">
			Log Out
			<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
