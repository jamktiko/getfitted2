<script>
	import { page } from '$app/stores';
	import { capturedImageData } from '$lib/stores/imageStore';
	import { onMount, onDestroy } from 'svelte';
	import { showContent } from '$lib/stores/layoutStore';
	import { goto } from '$app/navigation';

	onMount(() => {
		showContent.set(false);
	});

	onDestroy(() => {
		showContent.set(true);
	});

	let imageData;
	let caption = '';
	let selectedCategory = '';

	capturedImageData.subscribe((data) => {
		imageData = data;
		console.log(imageData);
	});

	const submit = async (event) => {
		event.preventDefault();
		let jwtToken = sessionStorage.getItem('jwtToken');

		const formData = new FormData();

		// Convert base64 image data to Blob
		const blob = new Blob(
			[
				new Uint8Array(
					atob(imageData.split(',')[1])
						.split('')
						.map((char) => char.charCodeAt(0))
				)
			],
			{ type: 'image/png' }
		);

		formData.append('image', blob);
		formData.append('caption', caption);
		formData.append('jwtToken', jwtToken);

		try {
			const response = await fetch('http://localhost:3000/fits/api/posts', {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${jwtToken}`
				}
			});

			if (response.ok) {
				const data = await response.json();
				console.log('Post was successful');
				console.log('Image URL:', data.imageUrl);
				// Handle the image URL as needed (e.g., display, redirect, etc.)
				goto('/home');
			} else {
				console.error('Post failed');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const submitClothe = async (event) => {
		event.preventDefault();
		let jwtToken = sessionStorage.getItem('jwtToken');

		const formData = new FormData();

		// Convert base64 image data to Blob
		const blob = new Blob(
			[
				new Uint8Array(
					atob(imageData.split(',')[1])
						.split('')
						.map((char) => char.charCodeAt(0))
				)
			],
			{ type: 'image/png' }
		);

		formData.append('image', blob);
		formData.append('caption', caption);
		formData.append('category', selectedCategory);
		formData.append('jwtToken', jwtToken);

		try {
			const response = await fetch('http://localhost:3000/clothes/api/posts', {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${jwtToken}`
				}
			});

			if (response.ok) {
				const data = await response.json();
				console.log('Post was successful');
				console.log('Image URL:', data.imageUrl);
				// Handle the image URL as needed (e.g., display, redirect, etc.)
				goto('/home');
			} else {
				console.error('Post failed');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	$: content = $page.url.searchParams.get('content');
</script>

{#if content === 'first'}
	<div class="flex-col items-center justify-between w-full h-screen bg-white">
		<button on:click={submitClothe}>Add</button>
		<div>
			<img src={imageData} alt="kuva" class="w-full h-3/6 object-cover mt-4 mb-4 flex-grow" />
		</div>
		<div>
			<label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Select a category</label
			>
			<select
				bind:value={selectedCategory}
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
				bind:value={caption}
				id="message"
				rows="1"
				maxlength="100"
				class="block p-2.5 w-100s text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Your description"
			/>
		</div>
	</div>
{:else if content === 'second'}
	<div class="flex flex-col items-center justify-between w-full h-screen bg-white">
		<button on:click={submit}>Add</button>
		<div>
			<img src={imageData} alt="kuva" class="w-full h-3/6 object-cover mt-4 mb-4 flex-grow" />
		</div>
		<div>
			<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Add information about your outfit</label
			>
			<textarea
				bind:value={caption}
				id="message"
				rows="1"
				maxlength="150"
				class="block p-2.5 w-100s text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Your description"
			/>
		</div>
	</div>
{/if}
