<script>
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let showModal = false;
	function closeModal() {
		showModal = false;
		dispatch('closeModal');
	}
	let fileInput;

	function openFileInput() {
		fileInput.click();
	}

	let file; // Store the selected file
	let caption = '';
	let showSubmitForm = false; // Flag to show or hide the submit form

	function handleFileChange(event) {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			// Handle the selected file here
			console.log('Selected file:', selectedFile);
			file = selectedFile;
			showSubmitForm = true; // Show the submit form
		} else {
			showSubmitForm = false; // Hide the submit form if no file is selected
		}
	}

	const submit = async (event) => {
		event.preventDefault();
		let jwtToken = sessionStorage.getItem('jwtToken');

		const formData = new FormData();
		formData.append('image', file);
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
				// Handle success, e.g., redirect or display a success message.
				console.log(jwtToken);
				console.log('Post was successful');
				const thisPage = window.location.pathname;
				goto('/').then(() => goto(thisPage));
			} else {
				// Handle errors, e.g., display an error message.
				console.error('Post failed');
			}
		} catch (error) {
			console.error('Error:', error);
		}
		jwtToken = '';
	};
</script>

{#if !showSubmitForm}
	<div class="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
		<div class="bg-gray-600 p-5 rounded-lg text-white font-mono text-sm">
			<button class="flex items-center" on:click={openFileInput}>Add from library</button>
			<input
				type="file"
				accept="image/*"
				name="image"
				style="display: none;"
				bind:this={fileInput}
				on:change={handleFileChange}
			/>
			<button class="flex items-center" on:click={() => goto('/camera')}>Go to camera</button>
			<button class="text-white font-bold" on:click={closeModal}>CLOSE</button>
		</div>
	</div>
{:else}
	<form on:submit={submit}>
		<button type="submit">Submit</button>
	</form>
{/if}
