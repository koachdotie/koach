<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils/utils.js';
	import { page } from '$app/stores';
	import { afterRegister } from '$lib/helpers/route.helper';
	import { LoaderIcon } from 'lucide-svelte';
	import type { PageData } from '../../../../routes/(app)/$types';
	let className: string | undefined | null = undefined;
	export { className as class };
	let isLoading = false;

	export let data: PageData;

	let { supabase } = data;
	$: ({ supabase } = data);

	// const handleSignUp = async () => {
	// 	let authResult = await supabase.auth.signInWithOAuth({
	// 		provider: 'google',
	// 		options: {
	// 			redirectTo: `https://ygeaowexmypsyisfgjpl.supabase.co/auth/v1/callback`
	// 		}
	// 	});

	// 	console.log(authResult);
	// };

	const handleSignIn = async () => {
		console.log('handleSignIn');
		await supabase.auth
			.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `https://ygeaowexmypsyisfgjpl.supabase.co/auth/callback`
					// queryParams: {
					// 	access_type: 'offline',
					// 	prompt: 'consent'
					// }
				}
			})
			.catch((err) => {
				console.log('login error', err);
				throw err;
			});
	};
</script>

<div class={cn('flex justify-center gap-4', className)} {...$$restProps}>
	<Button
		variant="ghost"
		type="button"
		disabled={isLoading}
		class="flex h-12 w-12 items-center justify-center"
		on:click={handleSignIn}
	>
		{#if isLoading}
			<LoaderIcon class="m-auto animate-spin" style="width: 1rem; height: 1rem;" />
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				stroke="currentColor"
				fill="currentColor"
				class="h-6 w-6"
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
<!-- <div class="mt-6 text-center">
	<span class="font- bg-background px-2 text-muted-foreground">
		Already a Koach? <a href="/login" class="text-primary hover:underline">Login</a>
	</span>
</div> -->
