<script>
	import { page } from '$app/stores';
	import { capturedImageData } from '$lib/stores/imageStore';
	import { onMount, onDestroy } from 'svelte';
	import { showContent } from '$lib/stores/layoutStore';

	onMount(() => {
		showContent.set(false);
	});

	onDestroy(() => {
		showContent.set(true);
	});

	let imageData;

	capturedImageData.subscribe((data) => {
		imageData = data;
		console.log(imageData);
	});

	$: content = $page.url.searchParams.get('content');
</script>

{#if content === 'first'}
	<button>Add</button>
	<div><img src={imageData} alt="kuva" /></div>
	<div>
		<label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Select a category</label
		>
		<select
			id="countries"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		>
			<option>Tops</option>
			<option>Bottoms</option>
			<option>Overalls</option>
			<option>Hats</option>
			<option>Shoes</option>
			<option>Accessories</option>
		</select>
	</div>
	<div>
		<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Give your clothing a short description</label
		>
		<textarea
			id="message"
			rows="1"
			class="block p-2.5 w-100s text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Your description"
		/>
	</div>
{:else if content === 'second'}
	<button>Add</button>
	<div><img src={imageData} alt="kuva" /></div>
	<div>
		<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Add information about your outfit</label
		>
		<textarea
			id="message"
			rows="1"
			class="block p-2.5 w-100s text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Your description"
		/>
	</div>
{/if}
