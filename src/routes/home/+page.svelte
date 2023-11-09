<script>
	import { goto } from '$app/navigation';
	import { all } from '$lib/stores/userStore';
	import InspectFit from '$lib/components/InspectFit.svelte';

	let valittuKuva = null;

	let containerElement;

	function handleFittiClick(fit) {
		valittuKuva = fit;
		containerScrollPosition = containerElement.scrollTop;
	}
	function handleSuljeFitti() {
		valittuKuva = null;
		containerElement.scrollTo(0, containerScrollPosition);
	}
	import AddUserName from '$lib/components/AddUserName.svelte';
	let showModal = false;
	let username = '';

	function setUsername(newUsername) {
		username = newUsername;
		// You can also add logic to handle the username here
	}
</script>

<main class="pb-28">
	{#if valittuKuva}
		<InspectFit {valittuKuva} on:close={handleSuljeFitti} />
	{:else}
		<div class="mx-4">
			<div class="flex">
				<button
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-purple-500 border-b border-purple-500"
					>All</button
				>
				<button
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-black"
					on:click={() => goto('/home/feedme')}>Me</button
				>
			</div>
			<div class="grid grid-cols-2 gap-4 mt-4">
				<!-- each lohko käy läpi kaikkien käyttäjien fitit ja näyttää niiden kuvat -->
				{#each $all.allFits as fit}
					<div bind:this={containerElement} class="fitti" on:click={() => handleFittiClick(fit)}>
						<img src={fit.imageUrl} alt="Fittikuva" class="w-full h-auto" />
					</div>
				{/each}
			</div>
		</div>
	{/if}
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
