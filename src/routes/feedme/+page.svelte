<script>
	import { goto } from '$app/navigation';
	import { onMount, setContext } from 'svelte';
	import { u } from '$lib/stores/userStore';
	import UserFit from '$lib/components/FitCard.svelte';
	import CameraModal from '$lib/components/CameraModal.svelte';
	import { valittuKuvaStore } from '$lib/stores/inspectStore.js';

	let valittuKuva = null;
	export let showModal = false;

	function handleFittiClick(userFit) {
		valittuKuvaStore.set(userFit);
		goto('/feedme/inspectfeedme');
	}

	function handleSuljeFitti() {
		valittuKuva = null;
	}

	/*dkndna*/
	/* funktio vie "ALL" buttonin App.svelte komponentin käyttöön */

	/* jos omia fittejä ei ole niin näytetään koodin else osa */
	function empty() {
		if ($u.userFits.length < 1) {
			return false;
		} else {
			return true;
		}
	}

	function handleCloseModal() {
		showModal = false;
	}
</script>

<main class=" pb-28">
	{#if empty()}
		<div class="mx-4">
			<div class="flex">
				<button
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-black"
					on:click={() => goto('/home')}
				>
					All</button
				>
				<!-- Button mikä vie sivulle joka näyttää kaikkien käyttäjien fitit -->
				<button
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-purple-500 border-b border-purple-500"
					>Me</button
				>
				<!-- button mikä näyttää missä käyttäjä on tällä hetkellä -->
			</div>
			<div class="flex justify-center items-center my-3">
				<button
					class="text-gray-500 bg-white border border-black rounded-full py-2 px-6 font-bold text-sm text-center"
					on:click={() => goto('/camera')}>Add <span class="text-pink2">+</span></button
				>
			</div>
			<div class="columns-2">
				{#each $u.userFits as userFit}
					<div class="max-w-xs mb-3" on:click={() => handleFittiClick(userFit)}>
						<UserFit {userFit} />
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="mx-4">
			<div class="flex">
				<button
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-black"
					on:click={() => goto('/home')}
				>
					All</button
				>
				<!-- Button mikä vie sivulle joka näyttää kaikkien käyttäjien fitit -->
				<button
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-pink1 border-b border-pink1"
					>Me</button
				>
				<!-- button mikä näyttää missä käyttäjä on tällä hetkellä -->
			</div>
			<div class="flex flex-col justify-center items-center font-source space-y-4 m-0 p-0 h-96">
				<p class="text-sm">Oops... No posts yet, wanna make one?</p>
				<button
					class="text-gray-500 bg-white border border-black rounded-full py-2 px-6 font-bold font-heebo text-sm text-center"
					on:click={() => (showModal = true)}>Add <span class="text-pink2"> +</span></button
				>
				{#if showModal}
					<CameraModal on:closeModal={handleCloseModal} />
				{/if}
			</div>
		</div>
	{/if}
</main>
