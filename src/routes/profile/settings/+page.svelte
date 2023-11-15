<script>
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { showContent } from '$lib/stores/layoutStore';

	onMount(() => {
		showContent.set(false);
	});

	onDestroy(() => {
		showContent.set(true);
	});

	function logOut() {
		sessionStorage.clear();
		goto('/');
	}
</script>

<main>
	<h1 class="flex justify-center p-12">Settings</h1>
	<div class="grid grid-cols-1 gap-4 mt-4 px-14">
		<h2 class="flex justify-start text-black text-18 font-bold pl-6">General</h2>
		<button class="">Notifications</button>
		<button class="">Language</button>
		<button class="">Privacy</button>
		<button on:click={logOut}>Log out</button>
	</div>
	<div class="grid grid-cols-1 gap-4 mt-4 px-14">
		<h2 class="flex justify-start text-black text-18 font-bold pl-6">About</h2>
		<button class="bg-gray">FAQ</button>
		<button class="">About</button>
	</div>
</main>
