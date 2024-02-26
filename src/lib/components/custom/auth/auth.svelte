<script lang="ts">
	// @ts-ignore
	import { Icons } from '$lib/components/icons';
	// @ts-ignore
	import { Button } from '$lib/components/ui/button';
	// @ts-ignore
	import { cn } from '$lib/utils.js';

	import {
		signInWithPopup,
		GoogleAuthProvider,
		setPersistence,
		browserLocalPersistence
	} from 'firebase/auth';
	import { auth } from '$lib/firebase/firebase.client.js';
	import { session } from '$lib/firebase/session.js';
	import { page } from '$app/stores';
	import { afterRegister } from '$lib/firebase/helpers/route.helper.js';
	let className: string | undefined | null = undefined;
	export { className as class };
	let isLoading = false;

	async function handleGoogleSignIn() {
		isLoading = true;
		try {
			setPersistence(auth, browserLocalPersistence).then(async () => {
				const user = await signInWithPopup(auth, new GoogleAuthProvider()).then(
					(userCredential) => {
						const retrievedUser = userCredential?.user;
						session.update((currentSession) => ({
							...currentSession,
							retrievedUser,
							loggedIn: true
						}));
						return retrievedUser;
					}
				);

				console.log('User signed in with email:', user.email);

				afterRegister($page.url, user);
			});
		} catch (error) {
			console.error('Error signing in with Google:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<div class={cn('flex justify-center gap-4', className)} {...$$restProps}>
	<Button
		variant="outline"
		type="button"
		disabled={isLoading}
		class="flex h-12 w-12 items-center justify-center"
		on:click={handleGoogleSignIn}
	>
		{#if isLoading}
			<Icons.spinner class="m-auto animate-spin" style="width: 1rem; height: 1rem;" />
		{:else}
			<Icons.google class="m-auto" style="width: 1rem; height: 1rem;" />
		{/if}
	</Button>
	<Button
		variant="disabled"
		type="button"
		disabled={isLoading}
		class="flex h-12 w-12 items-center justify-center"
	>
		{#if isLoading}
			<Icons.spinner class="m-auto animate-spin" style="width: 1rem; height: 1rem;" />
		{:else}
			<Icons.facebook class="m-auto" style="width: 1rem; height: 1rem;" />
		{/if}
	</Button>

	<Button
		variant="disabled"
		type="button"
		disabled={isLoading}
		class="flex h-12 w-12 items-center justify-center"
	>
		{#if isLoading}
			<Icons.spinner class="m-auto animate-spin" style="width: 1rem; height: 1rem;" />
		{:else}
			<Icons.apple class="m-auto" style="width: 1rem; height: 1rem;" />
		{/if}
	</Button>
</div>

<!-- 
TODO: Move the below to some other place
This should only be on sign up page.
-->
<div class="mt-6 text-center">
	<span class="font- bg-background px-2 text-muted-foreground">
		Already a Koach? <a href="/login" class="text-primary hover:underline">Login</a>
	</span>
</div>
