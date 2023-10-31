<script>
	import { goto } from '$app/navigation';
</script>

<section>
	<div
		class="fixed bottom-4 left-4 right-4 flex justify-around items-center p-4 gap-8 rounded-full bg-gray-200 shadow-md"
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
