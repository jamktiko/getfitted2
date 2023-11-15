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
	<div class="h-screen bg-white">
		<div class="flex justify-end mt-4 mr-4">
			<button class=" bg-transparent outline-none border-none absolute top-7 left-[0px] xs:left-3">
				<span class="material-icons text-grey">chevron_left</span></button
			>
			<button
				class="text-grey bg-transparent border border-grey rounded-full py-2 px-5 font-bold mt-4 text-[15px] text-center"
				>Add <span class="text-pink2">+</span></button
			>
		</div>
		<div class="mb-5 mt-4 w-full h-[78.2%]">
			<img class=" w-full h-full object-cover" src={imageData} alt="kuva" />
		</div>
		<div class="flex justify-center flex-col mb-5">
			<label
				for="countries"
				class="text-center mb-1 text-[14px] font-source font-extrabold text-gray-900"
				>Select a category</label
			>
			<select
				id="categories"
				class="bg-gray-100 m-4 mx-24 text-grey font-heebo font-medium text-center text-xs rounded-lg outline-gray-500 p-3"
			>
				<option>Tops</option>
				<option>Bottoms</option>
				<option>Overalls</option>
				<option>Hats</option>
				<option>Shoes</option>
				<option>Accessories</option>
			</select>
		</div>
		<div class="flex justify-center flex-col">
			<label for="message" class="text-center mb-1 text-[14px] font-source font-extrabold text-grey"
				>Give your clothing a short description</label
			>
			<textarea
				id="message"
				rows="1"
				class="block p-2.5 w-100s text-xs text-gray-900 bg-gray-100 rounded-lg outline-gray-500 focus:border-grey m-4 mb-12"
				placeholder="..."
			/>
		</div>
	</div>
{:else if content === 'second'}
	<div class="h-screen bg-white">
		<div class="flex justify-end mt-4 mr-4">
			<button class=" bg-transparent outline-none border-none absolute top-7 left-[0px] xs:left-3">
				<span class="material-icons text-grey">chevron_left</span></button
			>
			<button
				class="text-grey bg-transparent border border-grey rounded-full py-2 px-5 mt-4 font-bold text-[15px] text-center"
				>Add <span class="text-pink2">+</span></button
			>
		</div>
		<div class="mb-5 mt-4 w-full h-[78.2%]">
			<img class="w-full h-full object-cover" src={imageData} alt="kuva" />
		</div>
		<div class="flex justify-center flex-col">
			<label for="message" class="text-center mb-1 text-[14px] font-source text-grey"
				>Add information about your outfit</label
			>
			<textarea
				id="message"
				rows="1"
				class=" p-2.5 w-100s text-xs text-gray-900 bg-gray-100 rounded-lg outline-gray-500 focus:border-grey m-4 mb-12"
				placeholder="..."
			/>
		</div>
	</div>
{/if}

<style>
	.material-icons {
		font-size: 3em;
	}
</style>
