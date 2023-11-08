<script>
	import { goto } from '$app/navigation';
	import { u } from '$lib/stores/userStore';
	$: console.log($u.userClothes);

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function mixAndMatch(carouselIndex) {
		carousels[carouselIndex].images = shuffleArray([...carousels[carouselIndex].images]);

		let spinCount = 1;
		let intervalId = setInterval(() => {
			next(carouselIndex);
			spinCount--;
			if (spinCount <= 0) clearInterval(intervalId);
		}, 0);
	}

	let topsCarousel = {
		images: $u.userClothes.filter((v) => v.category === 'Tops').map((v) => v.imageUrl),
		currentIndex: 0,
		startX: 0
	};

	let bottomsCarousel = {
		images: $u.userClothes.filter((v) => v.category === 'Bottoms').map((v) => v.imageUrl),
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
	let carousels = [
		topsCarousel,
		bottomsCarousel
		/* extrasCarousel1,
		extrasCarousel2,
		extrasCarousel3 */
	];
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

	function next(carouselIndex) {
		carousels[carouselIndex].currentIndex =
			(carousels[carouselIndex].currentIndex + 1) % carousels[carouselIndex].images.length;
	}

	function previous(carouselIndex) {
		carousels[carouselIndex].currentIndex =
			(carousels[carouselIndex].currentIndex - 1 + carousels[carouselIndex].images.length) %
			carousels[carouselIndex].images.length;
	}
	function mixCarousel(carouselIndex) {
		next(carouselIndex);
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

	// Functions to navigate to the next image for the existing carousels
	function nextExisting(carouselIndex) {
		existingCarousels[carouselIndex].currentIndex =
			(existingCarousels[carouselIndex].currentIndex + 1) %
			existingCarousels[carouselIndex].images.length;
	}

	function previousExisting(carouselIndex) {
		existingCarousels[carouselIndex].currentIndex =
			(existingCarousels[carouselIndex].currentIndex -
				1 +
				existingCarousels[carouselIndex].images.length) %
			existingCarousels[carouselIndex].images.length;
	}

	// Functions to navigate to the next image for the extra carousels
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
			on:click={() => goto('/carousel/carousel2')}>Dresses & Overalls</button
		>
		<button
			class="bg-transparent border border-gray-600 text-gray-500 text-center no-underline inline-block text-xs px-5 py-2 font-source rounded-full"
			on:click={() => carousels.forEach((_, index) => mixAndMatch(index))}>Mix & Match</button
		>
	</div>
	<div class="carousel-container">
		<!-- flex flex-col items-center justify-start h-[61vh] overflow-hidden mt-3 -->
		{#each carousels as carousel, carouselIndex (carousel)}
			<div
				class="carousel"
				on:touchstart={(event) => handleSwipeStart(event, carouselIndex)}
				on:touchend={(event) => handleSwipeEnd(event, carouselIndex)}
			>
				<!-- relative flex items-center justify-center h-[80vh] w-full overflow-hidden mb-6 z-10 -->
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

	<div class="flex flex-col mt-12">
		<button>
			<p class="text-gray-600 font-heebo text-sm bg-transparent no-underline font-extrabold">
				CHOOSE EXTRAS
			</p>
			<p class="nuoli"><i class="arrow" /></p>
		</button>
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
		height: 61vh;
		overflow: hidden;
		margin-top: 0.7em;
	}
	.carousel-container2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 55vh;
		overflow: hidden;
		margin-top: 2em;
		margin-bottom: 3em;
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
		padding: 15px;
		block-size: 70%;
		position: absolute;
		display: none;
		opacity: 0.5;
	}

	.prev-image {
		transform: translateX(-100%);
	}

	.next-image {
		transform: translateX(100%);
	}
	.current-image2 {
		transform: scale(1);
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
	/* 	.napit {
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
	} */
	/* .vaatenapi {
		display: flex;
		justify-content: space-evenly;
		margin-top: 0.5em;
	} */
	/* 	.choose {
		font-family: 'Heebo', sans-serif;
		text-decoration: none;
		background-color: transparent;
		color: rgb(90, 90, 90);
		border: none;
		font-weight: bolder;
		display: flex;
		justify-content: center;
		margin: 0;
		cursor: pointer;
		font-size: 0.9em;
	} */
	.arrow {
		border: solid #d499ff;
		border-radius: 15%;
		border-width: 0 3.3px 3.3px 0;
		padding: 0.5em;
		transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
	}
	.nuoli {
		background-color: transparent;
		text-decoration: none;
		border: none;
		display: flex;
		justify-content: center;
		cursor: pointer;
	}
	/* .alanapit {
		display: flex;
		flex-direction: column;
		margin-top: 0.5em;
	} */
	/* button {
		background-color: transparent;
		text-decoration: none;
		border: none;
	} */
</style>
