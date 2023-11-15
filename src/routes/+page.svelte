<script>
	import { onMount, onDestroy } from 'svelte';
	import { showContent } from '$lib/stores/layoutStore';
	import GoogleSignIn from '../lib/components/GoogleSignIn.svelte';

	let usersName = '';
	let passWord = '';

	onMount(() => {
		showContent.set(false);
	});

	onDestroy(() => {
		showContent.set(true);
	});
</script>

<main class="min-h-screen flex flex-col justify-center items-center p-4">
	<div class="mb-4">
		<img src="/icons/logogf.png" alt="logo" class="max-w-full h-auto" />
		<GoogleSignIn />
	</div>
</main>

<style>
</style>
