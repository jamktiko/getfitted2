<script>
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { showContent } from '$lib/stores/layoutStore';
	import { capturedImageData } from '$lib/stores/imageStore';
	let videoElementti;
	let canvasElementti;
	let striimi;
	let kuvaData = null;
	let selectedContent = '';

	onMount(() => {
		showContent.set(false);
		avaaKamera();
	});

	onDestroy(() => {
		showContent.set(true);
	});

	function otaUusi() {
		kuvaData = null;
		avaaKamera();
	}

	async function avaaKamera() {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			try {
				striimi = await navigator.mediaDevices.getUserMedia({ video: true });
				videoElementti.srcObject = striimi;
				videoElementti.play();
			} catch (error) {
				console.error('Virhe avattaessa kameraa', error);
			}

			return () => {
				if (striimi && striimi.getTracks) {
					striimi.getTracks().forEach((track) => track.stop());
				}
			};
		}
	}

	function otaKuva() {
		const context = canvasElementti.getContext('2d');
		context.drawImage(videoElementti, 0, 0, canvasElementti.width, canvasElementti.height);
		kuvaData = canvasElementti.toDataURL('image/jpg');
		capturedImageData.set(kuvaData);
		striimi.getTracks().forEach((track) => track.stop());
	}
	function suljeKamera() {
		striimi.getTracks().forEach((track) => track.stop());
		goto('/home');
	}

	function selectContent(contentType) {
		selectedContent = contentType;
	}

	async function navigate() {
		if (selectedContent) {
			await goto(`/camera/image?content=${selectedContent}`);
		} else {
			// Handle the case where no selection has been made before pressing "Next"
			console.error('Please select content before proceeding.');
		}
	}
</script>

<div class="camera flex flex-col items-center justify-center h-screen bg-black text-white">
	{#if !kuvaData}
		<div class="flex flex-col items-center justify-center w-full h-full">
			<video bind:this={videoElementti} autoplay muted class="w-full h-full object-cover" />
			<button on:click={suljeKamera} class="absolute top-8 left-8 flex">
				<i
					class="arrow transform rotate-135 border border-gray-400 rounded border-r-0 border-b-0 p-2"
				/></button
			>
			<div class="absolute inset-x-0 bottom-14 flex justify-center">
				<button
					on:click={otaKuva}
					class="bg-white text-4xl rounded-full h-14 w-14 flex items-center justify-center"
				/>
			</div>
			<!-- <button class="absolute bottom-18 left-12 text-3xl">
		  <span class="material-icons">bolt</span>
		</button> -->
			<canvas bind:this={canvasElementti} class="hidden w-full h-full" />
		</div>
	{:else}
		<div class="kuva-container flex flex-col items-center justify-between w-full h-screen bg-white">
			<button on:click={otaUusi} class="absolute top-8 left-8 flex">
				<i
					class="arrow transform rotate-135 border border-gray-400 rounded border-r-0 border-b-0 p-2"
				/></button
			>
			<button
 				 class="hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline {selectedContent === 'first' ? 'bg-gray-600' : 'bg-gray-200'}"
  					on:click={() => selectContent('first')}
				>
  				Add to wardrobe
			</button>
			<button
  				class="hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline {selectedContent === 'second' ? 'bg-gray-600' : 'bg-gray-200'}"
  				on:click={() => selectContent('second')}
				>
  				Add to outfits
			</button>
			<img
				class="w-full h-3/6 object-cover mt-4 mb-4 flex-grow"
				src={kuvaData}
				alt="Captured snapshot"
			/>
			<p class="info p-4 m-4 text-xs font-medium text-black">
				If you're happy with the picture, click next
			</p>
			<button
				on:click={navigate}
				disabled={!selectedContent}
				class="mt-4 mb-2 px-6 py-2 text-xs font-medium text-black border rounded-full cursor-pointer"
				>Next</button
			>
		</div>
	{/if}
</div>
<!-- <style>
     .nuoli {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .kamera-nappi {
    cursor: pointer;
  }
  .nabi {
    border: 1px solid rgba(64, 64, 64, 1);
    color: rgb(124, 120, 120);
  }
  .material-icons {
    color: white;
  }
</style> -->
<!-- <style>
	#salama {
		color: white;
		font-size: 3em;
	}
	.camera {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		z-index: 20;
	}
	#kamera {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: black;
		z-index: 20;
	}
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
		transform: scaleX(1);
	}
	.arrow {
		border: solid #404040;
		border-radius: 25%;
		border-width: 0 3.3px 3.3px 0;
		padding: 0.5em;
		transform: rotate(135deg);
		-webkit-transform: rotate(135deg);
	}
	.nuoli {
		position: absolute;
		top: 2.1em;
		left: 0.5em;
		margin-left: 1.5em;
		display: flex;
		justify-content: flex-start;
		background-color: transparent;
		text-decoration: none;
		border: none;
	}
	.nabi {
		position: absolute;
		top: 1.6em;
		right: 0.5em;
		display: flex;
		justify-content: flex-end;
		background-color: transparent;
		border: 1px solid rgba(64, 64, 64, 1);
		color: rgb(124, 120, 120);
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 0.8em;
		cursor: pointer;
		border-radius: 30px;
		padding: 0.6em 1.5em;
		margin-bottom: 1.5em;
		font-family: 'Source Code Pro', monospace;
	}
	#kamera-nappi {
		position: absolute;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.9);
		bottom: 3.6rem;
		height: 70px;
		width: 70px;
		font-size: 2em;
		border: none;
		cursor: pointer;
	}
	.lightning-button {
		position: absolute;
		bottom: 4.5rem;
		left: 3rem;
		border: none;
		background: transparent;
		/* font-size: 5em; */
		color: white;
	}
	.kuva-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100vh;
		padding: 15% 0;
	}
	img {
		width: 100%;
		height: 80vh;
		margin-top: 5%;
		margin-bottom: 5%;
		object-fit: cover;
		flex-grow: 1;
	}
	canvas {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.material-icons {
		color: #404040;
	}
	.info {
		font-family: 'Source Code Pro', monospace;
		color: #404040;
		font-size: 0.75em;
		padding-left: 1.5em;
		padding-right: 1.5em;
	}
</style> -->
