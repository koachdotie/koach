<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { SquarePen } from 'lucide-svelte';
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



		
		<Dialog.Footer>
			<Button variant="ghost" size="sm" class="ml-auto hidden h-8 lg:flex" type="submit">Save</Button>
            <Button variant="destructive" size="sm" class="mr-auto hidden h-8 lg:flex" type="reset">Cancel</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
