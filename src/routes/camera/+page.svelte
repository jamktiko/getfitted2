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

<div class=" h-screen bg-black text-white">
	{#if !kuvaData}
		<div class="flex justify-center w-full h-full">
			<video bind:this={videoElementti} autoplay muted class="w-full h-full object-cover" />
			<button
				on:click={suljeKamera}
				class=" bg-transparent outline-none border-none absolute top-7 left-3 flex"
			>
				<span class="material-icons text-grey">chevron_left</span></button
			>
			<div class="absolute inset-x-0 bottom-14 flex justify-center">
				<button
					on:click={otaKuva}
					class="bg-white text-4xl rounded-full bg-opacity-90 h-14 w-14 flex items-center justify-center"
				/>
			</div>
			<!-- <button class="absolute bottom-18 left-12 text-3xl">
		  <span class="material-icons">bolt</span>
		</button> -->
			<canvas bind:this={canvasElementti} class="hidden w-full h-full" />
		</div>
	{:else}
		<div class="kuva-container flex flex-col items-center justify-between h-screen bg-white">
			<div class="flex flex-row ml-6 mt-9">
				<button
					on:click={otaUusi}
					class=" bg-transparent outline-none border-none absolute top-7 left-[0px] xs:left-3"
				>
					<span class="material-icons text-grey">chevron_left</span></button
				>

				<button
					class=" font-source border rounded-full py-2 px-3 xs:px-4 mx-0.5 xs:mx-2.5 text-[12px] sm:text-[15px] text-center flex justify-center {selectedContent ===
					'first'
						? 'bg-grey text-white focus:outline-none focus:shadow-outline'
						: 'bg-transparent text-grey border-gray-400'}"
					on:click={() => selectContent('first')}
				>
					Add to wardrobe
				</button>
				<button
					class=" font-source border rounded-full py-2 px-3 xs:px-4 mx-0.5 xs:mx-2.5 text-[12px] sm:text-[15px] text-center flex justify-center {selectedContent ===
					'second'
						? 'bg-grey text-white focus:outline-none focus:shadow-outline'
						: 'bg-transparent text-grey border-gray-400'}"
					on:click={() => selectContent('second')}
				>
					Add to outfits
				</button>
			</div>
			<img
				class="w-full h-3/6 object-cover mt-4 mb-2 flex flex-grow"
				src={kuvaData}
				alt="Captured snapshot"
			/>
			<p
				class="info p-1 m-1 text-center text-[12px] sm:text-[14px] font-extrabold font-source text-grey"
			>
				If you're happy with the picture, click next
			</p>
			<button
				on:click={navigate}
				disabled={!selectedContent}
				class="hover:bg-grey hover:text-white font-source border rounded-full py-2 px-4 text-[13px] sm:text-[15px]text-center bg-transparent text-grey border-gray-400 mb-4"
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

<style>
	.material-icons {
		font-size: 3em;
	}
</style>
