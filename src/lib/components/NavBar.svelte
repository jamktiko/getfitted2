<script>
	import { goto } from '$app/navigation';
	import CameraModal from '$lib/components/CameraModal.svelte';
	export let showModal = false;

	function handleCloseModal() {
		showModal = false;
	}
</script>

<section>
	<div
		class="fixed z-50 bottom-0 mb-7 left-4 right-4 mx-auto flex justify-around items-center py-4 px-7 gap-5 rounded-full bg-nav shadow-md"
	>
		<span class="material-icons text-icon text-grey" on:click={() => goto('/home')}>home</span>
		<span class="material-icons text-icon text-grey" on:click={() => goto('/closet')}
			>checkroom</span
		>
		<span class="material-icons text-icon text-grey" on:click={() => (showModal = true)}
			>photo_camera</span
		>
		<span
			class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600"
			on:click={() => (showModal = true)}>photo_camera</span
		>
		<span
			class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600"
			on:click={() => goto('/carousel')}>accessibility</span
		>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span class="material-icons text-icon text-grey" on:click={() => goto('/profile')}>person</span>
	</div>

	<div>
		{#if showModal}
			<CameraModal on:closeModal={handleCloseModal} />
		{/if}
	</div>

	<div>
		{#if showModal}
			<CameraModal on:closeModal={handleCloseModal} />
		{/if}
	</div>
</section>

<style>
	.material-icons {
		/* font-size: 2em; */
		/* color: #404040; */
	}
</style>
