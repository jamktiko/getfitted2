<script>
	import { goto } from '$app/navigation';
	import { u } from '$lib/stores/userStore';
	import InspectFit from '$lib/components/InspectFit.svelte';
	import UserFit from '$lib/components/FitCard.svelte';

	let valittuKuva = null;

	function handleFittiClick(userFit) {
		valittuKuva = userFit;
	}

	function handleSuljeFitti() {
		valittuKuva = null;
	}

	/* funktio vie "ALL" buttonin App.svelte komponentin käyttöön */

	/* jos omia fittejä ei ole niin näytetään koodin else osa */
	function empty() {
		if ($u.userFits.length < 1) {
			return false;
		} else {
			return true;
		}
	}
</script>

<main>
	{#if valittuKuva}
		<InspectFit {valittuKuva} on:close={handleSuljeFitti} />
	{:else if empty()}
		<div class="kontti">
			<button class="inactive" on:click={() => goto('/home')}> All</button>
			<!-- Button mikä vie sivulle joka näyttää kaikkien käyttäjien fitit -->
			<button class="active">Me</button>
			<!-- button mikä näyttää missä käyttäjä on tällä hetkellä -->
		</div>
		<div class="fitti-grid">
			{#each $u.userFits as userFit (userFit.id)}
				<div on:click={() => handleFittiClick(userFit)}>
					<UserFit {userFit} />
				</div>
			{/each}
		</div>
	{:else}
		<div class="kontti">
			<button class="inactive" on:click={() => goto('/home')}> All</button>
			<!-- Button mikä vie sivulle joka näyttää kaikkien käyttäjien fitit -->
			<button class="active">Me</button>
			<!-- button mikä näyttää missä käyttäjä on tällä hetkellä -->
		</div>
		<div class="nopost">
			<p>Oops... No posts yet, wanna make one?</p>
		</div>
		<button class="add">Add <span class="plus">+</span></button>
	{/if}
</main>

<style>
	.nopost {
		margin-top: 12em;
		margin-bottom: 2em;
		font-family: 'Source Code Pro', monospace;
		color: rgb(124, 120, 120);
		font-size: 14px;
	}
	.add {
		color: rgb(124, 120, 120);
		background-color: rgb(255, 255, 255);
		border: 1px solid #000000;
		border-radius: 30px;
		padding: 0.6em 2.1em;
		font-weight: bold;
		font-size: 17px;
	}
	.plus {
		color: #c97eff;
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
	.kontti {
		display: flex;
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
	main {
		padding: 8px;
	}
</style>
