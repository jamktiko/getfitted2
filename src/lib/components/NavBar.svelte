<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
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
		<span
			class="material-icons text-[29px] {$page.url.pathname === '/home' ||
			$page.url.pathname === '/home/feedme'
				? 'text-pink1'
				: 'text-grey'}"
			on:click={() => goto('/home')}>home</span
		>
		<span
			class="material-icons text-[29px] {$page.url.pathname === '/closet'
				? 'text-pink1'
				: 'text-grey'}"
			on:click={() => goto('/closet')}>checkroom</span
		>
		<span
			class="material-icons text-[29px] {$page.url.pathname === '/camera'
				? 'text-pink1'
				: 'text-grey'}"
			on:click={() => (showModal = true)}>photo_camera</span
		>

		<span
			class="material-icons text-[29px] {$page.url.pathname === '/carousel' ||
			$page.url.pathname === '/carousel/carousel2'
				? 'text-pink1'
				: 'text-grey'}"
			on:click={() => goto('/carousel')}>accessibility</span
		>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span
			class="material-icons text-[29px] {$page.url.pathname === '/profile'
				? 'text-pink1'
				: 'text-grey'}"
			on:click={() => goto('/profile')}>person</span
		>
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
