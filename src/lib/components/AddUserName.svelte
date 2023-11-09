<!-- AddUsername.svelte -->
<script>
	let username = '';

	const submit = async (event) => {
		event.preventDefault();
		let jwtToken = sessionStorage.getItem('jwtToken');
		const formData = new FormData();
		formData.append('username', username);
		try {
			const response = await fetch('http://localhost:3000/users', {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${jwtToken}`
				}
			});
			console.log('Response status', response.status);

			if (response.ok) {
				// Handle success, e.g., redirect or display a success message.
				console.log('Username added successfully');
			} else {
				// Handle errors, e.g., display an error message.
				console.error('Username addition failed');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};
</script>

<form on:submit={submit}>
	<input type="text" bind:value={username} placeholder="username" />
	<button type="submit">Submit</button>
</form>
