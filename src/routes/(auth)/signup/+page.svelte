<script lang="ts">
	import Auth from '$lib/components/custom/auth/auth.svelte';
</script>

<title>Sign Up - Koach</title>

<div
	class="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div class="relative flex h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div
			class="absolute inset-0 bg-cover"
			style="background-image: url(https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=3428&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);"
		></div>
		<div class="relative z-20 flex items-center text-lg font-medium">Koach Ltd</div>
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
				<p class="text-sm text-muted-foreground">Choose a platform to create your account with.</p>
			</div>
			<Auth />
			<p class="px-8 text-center text-sm text-muted-foreground">
				By continuing, you are agreeing to our
				<a
					target="”_blank”"
					href="https://termify.io/terms-and-conditions/idL7IO4DHK"
					class="underline underline-offset-4 hover:text-primary"
				>
					Terms of Service
				</a>
				and
				<a
					target="”_blank”"
					href="https://termify.io/privacy-policy/OaexyPr85s"
					class="underline underline-offset-4 hover:text-primary"
				>
					Privacy Policy
				</a>
			</p>
		</div>
	</div>
</div>
