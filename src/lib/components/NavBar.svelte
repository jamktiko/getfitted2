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
		class="fixed z-50 bottom-2 left-1 right-1 mx-auto flex justify-around items-center p-6 gap-4 rounded-full bg-gray-200 shadow-md text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600"
	>
		<span
			class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600"
			on:click={() => goto('/home')}>home</span
		>
		<span
			class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600"
			on:click={() => goto('/closet')}>checkroom</span
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
		<span
			class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600"
			on:click={() => goto('/profile')}>person</span
		>
	</div>

	<div>
		{#if showModal}
			<CameraModal on:closeModal={handleCloseModal} />
		{/if}
	</div>
</section>
