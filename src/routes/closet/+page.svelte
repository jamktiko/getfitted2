<script>
	import { u } from '$lib/stores/userStore';
	import UserClothing from '$lib/components/ClothingCard.svelte';
	import FiltteriModal from '$lib/components/Filter.svelte';
	import VaateModaali from '$lib/components/InspectClothing.svelte';
	import { fly } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';
	export let valittuFiltteri = [];
	let valittuItemi = null;
	let naytaFiltteri = false;
	let filters = [];
	let filteredVaatteet = $u.userClothes;

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
</script>

<main>
	{#if $u.userClothes.length > 0}
		{#if naytaFiltteri}
			<FiltteriModal
				bind:valittuFiltteri
				on:lisaaFiltteri={handleFiltterointi}
				on:tyhjennaFiltteri={handleTyhjennaFiltteri}
				on:filtteriVaihettu={handleFiltterinVaihto}
				on:suljeModaali={handleSuljeFiltteri}
			/>
		{/if}
		{#if valittuItemi}
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
			<button class="filtteri" on:click={() => (naytaFiltteri = true)}>Filter</button>
			<div class="clothing-grid">
				{#each filteredVaatteet as userClothing (userClothing.id)}
					<div on:click={() => handleVaateClick(userClothing)}>
						<UserClothing {userClothing} />
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</main>

<style>
	.clothing-grid {
		/* display: grid;––--__
        grid-template-columns: repeat(2, 1fr);
        gap: 20px; /* väli vaatteiden välillä */
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(2, 1fr);
		align-items: center;
		align-content: center;
		/* gap: 1.6875rem; */
		align-self: stretch;
		flex-wrap: wrap;
		margin-top: 1em;
	}
	.filtteri {
		background-color: transparent;
		border: 1px solid rgba(64, 64, 64, 1);
		color: rgb(124, 120, 120);
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 0.8em;
		cursor: pointer;
		border-radius: 30px;
		padding: 0.6em 2.4em;
		font-family: 'Source Code Pro', monospace;
		margin-top: 0.5em;
	}
</style>
