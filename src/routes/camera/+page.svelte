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
		<div class="flex flex-col items-center justify-between h-screen bg-white">
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

<style>
	.material-icons {
		font-size: 3em;
	}
</style>
