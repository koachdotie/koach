<script lang="ts">
	import { GenericDataTable } from '$lib/components/custom/generic-datatable';
	import rawdata from './programs.json';
	import type { TableColumnKey } from '$lib/components/custom/generic-datatable/column/column-schema';
	import { programSchema, type Program } from '$lib/data/program/program-scheme';
	import { z } from 'zod';

	let schema = programSchema;

	let data: Program[] = z.array(programSchema).parse(rawdata);
	$: if (rawdata) {
		try {
			const parsedData = z.array(programSchema).parse(rawdata);
			data = parsedData;
		} catch (error) {
			console.error('Data validation error:', error);
		}
	}
</script>

<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Programs</h2>
			<p class="text-muted-foreground">Blah blah im a cool data table blah</p>
		</div>
	</div>
	<GenericDataTable {data} />
</div>
