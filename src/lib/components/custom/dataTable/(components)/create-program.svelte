<script lang="ts" context="module">
	import { z } from 'zod';
	import { programSchema } from '../(data)/schemas';
</script>

<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Dialog from '$lib/components/ui/dialog';
	import { browser } from '$app/environment';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	let data: SuperValidated<Infer<typeof programSchema>>;
	export { data as form };
	
	const form = superForm(data, {
		validators: zodClient(programSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success('Program created: ' + JSON.stringify(f.data, null, 2));
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root>
	<Dialog.Trigger asChild>
		<Button variant="secondary" size="sm">Create a Program</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[625px]">
		<Dialog.Header>
			<Dialog.Title>Create Program</Dialog.Title>
		</Dialog.Header>
		<form action="?/create-program" method="POST" class="space-y-6" use:enhance>
			<div class="grid gap-4 py-4">
				{#each Object.keys(programSchema.shape) as key (key)}
					<div class="grid gap-2">
						<Label for={key}>{key}</Label>
						<Input id={key} placeholder={`Enter ${key}...`} bind:value={$formData[key]} />
					</div>
				{/each}
			</div>
			<Dialog.Footer>
				<Button type="submit">Create</Button>
			</Dialog.Footer>
			{#if browser}
				<SuperDebug data={$formData} />
			{/if}
		</form>
	</Dialog.Content>
</Dialog.Root>
