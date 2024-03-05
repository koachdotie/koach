<script lang="ts">
	// @ts-ignore
	import { DataTable } from '$lib/components/custom/dataTable';
	import { ExperienceLevel, Modality, Program } from '$lib/data/program/program.js';

	let rowItems: Program[] = [
		new Program(
			'uid1',
			undefined,
			'Program 1',
			'This is the first program',
			Modality.Hypertrophy,
			ExperienceLevel.Beginner,
			[]
		),
		new Program(
			'uid2',
			undefined,
			'Program 2',
			'This is the second program',
			Modality.Hypertrophy,
			ExperienceLevel.LateIntermediate,
			[]
		),
		new Program(
			'uid3',
			undefined,
			'Program 3',
			'This is the third program',
			Modality.Powerbuilding,
			ExperienceLevel.LateBeginner,
			[]
		),
		new Program(
			'uid4',
			undefined,
			'Program 4',
			'This is the fourth program',
			Modality.Cardiovascular,
			ExperienceLevel.Intermediate,
			[]
		),
		new Program(
			'uid5',
			undefined,
			'Program 5',
			'This is the fifth program',
			Modality.SportSpecific,
			ExperienceLevel.Advanced,
			[]
		)
	];
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

<DataTable {rowItems} />
