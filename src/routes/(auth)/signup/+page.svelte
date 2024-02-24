<script lang="ts">
	import Auth from '$lib/components/custom/auth/auth.svelte';
	// @ts-ignore
	import { Button } from '$lib/components/ui/button';
</script>

<div
	class="container relative flex flex-col items-center justify-center min-h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button href="/authentication" variant="ghost" class="absolute right-4 top-4 md:right-8 md:top-8">
		Login
	</Button>
	<div class="relative flex h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div
			class="absolute inset-0 bg-cover"
			style="background-image: url(https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=3428&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);"
		></div>
		<div class="relative z-20 flex items-center text-lg font-medium">
			<a href="/">
				Koach Ltd
			</a>
		</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					&ldquo;This library has saved me countless hours of work and helped me deliver stunning
					designs to my clients faster than ever before. Highly recommended!&rdquo;
				</p>
				<footer class="text-sm">Sofia Davis</footer>
			</blockquote>
		</div>
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
				<p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
			</div>
			<Auth />
			<p class="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our
				<a href="/terms" class="underline underline-offset-4 hover:text-primary">
					Terms of Service
				</a>
				and
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
					Privacy Policy
				</a>.
			</p>
		</div>
	</div>
</div>
