<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { CalendarIcon, Check, ChevronLeft, ChevronRight, PlusSquare } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let program = data.program;

	let days = new Map<string, []>([
		['Day 1', []],
		['Day 2', []],
		['Day 3', []],
		['Day 4', []],
		['Day 5', []],
		['Day 6', []],
		['Day 7', []],
		['Day 8', []],
		['Day 9', []],
		['Day 10', []],
		['Day 11', []],
		['Day 12', []],
		['Day 13', []],
		['Day 14', []]
	]);
</script>

<div class="m-8 flex min-h-screen w-full flex-col">
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

	<div>
		<Button
			variant="secondary"
			size="sm"
			class="pointer-events-nonegroup-hover:pointer-events-auto my-4"
		>
			<CalendarIcon size="20" class="mr-2" /> Today
		</Button>

		<!-- Left Arrow -->
		<Button variant="ghost" size="icon">
			<ChevronLeft size="18" />
		</Button>

		<!--  -->

		<!-- Right Arrow -->
		<Button variant="ghost" size="icon">
			<ChevronRight size="18" />
		</Button>
	</div>

	<div class=" grid flex-grow grid-cols-1 gap-4 pb-28 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
		{#each [...days] as [day, workouts]}
			<Card.Root
				class="h-full w-full rounded-lg bg-white/20 shadow-md transition-all hover:cursor-pointer hover:bg-muted/50"
			>
				<Card.Header>
					<Card.Description class="dark:text-white">{day}</Card.Description>
					<!-- Assuming 'class="white"' was meant to be text color -->
				</Card.Header>
				<Card.Content>+</Card.Content>
				<!-- <Card.Footer>
					<Button
						variant="ghost"
						size="icon"
						class="hover:cursor-pointer"
					>
						<PlusSquare size="20" />
					</Button>
				</Card.Footer> -->
				<Card.Footer>
					<Button variant="outline" class="w-full">
						<Check class="mr-2 h-4 w-4" /> read
					</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
