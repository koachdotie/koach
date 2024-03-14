<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	import { auth } from '$lib/firebase/firebase.client.js';
	import { session } from '$lib/firebase/session.js';

	import { afterRegister } from '$lib/firebase/helpers/route.helper.js';
	import { LoaderIcon } from 'lucide-svelte';
	let className: string | undefined | null = undefined;
	export { className as class };
	let isLoading = false;

	export let data: any;

	let { supabase } = data;
	$: ({ supabase } = data);

	const handleSignUp = async () => {
		await supabase.auth.signInWithPopup({
			provider: 'google',
			options: {
				redirectTo: `https://ygeaowexmypsyisfgjpl.supabase.co/auth/v1/callback`
			}
		});
	};

	const handleSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `https://ygeaowexmypsyisfgjpl.supabase.co/auth/v1/callback`
			}
		});
	};

	async function handleSignInOld(provider: GoogleAuthProvider) {
		isLoading = true;
		try {
			const userCredential = await signInWithPopup(auth, provider);
			const user = userCredential.user;
			const token = await user.getIdToken();

			await fetch('/auth/session', {
				method: 'POST',
				headers: {
					authorization: `Bearer ${token}`
				},
				credentials: 'include'
			});

			session.update((currentSession) => ({
				...currentSession,
				user: user,
				loggedIn: true
			}));

			console.log('User signed in as', user.email);
			afterRegister($page.url, user, true);
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
		on:click={handleSignIn}
	>
		{#if isLoading}
			<LoaderIcon class="m-auto animate-spin" style="width: 1rem; height: 1rem;" />
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				><title>google</title><path
					d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
				/></svg
			>
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
