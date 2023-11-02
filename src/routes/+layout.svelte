<script>
	import '../app.css';
	import { showContent } from '$lib/stores/layoutStore';
	import Navbar from '$lib/components/NavBar.svelte';
</script>

{#if $showContent}
	<div>
		<header class="flex justify-center items-center py-4 px-4 sm:px-6 md:mb-8">
			<img src="/images/GET FITTED.jpeg" alt="logo" class="w-auto h-10 sm:h-16" />
		</header>
	</div>
	<Navbar />
{/if}

<slot />
