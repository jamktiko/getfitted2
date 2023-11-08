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

<main class="pb-16">
	{#if valittuKuva}
		<InspectFit {valittuKuva} on:close={handleSuljeFitti} />
	{:else if empty()}
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
			<div class="grid grid-cols-2 gap-4 mt-4">
				{#each $u.userFits as userFit (userFit.id)}
					<div on:click={() => handleFittiClick(userFit)}>
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
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-purple-500 border-b border-purple-500"
					>Me</button
				>
				<!-- button mikä näyttää missä käyttäjä on tällä hetkellä -->
			</div>
			<div class="flex flex-col justify-center items-center font-source space-y-4 m-0 p-0 h-96">
				<p class="text-sm">Oops... No posts yet, wanna make one?</p>
				<button
					class="text-gray-500 bg-white border border-black rounded-full py-2 px-6 font-bold text-sm text-center"
					on:click={() => goto('/camera')}>Add <span class="text-pink2"> +</span></button
				>
			</div>
		</div>
	{/if}
</main>

<style>
	/* .nopost {
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
	} */
	/* .plus {
		color: #c97eff;
	} */
	/* .kontti {
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
	} */
</style>
