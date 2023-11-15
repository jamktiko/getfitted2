<script>
	import { goto } from '$app/navigation';
	import { u } from '$lib/stores/userStore';
	import UserClothing from '$lib/components/ClothingCard.svelte';
	import FiltteriModal from '$lib/components/Filter.svelte';
	import VaateModaali from '$lib/components/InspectClothing.svelte';
	import CameraModal from '$lib/components/CameraModal.svelte';
	import { fly } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';

	export let valittuFiltteri = [];
	let valittuItemi = null;
	let naytaFiltteri = false;
	let filters = [];
	let filteredVaatteet = $u.userClothes;
	export let showModal = false;

	function handleFiltterointi(event) {
		filters = event.detail;
		lisaaFiltterit();
		naytaFiltteri = false;
	}

	function handleFiltterinVaihto(event) {
		filters = event.detail;
		lisaaFiltterit();
	}

	function lisaaFiltterit() {
		if (filters.length === 0) {
			filteredVaatteet = $u.userClothes;
		} else {
			filteredVaatteet = $u.userClothes.filter((userClothing) =>
				filters.includes(userClothing.category)
			);
		}
	}

	/* jeejee */

	function handleTyhjennaFiltteri() {
		filters = [];
		lisaaFiltterit();
		naytaFiltteri = false;
	}

	function handleSuljeFiltteri() {
		naytaFiltteri = false;
	}
	function handleVaateClick(userClothing) {
		valittuItemi = userClothing;
	}
	function handleSuljeVaate() {
		valittuItemi = null;
	}

	function handleCloseModal() {
		showModal = false;
	}
</script>

<main class=" pb-20 m-4">
	{#if $u.userClothes.length === 0}
		<div>
			<div
				class="flex flex-col justify-center items-center text-xs sm:text-base text-center font-source space-y-4 m-0 p-0 h-96"
			>
				<p>Oops... You have no clothes in your wardrobe</p>
				<button
					class="text-gray-500 bg-white border border-black rounded-full py-2 px-6 font-bold font-heebo text-sm text-center"
					on:click={() => (showModal = true)}>Add <span class="text-pink2"> +</span></button
				>
				{#if showModal}
					<CameraModal on:closeModal={handleCloseModal} />
				{/if}
			</div>
		</div>
	{:else if valittuItemi}
		<div
			in:fly={{
				delay: 0,
				duration: 90,
				easing: sineOut,

				x: -400,
				y: 0
			}}
		>
			<VaateModaali {valittuItemi} on:close={handleSuljeVaate} />
		</div>
	{:else}
		{#if naytaFiltteri}
			<FiltteriModal
				bind:valittuFiltteri
				on:lisaaFiltteri={handleFiltterointi}
				on:tyhjennaFiltteri={handleTyhjennaFiltteri}
				on:filtteriVaihettu={handleFiltterinVaihto}
				on:suljeModaali={handleSuljeFiltteri}
			/>
		{/if}
		<div class="flex flex-col items-center">
			<button
				class="bg-transparent border border-gray-600 text-gray-500 text-center no-underline inline-block text-xs px-5 py-2 font-source rounded-full sm:text-base"
				on:click={() => (naytaFiltteri = true)}>Filter</button
			>
		</div>
		<div class="grid grid-cols-2 gap-8 mt-4">
			{#each filteredVaatteet as userClothing (userClothing.id)}
				<div on:click={() => handleVaateClick(userClothing)} class="p-2">
					<UserClothing {userClothing} />
				</div>
			{/each}
		</div>
	{/if}
</main>
