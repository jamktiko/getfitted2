<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let valittuItemi = null;

	function handleClose() {
		dispatch('close');
	}
	console.log(valittuItemi);
</script>

<main>
	{#if valittuItemi}
		<button
			on:click={handleClose}
			class=" bg-transparent outline-none border-none flex justify-start"
		>
			<span class="material-icons text-grey text-[48px]">chevron_left</span></button
		>
		<div class="flex justify-center">
			<img src={valittuItemi.imageUrl} alt="käyttäjän vaate" class="max-w-[65%] h-auto" />
		</div>
		<div class="w-full mt-2">
			<div class="w-full bg-nav font-source flex justify-around items-center">
				<p class="text-xs p-6 text-grey">{valittuItemi.desc}</p>
				<button
					class="bg-transparent border border-gray-600 text-gray-500 text-center no-underline inline-block text-xs px-5 py-2 font-source rounded-full"
					>Edit</button
				>
			</div>
		</div>
		<div class="mt-1 left-0">
			<button
				class="text-gray-500 bg-white border border-black rounded-full py-2 px-6 font-bold font-heebo text-sm text-center mt-2"
				on:click={() => goto('/camera')}>Add <span class="text-pink2"> +</span></button
			>
		</div>
	{/if}
</main>

<style>
</style>
