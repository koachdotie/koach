<script lang="ts">
	import '../app.pcss';

	import { invalidate } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import type { Subscription } from '@supabase/supabase-js';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let subscription: Subscription;

	$: ({ supabase, session } = data);

	onMount(async () => {
		if (supabase) {
			const { data } = supabase.auth.onAuthStateChange((event, _session) => {
				if (_session?.expires_at !== session?.expires_at) {
					invalidate('supabase:auth');
				}
			});
			subscription = data.subscription;
			console.log('\n=> +layout.svelte session userId: ', session?.user.id);
		}
	});

	onDestroy(() => {
		if (typeof subscription !== 'undefined') {
			subscription.unsubscribe();
		}
	});
</script>

<slot />
