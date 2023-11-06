<script>
	import { goto } from '$app/navigation';
	import { all, u } from '$lib/stores/userStore'; // Import the store
	import { onMount, onDestroy } from 'svelte';
	import { showContent } from '$lib/stores/layoutStore';
	let usersName = '';
	let passWord = '';

	onMount(() => {
		showContent.set(false);
	});

	onDestroy(() => {
		showContent.set(true);
	});

	/* jee*/
	async function logIn() {
		// Fetch user data
		fetch('http://localhost:5173/backend.json')
			.then((response) => response.json())
			.then((data) => {
				const user = data.users.find((u) => u.username === usersName);
				if (user && user.password === passWord) {
					let allFits = data.users.reduce((acc, user) => {
						return acc.concat(user.fits);
					}, []);
					// Update the user store
					all.set({
						allFits: allFits
					});
					u.set({
						isLoggedIn: true,
						userName: usersName,
						fullName: user.fullname,
						userClothes: user.clothes,
						userFits: user.fits,
                        myLikes: []
					});
					// Navigate to feedall page
					goto('/home');
				} else {
					console.error('Invalid login');
				}
			})
			.catch((error) => {
				console.error('Error fetching user data:', error);
			});
	}

	function handleEnterKey(event) {
		if (event.key === 'Enter') {
			logIn();
		}
	}
</script>

<main class="min-h-screen flex flex-col justify-center items-center p-4">
	<div class="mb-4">
		<img src="/icons/logogf.png" alt="logo" class="max-w-full h-auto" />
	</div>

	<div class="w-full max-w-md px-8 py-6 mx-4 mt-4 text-left bg-white">
		<p class="mb-6 text-center text-xl">Login to your account</p>
		<div class="mb-4">
			<div class="mb-6">
				<label for="uname" class="sr-only" />
				<input
					class="w-full p-2 border-b-2 text-center focus:outline-none"
					type="text"
					bind:value={usersName}
					placeholder="Email"
					name="uname"
					required
					on:keydown={handleEnterKey}
				/>
			</div>

			<div class="mb-6">
				<label for="psw" class="sr-only" />
				<input
					type="password"
					class="w-full p-2 border-b-2 text-center focus:outline-none"
					bind:value={passWord}
					placeholder="Password"
					name="psw"
					required
					on:keydown={handleEnterKey}
				/>
			</div>

			<div class="text-sm text-center text-purple-500">
				<p>Forgot your password?</p>
			</div>
			<div class="mt-4 text-center text-sm">
				<p class="inline">Don't have an account?</p>
				<p class="inline ml-1 text-purple-500 cursor-pointer">Sign up</p>
			</div>
			<button
				type="button"
				class="w-full px-4 py-2 mt-4 text-sm bg-white border rounded-full focus:outline-none"
				on:click={logIn}
				on:keypress={logIn}><b>Login</b></button
			>
		</div>
	</div>
</main>

<!-- <style>
	main {
		/*font-family: 'Roboto Mono';*/
		margin: 0;
		padding: 8px;
	}
	::placeholder {
		font-family: 'Source Code Pro', monospace;
		font-size: 0.8em;
		color: rgb(124, 120, 120);
		text-align: center;
		padding-bottom: 20px;
	}
	.kirjaudu {
		background-color: rgb(255, 255, 255);
		border: 1px solid rgba(64, 64, 64, 1);
		color: rgb(124, 120, 120);
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 0.7em;
		margin: 1.6em 2px;
		cursor: pointer;
		border-radius: 30px;
		padding: 0.8em 2.5em;
		font-family: 'Source Code Pro', monospace;
	}
	.no-outline {
		border: none;
		outline: none;
		padding: 0;
		margin: 0;
		width: 22em;
	}
	.txtfield {
		position: relative;
		border-bottom: 1px solid #000000;
		margin-top: 20px;
		padding-bottom: 10px;
		/*width: 232.8px;*/
		font-size: 0.9em;
		color: rgb(124, 120, 120);
		font-family: 'Source Code Pro', monospace;
	}
	.center p {
		font-size: 1em;
		margin-bottom: 1.6em;
		margin-top: 0;
		font-family: 'Source Code Pro', monospace;
	}
	.center {
		color: rgb(0, 0, 0);
		/* font-family: 'Roboto Mono'; */
		font-size: 1.2em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		margin: 0;
		height: 400px;
	}
	.forgot {
		color: #882ec9;
		font-size: 0.7em;
		margin-top: 2em;
	}
	.signup {
		font-size: 0.7em;
		margin-top: 2em;
		color: #000000;
		display: flex;
	}
	.sign {
		flex: 2;
		color: #882ec9;
		font-size: 0.7em;
		margin-top: 2em;
	}
	.image-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1em;
	}
	input {
		text-align: center;
	}
	img {
		max-width: 100%;
		max-height: 100%;
	}
</style>
 -->
