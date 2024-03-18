<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
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

<div class="flex h-screen flex-col">
	<!-- Use flex-grow on each grid container to evenly distribute vertical space -->
	<div class="flex flex-grow items-center justify-center">
		<div class="grid w-full grid-cols-7 gap-4">
			<!-- Assuming you want each column to stretch across the full width -->
			<div class="col-span-1 flex items-center justify-center border">column 1</div>
			<div class="col-span-1 flex items-center justify-center border">column 2</div>
			<div class="col-span-1 flex items-center justify-center border">column 3</div>
			<div class="col-span-1 flex items-center justify-center border">column 4</div>
			<div class="col-span-1 flex items-center justify-center border">column 5</div>
			<div class="col-span-1 flex items-center justify-center border">column 6</div>
			<div class="col-span-1 flex items-center justify-center border">column 7</div>
		</div>
	</div>
	<div class="flex flex-grow items-center justify-center">
		<div class="grid w-full grid-cols-7 gap-4">
			<!-- Assuming you want each column to stretch across the full width -->
			<div class="col-span-1 flex items-center justify-center border">column 1</div>
			<div class="col-span-1 flex items-center justify-center border">column 2</div>
			<div class="col-span-1 flex items-center justify-center border">column 3</div>
			<div class="col-span-1 flex items-center justify-center border">column 4</div>
			<div class="col-span-1 flex items-center justify-center border">column 5</div>
			<div class="col-span-1 flex items-center justify-center border">column 6</div>
			<div class="col-span-1 flex items-center justify-center border">column 7</div>
		</div>
	</div>
</div>
