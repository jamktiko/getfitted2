<script>
	import { onMount } from 'svelte';
	import { Modal } from 'flowbite';
	import { valittuKuvaStore } from '$lib/stores/inspectStore.js';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { u } from '$lib/stores/userStore';

	const dispatch = createEventDispatcher();

	let modal;
	let modalTarget;
	let successMessage = '';
	let errorMessage = '';

	const deleteImage = async () => {
		const valittuKuva = $valittuKuvaStore;
		try {
			const response = await fetch(
				`http://localhost:3000/fits/${encodeURIComponent($valittuKuvaStore.imageUrl)}`,
				{
					method: 'DELETE'
				}
			);

			if (response.status === 204) {
				successMessage = 'Image deleted successfully.';
				errorMessage = '';
				u.update((currentState) => {
					const updatedFits = currentState.userFits.filter(
						(fit) => fit.imageUrl !== valittuKuva.imageUrl
					);
					return { ...currentState, userFits: updatedFits };
				});
				modal.hide();
				valittuKuvaStore.set(null);

				goto('/feedme');
			} else if (response.status === 404) {
				successMessage = '';
				errorMessage = 'Image not found in the database.';
				modal.hide();
			} else {
				successMessage = '';
				errorMessage = 'Failed to delete image.';
			}
		} catch (error) {
			console.error('An error occurred:', error);
			errorMessage = 'An error occurred. Please try again.';
		}
	};

	onMount(() => {
		// Alusta $targetEl ja modal täällä
		modalTarget = document.getElementById('modalEl');
		modal = new Modal(modalTarget);
	});
</script>

<main>
	<button
		on:click={modal.show()}
		type="button"
		data-modal-target="modalEl"
		data-modal-toggle="modalEl"
		class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
		>Delete image
	</button>

	<div
		id="modalEl"
		tabindex="-1"
		class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
	>
		<div class="relative w-full max-w-md max-h-full">
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<div class="p-6 text-center">
					<svg
						class="mx-auto mb-4 text-purple-500 w-12 h-12 dark:text-gray-200"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
					<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
						Are you sure you want to delete this product?
					</h3>
					<button
						on:click={() => {
							deleteImage();
						}}
						data-modal-hide="modalEl"
						type="button"
						class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
					>
						Yes, I'm sure
					</button>
					<button
						on:click={() => modal.hide()}
						data-modal-hide="modalEl"
						type="button"
						class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-full border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						>No, cancel</button
					>
				</div>
			</div>
		</div>
	</div>
</main>

{#if successMessage}
	<p class="success">{successMessage}</p>
{/if}

{#if errorMessage}
	<p class="error">{errorMessage}</p>
{/if}
