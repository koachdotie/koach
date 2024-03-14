<script lang="ts">
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<span class="m-4">im a cool dashboard</span>
