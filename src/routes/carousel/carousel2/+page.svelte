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

		let spinCount = 5;
		let intervalId = setInterval(() => {
			next(carouselIndex);
			spinCount--;
			if (spinCount <= 0) clearInterval(intervalId);
		}, 0);
	}

	let overallCarousel = {
		images: $u.userClothes.filter((v) => v.category === 'Overall').map((v) => v.imageUrl),
		currentIndex: 0,
		startX: 0
	};

	let carousels = [overallCarousel];

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
</script>

<div class="vaatenapi">
	<button class="napit" on:click={() => goto('/carousel')}>Tops & Bottoms</button>
	<button class="napit" on:click={() => carousels.forEach((_, index) => mixAndMatch(index))}
		>Mix & Match</button
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
							: i === (carousel.currentIndex - 1 + carousel.images.length) % carousel.images.length
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
<div class="alanapit">
	<button>
		<p class="choose">CHOOSE EXTRAS</p>
		<p class="nuoli"><i class="arrow" /></p>
	</button>
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
		margin-top: 3em;
		margin-bottom: 3.5em;
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
	.napit {
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
	.vaatenapi {
		display: flex;
		justify-content: space-evenly;
		margin-top: 0.5em;
	}
	.choose {
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
		order: 1;
	}
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
		order: 2;
		margin: 0;
		padding-top: 0.6em;
	}
	.alanapit {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	button {
		background-color: transparent;
		text-decoration: none;
		border: none;
	}
</style>
