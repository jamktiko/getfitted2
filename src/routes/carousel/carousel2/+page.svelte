<script>
	import { goto } from '$app/navigation';
	import { afterUpdate } from 'svelte';
	import { u } from '$lib/stores/userStore';
	$: console.log($u.userClothes);

	export let open = false;

	afterUpdate(() => {
		if (open) {
			scrollToOutput();
		}
	});
	const scrollToOutput = () => {
		const outputElement = document.getElementById('extra');
		if (outputElement) {
			outputElement.scrollIntoView({ behavior: 'smooth' });
		}
		console.log('kkdkd');
	};

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function mixAndMatch(carouselIndex) {
		carousels[carouselIndex].images = shuffleArray([...carousels[carouselIndex].images]);

		let spinCount = 5;
		let intervalId = setInterval(() => {
			next(carouselIndex);
			spinCount--;
			if (spinCount <= 0) clearInterval(intervalId);
		}, 0);
	}

	let overallCarousel = {
		images: $u.userClothes.filter((v) => v.category === 'Overalls').map((v) => v.imageUrl),

		currentIndex: 0,
		startX: 0
	};
	let extrasCarousel1 = {
		images: $u.userClothes.filter((v) => v.category === 'Shoes').map((v) => v.imageUrl),
		currentIndex: 0,
		startX: 0
	};

	let extrasCarousel2 = {
		images: $u.userClothes.filter((v) => v.category === 'Hats').map((v) => v.imageUrl),
		currentIndex: 0,
		startX: 0
	};

	let extrasCarousel3 = {
		images: $u.userClothes.filter((v) => v.category === 'Accessories').map((v) => v.imageUrl),

		currentIndex: 0,
		startX: 0
	};

	let carousels = [overallCarousel];
	let extraCarousels = [extrasCarousel1, extrasCarousel2, extrasCarousel3];

	function handleSwipeStart(event, carouselIndex) {
		carousels[carouselIndex].startX = event.touches[0].clientX;
	}

	function handleSwipeEnd(event, carouselIndex) {
		const endX = event.changedTouches[0].clientX;
		const startX = carousels[carouselIndex].startX;
		const threshold = 50;

		if (startX - endX > threshold) {
			next(carouselIndex);
		} else if (endX - startX > threshold) {
			previous(carouselIndex);
		}
	}
	// Event handling functions for the extra carousels
	function handleSwipeStartExtra(event, carouselIndex) {
		extraCarousels[carouselIndex].startX = event.touches[0].clientX;
	}

	function handleSwipeEndExtra(event, carouselIndex) {
		const endX = event.changedTouches[0].clientX;
		const startX = extraCarousels[carouselIndex].startX;
		const threshold = 50;

		if (startX - endX > threshold) {
			nextExtra(carouselIndex);
		} else if (endX - startX > threshold) {
			previousExtra(carouselIndex);
		}
	}

	function next(carouselIndex) {
		carousels[carouselIndex].currentIndex =
			(carousels[carouselIndex].currentIndex + 1) % carousels[carouselIndex].images.length;
	}

	function previous(carouselIndex) {
		carousels[carouselIndex].currentIndex =
			(carousels[carouselIndex].currentIndex - 1 + carousels[carouselIndex].images.length) %
			carousels[carouselIndex].images.length;
	}

	function nextExtra(carouselIndex) {
		extraCarousels[carouselIndex].currentIndex =
			(extraCarousels[carouselIndex].currentIndex + 1) %
			extraCarousels[carouselIndex].images.length;
	}

	function previousExtra(carouselIndex) {
		extraCarousels[carouselIndex].currentIndex =
			(extraCarousels[carouselIndex].currentIndex -
				1 +
				extraCarousels[carouselIndex].images.length) %
			extraCarousels[carouselIndex].images.length;
	}
</script>

<div class="pb-20">
	<div class="flex justify-evenly mt-2">
		<button
			class="bg-transparent border border-gray-600 text-gray-500 text-center no-underline inline-block text-xs px-5 py-2 font-source rounded-full"
			on:click={() => goto('/carousel')}>Tops & Bottoms</button
		>
		<button
			class="bg-transparent border border-gray-600 text-gray-500 text-center no-underline inline-block text-xs px-5 py-2 font-source rounded-full"
			on:click={() => carousels.forEach((_, index) => mixAndMatch(index))}>Mix & Match</button
		>
	</div>
	<div class="carousel-container">
		{#each carousels as carousel, carouselIndex (carousel)}
			<div
				class="carousel"
				on:touchstart={(event) => handleSwipeStart(event, carouselIndex)}
				on:touchend={(event) => handleSwipeEnd(event, carouselIndex)}
			>
				{#each carousel.images as image, i (image)}
					{#if i === carousel.currentIndex || i === (carousel.currentIndex - 1 + carousel.images.length) % carousel.images.length || i === (carousel.currentIndex + 1) % carousel.images.length}
						<img
							src={image}
							alt={`Image ${i + 1}`}
							class={i === carousel.currentIndex
								? 'current-image'
								: i ===
								  (carousel.currentIndex - 1 + carousel.images.length) % carousel.images.length
								? 'prev-image'
								: i === (carousel.currentIndex + 1) % carousel.images.length
								? 'next-image'
								: ''}
						/>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
	{#if open === false}
		<div class="flex flex-col mt-6">
			<button on:click={() => (open = true)}>
				<p class="text-gray-600 font-heebo text-sm bg-transparent no-underline font-extrabold">
					CHOOSE EXTRAS
				</p>
				<span class="material-icons text-pink1 text-4xl -rotate-90">chevron_left</span>
			</button>
		</div>
	{/if}
	{#if open}
		<div
			id="extra"
			class="flex flex-row justify-evenly items-center mx-auto xs:px-2 sm:px-6 sm:max-w-[540px] content-center"
		>
			<div class="bg-nav w-24 xs:w-28 h-24 xs:h-28 border rounded-md border-none" />
			<div class="bg-nav w-24 xs:w-28 h-24 xs:h-28 border rounded-md border-none" />
			<div class="bg-nav w-24 xs:w-28 h-24 xs:h-28 border rounded-md border-none" />
		</div>

		<div class="carousel-container2">
			{#each extraCarousels as carousel, carouselIndex (carousel)}
				<div
					class="carousel"
					on:touchstart={(event) => handleSwipeStartExtra(event, carouselIndex)}
					on:touchend={(event) => handleSwipeEndExtra(event, carouselIndex)}
				>
					{#each carousel.images as image, i (image)}
						{#if i === carousel.currentIndex || i === (carousel.currentIndex - 1 + carousel.images.length) % carousel.images.length || i === (carousel.currentIndex + 1) % carousel.images.length}
							<img
								src={image}
								alt={`Image ${i + 1}`}
								class={i === carousel.currentIndex
									? 'current-image2'
									: i ===
									  (carousel.currentIndex - 1 + carousel.images.length) % carousel.images.length
									? 'prev-image2'
									: i === (carousel.currentIndex + 1) % carousel.images.length
									? 'next-image2'
									: ''}
							/>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Heebo&display=swap');
	.carousel {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80vh;
		width: 100%;
		overflow: hidden;
		margin-bottom: 20px;
		z-index: 1;
	}

	.carousel-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 47vh;
		overflow: hidden;
		margin-top: 2em;
		margin-bottom: 3.5em;
	}
	.carousel-container2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 55vh;
		overflow: hidden;
		margin-top: 2em;
		margin-bottom: 1.5em;
	}
	.carousel img {
		max-height: 100%;
		max-width: 100%;
		display: block;
		transition: transform 0.3s;
	}

	.current-image {
		transform: scale(1);
		z-index: 1;
	}

	.prev-image,
	.next-image {
		padding: 8px;
		block-size: 70%;
		position: absolute;
		display: none;
		opacity: 0.5;
	}

	.prev-image {
		transform: translateX(-90%);
	}

	.next-image {
		transform: translateX(90%);
	}
	.current-image2 {
		transform: scale(1.5);
		z-index: 1;
	}

	.prev-image2,
	.next-image2 {
		padding: 5px;
		block-size: 800%;
		position: absolute;
		display: none;
		opacity: 0.5;
	}

	.prev-image2 {
		transform: translateX(-130%);
	}

	.next-image2 {
		transform: translateX(130%);
	}
</style>
