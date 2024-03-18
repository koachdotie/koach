<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { page } from '$app/stores';
	import { type Program } from '$lib/data/program/program-scheme';
	import { fetchProgram } from '$lib/supabase/supabase';
	import { onMount } from 'svelte';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';

  let programId = $page.params.program;
  let program: Program;


  onMount(async () => {
	let result = await fetchProgram(programId);
    if (result) {
		program = await fetchProgram(programId) as Program;
	}
  });

</script>

<div class="mb-4">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/programs">Programs</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>{programId}</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
	</Breadcrumb.Root>
</div>


<Calendar />