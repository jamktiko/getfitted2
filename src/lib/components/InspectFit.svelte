<script>
	/*   import { fade, fly, scale, slide } from 'svelte/transition';
      import { sineOut } from 'svelte/easing'; */
	import { u } from '$lib/stores/userStore';
	import { onMount, onDestroy } from 'svelte';
	import { showContent } from '$lib/stores/layoutStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	onMount(() => {
		showContent.set(false);
	});

	onDestroy(() => {
		showContent.set(true);
	});

	export let valittuKuva = null;

	function handleSulku() {
		dispatch('close');
	}

	console.log(valittuKuva);

	$: isLiked = $u.myLikes && valittuKuva ? $u.myLikes.includes(valittuKuva.imageUrl) : null;

	function toggleLike() {
		if (valittuKuva && valittuKuva.imageUrl) {
			u.update((currentUser) => {
				let updatedLikes = currentUser.myLikes || [];
				if (isLiked) {
					updatedLikes = updatedLikes.filter((imageUrl) => imageUrl !== valittuKuva.imageUrl);
				} else {
					updatedLikes = [...updatedLikes, valittuKuva.imageUrl];
				}
				console.log('Updated Likes:', updatedLikes);
				return { ...currentUser, myLikes: updatedLikes };
			});
		} else {
			console.error('valittuKuva or valittuKuva.imageUrl is undefined');
		}
	}
</script>

<head>
	<link
		rel="stylesheet"
		href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
	/>
</head>
<main class="p-0 m-0">
	{#if valittuKuva}
		<div class="absolute flex items-center justify-start z-50 p-2">
			<button
				on:click={handleSulku}
				class="ml-2 mt-5 bg-transparent outline-none border-none flex justify-start"
			>
				<span class="material-icons text-grey">chevron_left</span></button
			>
		</div>
		<div class="flex flex-col items-center relative w-full">
			<img src={valittuKuva.kuvaUrl} alt="käyttäjän vaate" class="w-full max-h-full" />
		</div>

		<div class="flex justify-between items-center border-b border-gray-600 p-2 py-6">
			<h3 class="text-gray-600 text-xl font-bold font-heebo pl-3">@{$u.userName}</h3>

			<span
				class="text-purple-300 cursor-pointer text-3xl pr-3 flex justify-center"
				on:click={toggleLike}
				class:liked={isLiked}
			>
				{#if isLiked}
					<i class="fa fa-heart" aria-hidden="true" />
				{:else}
					<i class="fa fa-heart-o" aria-hidden="true" />
				{/if}
			</span>
		</div>

		<div class="mt-6 mx-6">
			<p class="text-gray-600 font-source text-xs sm:text-sm flex justify-start mb-2">
				<li>North Face bottoms, bought 2023</li>
			</p>
			<p class="text-gray-600 font-source text-xs sm:text-sm flex justify-start mb-2">
				<li>Everest beige vest, bought 2023</li>
			</p>
			<p class="text-gray-600 font-source text-xs sm:text-sm flex justify-start mb-2">
				<li>North Face gloves</li>
			</p>
		</div>
	{/if}
</main>

<style>
	.material-icons {
		font-size: 3em;
	}
</style>
