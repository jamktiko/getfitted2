<script>
	import { goto } from '$app/navigation';
</script>

<section>
	<div
		class="fixed z-50 bottom-0 mb-7 left-4 right-4 mx-auto flex justify-around items-center py-4 px-7 gap-5 rounded-full bg-nav shadow-md"
	>
		<span class="material-icons text-icon text-grey" on:click={() => goto('/home')}>home</span>
		<span class="material-icons text-icon text-grey" on:click={() => goto('/closet')}
			>checkroom</span
		>
		<span class="material-icons text-icon text-grey" on:click={() => goto('/camera')}
			>photo_camera</span
		>
		<span class="material-icons text-icon text-grey" on:click={() => goto('/carousel')}
			>accessibility</span
		>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span class="material-icons text-icon text-grey" on:click={() => goto('/profile')}>person</span>
	</div>
</section>

<style>
	.material-icons {
		/* font-size: 2em; */
		/* color: #404040; */
	}
</style>
