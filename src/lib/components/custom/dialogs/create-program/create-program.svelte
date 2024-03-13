<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { SquarePen } from 'lucide-svelte';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { type ProgramFormSchema, createProgramSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';

	export let dialogData: SuperValidated<Infer<ProgramFormSchema>>;

	const form = superForm(dialogData, {
		validators: zodClient(createProgramSchema)
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root>
	<Dialog.Trigger let:builder>
		<Button builders={[builder]} variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex">
			<SquarePen class="mr-2 h-4 w-4" />
			Create
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create Program</Dialog.Title>
			<Dialog.Description>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</Dialog.Description>
		</Dialog.Header>

		<form method="POST" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} />
				</Form.Control>
				<Form.Description>This is your public display name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Description</Form.Label>
					<Input {...attrs} bind:value={$formData.description} />
				</Form.Control>
				<Form.Description>This is your public display name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button>Submit</Form.Button>
		</form>

		<Dialog.Footer>
			<Button variant="ghost" size="sm" class="ml-auto hidden h-8 lg:flex" type="submit"
				>Save</Button
			>
			<Button variant="destructive" size="sm" class="mr-auto hidden h-8 lg:flex" type="reset"
				>Cancel</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
