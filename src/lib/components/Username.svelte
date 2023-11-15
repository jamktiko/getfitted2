<script>
	let username = '';
	let userid = '';
	let successMessage = '';
	let errorMessage = '';

	async function handleSubmit() {
		const formData = { username, userid };

		try {
			const response = await fetch('/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwtToken}` // Replace with your actual JWT token
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				successMessage = 'User data submitted successfully.';
			} else {
				const data = await response.json();
				errorMessage = data.error || 'An error occurred while submitting user data.';
			}
		} catch (error) {
			errorMessage = 'An error occurred while submitting user data.';
			console.error(error);
		}
	}
</script>

<main>
	<h1>Submit User Data</h1>

	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}

	{#if successMessage}
		<p class="success">{successMessage}</p>
	{/if}

	<form on:submit={handleSubmit}>
		<label for="username">Username:</label>
		<input type="text" id="username" bind:value={username} />

		<label for="userid">User ID:</label>
		<input type="text" id="userid" bind:value={userid} />

		<button type="submit">Submit</button>
	</form>
</main>

<style>
	/* Add your CSS styles here */
</style>
