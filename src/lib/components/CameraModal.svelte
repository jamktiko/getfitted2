<script>
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let showModal = false;

	function closeModal() {
		showModal = false;
		dispatch('closeModal');
	}
</script>

<div class="z-50 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
	<div class="flex flex-col bg-grey p-12 bg-opacity-90 rounded-lg text-white font-heebo text-sm">
		<button
			class="p-2 border-gray-100 rounded-full border mb-2 px-4"
			on:click={() => goto('/camera')}>Open camera</button
		>
		<button class="p-2 border-gray-100 rounded-full border mb-2 px-4">Add from library</button>
		<button class="text-white font-bold p-2 mt-2" on:click={closeModal}>CLOSE</button>
	</div>
</div>
