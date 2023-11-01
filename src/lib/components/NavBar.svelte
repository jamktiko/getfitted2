<script>
	import { goto } from '$app/navigation';
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
			on:click={() => goto('/camera')}>photo_camera</span
		>
		<span
			class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600"
			on:click={() => goto('/carousel')}>accessibility</span
		>
		<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600"
        on:click={() => goto('/profile')}>person</span>
	</div>
</section>
