<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let program = data.program;
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
				<Breadcrumb.Page>
					{program ? program.name : 'Loading...'}
				</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>
</div>

<Calendar />
