<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoonIcon, SunIcon } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { toggleMode } from 'mode-watcher';
	import { auth } from '$lib/firebase/firebase.client.js';
	import { session } from '$lib/firebase/session';
	import FeedbackPopover from './feedback-popover.svelte';

	// get user from session in layout.svelte of (app)/ as a prop
	var user: any;

	let loading: boolean | undefined = true;
	let loggedIn: boolean | undefined = false;

	session.subscribe((cur: any) => {
		loading = cur?.loading;
		loggedIn = cur?.loggedIn;
		user = cur?.user;
	});

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
		<FeedbackPopover />

		<Button on:click={toggleMode} variant="ghost" size="icon" class="!ml-2">
			<SunIcon
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<MoonIcon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle dark or light mode</span>
		</Button>

		<Button variant="ghost" builders={[builder]} class="relative !m-2 !mr-4 h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8">
				<Avatar.Image src={user ? user.photoURL : ''} alt="@shadcn"></Avatar.Image>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<!-- Use user.email or a placeholder if user is not available -->
				<p class="text-sm font-medium leading-none">{user ? user.displayName : 'User'}</p>
				<p class="text-xs leading-none text-muted-foreground">
					{user ? user.email : 'user@example.com'}
				</p>
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
