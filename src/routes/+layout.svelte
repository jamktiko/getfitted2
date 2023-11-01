<script>
	import '../app.css';
	import { showContent } from '$lib/stores/layoutStore';
	import Navbar from '$lib/components/NavBar.svelte';
</script>

{#if $showContent}
	<div>
		<header class="flex justify-center items-center py-4 px-4 sm:px-6" >
			<img src="/images/Logo.png" alt="logo" class="w-auto h-auto sm:h-16"/>
		</header>
	</div>
	<Navbar />
{/if}

<slot />
