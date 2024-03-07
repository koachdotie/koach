<script lang="ts">
	// @ts-ignore
	import { DataTable } from '$lib/components/custom/dataTable';
</script>

<!-- <div class="m-16 flex items-center">
	<Table.Root>
		<Table.Caption>A list of your programs.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head>Name</Table.Head>
				<Table.Head>Description</Table.Head>
				<Table.Head class="w-[150px]">Modality</Table.Head>
				<Table.Head class="w-[150px]">Experience Level</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each rowItems as item}
				<Table.Row>
					<Table.Cell class="font-medium">{item.name}</Table.Cell>
					<Table.Cell>{item.description}</Table.Cell>
					<Table.Cell>{item.modality}</Table.Cell>
					<Table.Cell>{item.experienceLevel}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div> -->

<DataTable />
