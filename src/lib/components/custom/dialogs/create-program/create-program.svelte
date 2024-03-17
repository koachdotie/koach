<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Input } from '$lib/components/ui/input';
	import { SquarePen } from 'lucide-svelte';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { type ProgramFormSchema, createProgramSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { PageData } from '../../../../../routes/(app)/programs/$types';
	import { createProgram, fetchPrograms } from '$lib/supabase/supabase';

	export let dialogData: SuperValidated<Infer<ProgramFormSchema>>;

	export let data: PageData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	const form = superForm(dialogData, {
		validators: zodClient(createProgramSchema),
		onUpdated: async ({ form: f }) => {
			if (f.valid) {
				console.info('You submitted' + JSON.stringify(f.data, null, 2));

				createProgram(f.data).catch((error) => {
					console.error('Error creating program:', error);
				});

				fetchPrograms().then((programs) => {
					data.programs = programs;
				});
			} else {
				console.error('Please fix the errors in the form.');
			}
		},
		onError: (error) => {
			console.error('Error:', error);
		},
		onResult(event) {
			console.log('Result:', event);
		}
	});

	const { form: formData, enhance } = form;

	$: selectedModality = $formData.modality
		? {
				label: $formData.modality,
				value: $formData.modality
			}
		: undefined;

	$: selectedExperienceLevel = $formData.modality
		? {
				label: $formData.experienceLevel,
				value: $formData.experienceLevel
			}
		: undefined;
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger let:builder>
		<Button builders={[builder]} variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex">
			<SquarePen class="mr-2 h-4 w-4" />
			Create
		</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content class="sm:max-w-[425px]">
		<AlertDialog.Header>
			<AlertDialog.Title>Create Program</AlertDialog.Title>
			<AlertDialog.Description>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<form method="POST" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} placeholder="Betty's Booty Builder v2..." />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Description</Form.Label>
					<Textarea
						{...attrs}
						bind:value={$formData.description}
						name="description"
						placeholder="A brief description of the program..."
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<!-- 
				Modality Selection
			 -->
			<Form.Field {form} name="modality">
				<Form.Control let:attrs>
					<Form.Label>Training Modality</Form.Label>
					<Select.Root
						selected={selectedModality}
						onSelectedChange={(v) => {
							v && ($formData.modality = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select the training modality for the program" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="Hypertrophy" label="Hypertrophy" />
							<Select.Item value="Strength" label="Strength" />
							<Select.Item value="Powerbuilding" label="Powerbuilding" />
							<Select.Item value="Sport-Specific" label="Sport-Specific" />
							<Select.Item value="Power" label="Power" />
							<Select.Item value="Cardiovascular" label="Cardiovascular" />
							<Select.Item value="Flexibility" label="Flexibility" />
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.modality} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- 
				Experience Level Selection
			 -->
			<Form.Field {form} name="experienceLevel">
				<Form.Control let:attrs>
					<Form.Label>Experience Level</Form.Label>
					<Select.Root
						selected={selectedExperienceLevel}
						onSelectedChange={(v) => {
							v && ($formData.experienceLevel = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select the training modality for the program" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="Beginner" label="Beginner" />
							<Select.Item value="Intermediate" label="Intermediate" />
							<Select.Item value="Advanced" label="Advanced" />
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.experienceLevel} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<AlertDialog.Footer class="mt-8">
				<AlertDialog.Cancel class="ml-auto hidden h-8 lg:flex">
					<!-- <Form.Button variant="destructive" size="sm" class="mr-auto hidden h-8 lg:flex"
						>Cancel</Form.Button -->
					Cancel</AlertDialog.Cancel
				>
				<AlertDialog.Action type="submit" class="ml-auto hidden h-8 lg:flex">
					<!-- <Form.Button variant="ghost" size="sm" class="ml-auto hidden h-8 lg:flex"
						>Create</Form.Button -->
					Create
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
