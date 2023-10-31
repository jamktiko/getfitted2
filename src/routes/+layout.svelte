<script>
	import '../app.css';
	import { showContent } from '$lib/stores/layoutStore';
	import Navbar from '$lib/components/NavBar.svelte';
</script>

{#if $showContent}
	<div>
		<header class="getfittedlogo">
			<img src="/images/Logo.png" alt="logo" />
		</header>
	</div>
	<Navbar />
{/if}

<slot />
