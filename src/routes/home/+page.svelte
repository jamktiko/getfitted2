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
</script>

<main class="pb-28">
	{#if valittuKuva}
		<InspectFit {valittuKuva} on:close={handleSuljeFitti} />
	{:else}
		<div class="mx-4">
			<div class="flex">
				<button
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-pink1 border-b border-pink1"
					>All</button
				>
				<button
					class="flex-1 p-4 m-4 font-source text-base sm:text-lg text-black"
					on:click={() => goto('/home/feedme')}>Me</button
				>
			</div>
			<div class="columns-2">
				<!-- each lohko käy läpi kaikkien käyttäjien fitit ja näyttää niiden kuvat -->
				{#each $all.allFits as fit}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						bind:this={containerElement}
						class="max-w-xs mb-3"
						on:click={() => handleFittiClick(fit)}
					>
						<img src={fit.imageUrl} alt="Fittikuva" class="w-full block" />
					</div>
				{/each}
			</div>
		</div>
	{/if}
</main>
