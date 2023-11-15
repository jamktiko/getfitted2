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
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-purple-500 border-b border-purple-500"
					>All</button
				>
				<button
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-black"
					on:click={() => goto('/feedme')}>Me</button
				>
			</div>
			<div class="grid grid-cols-2 gap-4 mt-4">
				<!-- each lohko käy läpi kaikkien käyttäjien fitit ja näyttää niiden kuvat -->
				{#each $all.allFits.reverse() as fit}
					<div class="fitti mb-4" on:click={() => handleFittiClick(fit)}>
						<img
							src={fit.kuvaUrl}
							alt="Fittikuva"
							class="w-full h-full object-cover"
							loading="lazy"
						/>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>

<!-- <style>
    main {
      padding: 8px;
    }
    .active {
      flex: 1;
      width: 50%;
      box-sizing: border-box;
      padding: 1em;
      margin: 1em;
      font-family: 'Source Code Pro', monospace;
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 1em;
      color: #c97eff;
      border-bottom-style: solid;
    }
    .kontti {
      display: flex;
    }
    img {
      max-width: 100%;
      height: auto;
      /*max-height: 200px;
        margin-bottom: 10px;*/
    }
  
    .fitti-grid {
      /* display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px; /* väli vaatteiden välillä */
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
      align-content: center;
      gap: 1.6875rem;
      align-self: stretch;
      flex-wrap: wrap;
      margin-top: 1em;
    }
  
    .active {
      flex: 1;
      width: 50%;
      box-sizing: border-box;
      padding: 1em;
      margin: 1em;
      font-family: 'Source Code Pro', monospace;
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 1em;
      color: #c97eff;
      border-bottom-style: solid;
    }
  
    .inactive {
      flex: 1;
      width: 50%;
      box-sizing: border-box;
      padding: 1em;
      margin: 1em;
      font-family: 'Source Code Pro', monospace;
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 1em;
      color: #000000;
    }
  </style> -->
