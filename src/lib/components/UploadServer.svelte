<script>
	let file;
	let caption = '';

	const submit = async (event) => {
		event.preventDefault();
		let jwtToken = sessionStorage.getItem('jwtToken');

		const formData = new FormData();
		formData.append('image', file);
		formData.append('caption', caption);
		formData.append('jwtToken', jwtToken);
		try {
			const response = await fetch('http://localhost:3000/fits/api/posts', {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${jwtToken}`
				}
			});

			if (response.ok) {
				// Handle success, e.g., redirect or display a success message.
				console.log(jwtToken);
				console.log('Post was successful');
			} else {
				// Handle errors, e.g., display an error message.
				console.error('Post failed');
			}
		} catch (error) {
			console.error('Error:', error);
		}
		jwtToken = '';
	};
</script>

<form on:submit={submit}>
	<input type="file" accept="image/*" name="image" on:change={(e) => (file = e.target.files[0])} />

	<input type="text" bind:value={caption} placeholder="Caption" />
	<button type="submit">Submit</button>
</form>
