<script lang="ts">
	import DataTable from "./(components)/data-table.svelte";
	import data from "./(data)/tasks.json";
</script>
<!-- 
	MAYBE COME BACK TO THIS LATER
	ACTUALLY PRETTY HANDY
	THE md:hidden HIDES THAT ON LARGETR SCREENS BUT FOR MOBILE IT SHOWS 
-->
<!-- <div class="md:hidden">
	<img src="/examples/tasks-light.png" alt="Tasks" class="block dark:hidden" />
	<img src="/examples/tasks-dark.png" alt="Tasks" class="hidden dark:block" />
</div> -->
<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
			<p class="text-muted-foreground">Here's a list of your tasks for this month!</p>
		</div>
	</div>
	<DataTable {data} />
</div>
