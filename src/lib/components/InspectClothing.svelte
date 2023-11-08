<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let valittuItemi = null;

	function handleClose() {
		dispatch('close');
	}
	console.log(valittuItemi);
</script>

<main>
	{#if valittuItemi}
		<button
			on:click={handleClose}
			class=" bg-transparent outline-none border-none flex justify-start"
		>
			<span class="material-icons text-grey text-icon">chevron_left</span></button
		>
		<div class="modali">
			<img src={valittuItemi.imageUrl} alt="käyttäjän vaate" class="iso-kuva" />
		</div>
		<div class="ala">
			<div class="desc">
				<p>{valittuItemi.desc}</p>
				<button
					class="bg-transparent border border-gray-600 text-gray-500 text-center no-underline inline-block text-xs px-5 py-2 font-source rounded-full"
					>Edit</button
				>
			</div>
		</div>
		<div class="omatasut">
			<button class="button2">Add outfit&nbsp; <span class="plus"> +</span></button>
			<img src="/images/image 1.png" alt="asu" class="asu" />
		</div>
	{/if}
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Heebo&display=swap');
	main {
		padding: 8px;
	}
	.asu {
		display: flex;
		justify-content: flex-start;
		max-width: 30%;
	}
	.material-icons {
		font-size: 3em;
	}
	/* .add {
		display: flex;
		justify-content: flex-start;
		background-color: transparent;
		border: none;
		color: rgba(90, 90, 90, 1);
		padding-bottom: 1.5em;
		font-weight: bold;
		font-size: 0.9em;
		font-family: 'Heebo', sans-serif;
	} */
	/* .plus {
		color: #c97eff;
		font-weight: bold;
	} */
	/* .edit {
		background-color: transparent;
		border: 1px solid rgba(64, 64, 64, 1);
		color: rgb(124, 120, 120);
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 0.8em;
		margin-right: 2em;
		cursor: pointer;
		border-radius: 30px;
		padding: 0.6em 2.4em;
		font-family: 'Source Code Pro', monospace;
	} */
	.omatasut {
		margin-top: 0.6em;
		left: 0;
	}
	.ala {
		width: 100%;
	}
	.desc {
		background-color: rgba(248, 247, 244, 0.904);
		width: 100%;

		margin-top: 0.5em;
		font-family: 'Source Code Pro', monospace;
		color: rgb(124, 120, 120);

		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	p {
		font-size: 0.8em;
		padding: 2em;
	}
	.arrow {
		border: solid #d499ff;
		border-radius: 25%;
		border-width: 0 3.3px 3.3px 0;
		padding: 0.5em;
		transform: rotate(135deg);
		-webkit-transform: rotate(135deg);
	}
	/* .nuoli {
		margin-left: 1.5em;
		display: flex;
		justify-content: flex-start;
		background-color: transparent;
		text-decoration: none;
		border: none;
	} */
	.modali {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.iso-kuva {
		max-width: 65%;
		height: auto;
	}
	main {
		padding: 8px;
	}
</style>
