<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { all } from '$lib/stores/userStore';
	import InspectFit from '$lib/components/InspectFit.svelte';
	let valittuKuva = null;

	function handleFittiClick(fit) {
		valittuKuva = fit;
	}
	function handleSuljeFitti() {
		valittuKuva = null;
	}

	function handleDelete() {
		valittuKuva = null;
	}

	onMount(async () => {
		await handleFetchFitImages();
	});

	async function fetchAllFitImages() {
		try {
			const response = await fetch('http://localhost:3000/fits'); // Korvaa tämä oikealla endpointilla

			if (response.ok) {
				const fitImages = await response.json();
				return fitImages;
			} else {
				console.error('Error fetching fit images');
				return null;
			}
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async function handleFetchFitImages() {
		const fitImages = await fetchAllFitImages();

		if (fitImages !== null) {
			// Tee jotain fit-kuvien kanssa, esim. tallenna ne storeen
			all.set({
				allFits: fitImages
			});
		}
	}
</script>

<main class="pb-16">
	<div class="mx-4">
		{#if valittuKuva}
			<InspectFit {valittuKuva} on:close={handleSuljeFitti} on:sulku={handleDelete} />
		{:else}
			<div class="flex">
				<button
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-pink1 border-b border-pink1"
					>All</button
				>
				<button
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-black"
					on:click={() => goto('/feedme')}>Me</button
				>
			</div>
			<div class="columns-2">
				<!-- each lohko käy läpi kaikkien käyttäjien fitit ja näyttää niiden kuvat -->
				{#each $all.allFits.reverse() as fit}
					<div class="max-w-xs mb-3" on:click={() => handleFittiClick(fit)}>
						<img src={fit.kuvaUrl} alt="Fittikuva" class="w-full block" loading="lazy" />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
