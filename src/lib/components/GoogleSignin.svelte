<script>
	import { onMount } from 'svelte';
	import { u } from '$lib/stores/userStore';
	import { goto } from '$app/navigation';
	import { jwtDecode } from 'jwt-decode';
	let userId = '';
	let userName = '';
	let userPicture = '';
	let loggedIn = false; // Track the user's login state

	// Check for the JWT token in local storage
	/*
  onMount(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // User is already logged in
      loggedIn = true;
    }
  });
  */

	// Function to handle the logout action
	function handleLogout() {
		// Remove the JWT token from local storage
		sessionStorage.clear();
		// Update the login state to false
		loggedIn = false;
	}

	let fits = [];

	// Function to fetch user-specific fits from the backend
	async function fetchUserFits() {
		try {
			// Retrieve the JWT token from localStorage or a cookie
			const jwtToken = sessionStorage.getItem('jwtToken');

			if (jwtToken) {
				const decoded = jwtDecode(jwtToken);
				userId = decoded.username;
				// Include the token in the headers of the request
				const headers = {
					Authorization: `Bearer ${jwtToken}`
				};

				const response = await fetch(`http://localhost:3000/fits/${userId}`, {
					headers
				});
				console.log(userId);
				if (response.ok) {
					u.set({
						userFits: await response.json()
					});
				} else {
					console.error('Error fetching user fits');
				}
			} else {
				console.error('JWT token not found');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	// Fetch fits when the component is mounted
	onMount(fetchUserFits);

	// Fetch fits when the component is mounted
	onMount(fetchUserFits);

	function handleCredentialResponse(response) {
		fetch('http://localhost:3000/users/glogin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ gtoken: response.credential, payload: response.credential })
		})
			.then((response) => response.json())
			.then((data) => {
				// Handle the JWT token received from the backend as needed
				const token = data.token;
				console.log(data);
				if (token) {
					// Store the token in local storage
					sessionStorage.setItem('jwtToken', token);

					// Now, set the 'loggedIn' variable to true or perform other actions
					// Make sure loggedIn is declared and managed properly in your application
					loggedIn = true;

					// Fetch user's clothes from the database
					fetchUserFits();

					try {
						let info = response.credential.split('.');

						let payload = JSON.parse(atob(info[1]));

						let user = payload.name;
						let userPic = payload.picture;
						u.set({
							isLoggedIn: true, // Assuming the user is now logged in
							userName: user,
							userPicture: userPic
						});
						console.log(user);
						goto('/home');
					} catch (error) {
						console.error('Error processing JWT payload', error);
						// Handle the error, possibly redirect to an error page
					}
				}
			})
			.catch((error) => {
				console.error('Error sending Google token to the backend', error);
				// Handle the error, show a message, or redirect to an error page if necessary.
			});
	}

	function fetchUserClothes() {
		// Perform a fetch request to get the user's clothes
		// Replace the URL with the appropriate endpoint in your backend
		fetch('http://localhost:3000/clothes/jwtToken', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`
			}
		})
			.then((response) => response.json())
			.then((data) => {
				// Handle the user's clothes data here
				console.log("User's clothes:", data);
				// Update the UI with the user's clothes data, or perform other actions as needed
			})
			.catch((error) => {
				console.error("Error fetching user's clothes", error);
				// Handle the error, show a message, or redirect to an error page if necessary.
			});
	}

	// Kutsu handleGoogleLogin-funktiota Google-kirjautumisen tapahtuessa.

	onMount(() => {
		if (typeof google !== 'undefined' && google.accounts) {
			google.accounts.id.initialize({
				client_id: '892655829126-ifsbmmfgufu400i9efn5c8hhmhrdhh7o.apps.googleusercontent.com',
				callback: handleCredentialResponse
			});

			google.accounts.id.renderButton(document.getElementById('google-button-signin'), {
				scope: 'profile email',
				width: 100,
				height: 50,
				type: 'standard',
				size: 'large',
				theme: 'filled_black',
				shape: 'pill',
				text: 'signin_with'
			});

			google.accounts.id.prompt();
		} else {
			console.error('Google Sign-In API not available.');
		}
	});
</script>

<main>
	<!-- Display the logout button if the user is logged in -->
	{#if loggedIn}
		<p>Username:{userName}</p>
		<img src={userPicture} alt="User Profile" />
		<button on:click={handleLogout}>logout</button>
		{#if fits.length > 0}
			<h1>Fits for User {userId}</h1>
			<ul>
				{#each fits as fit (fit._id)}
					<li>
						<img src={fit.kuvaUrl} alt="Fit Image" />
					</li>
				{/each}
			</ul>
		{:else}
			<p>No fits found for user {userId}</p>
		{/if}
	{/if}

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div id="google-button-signin" />
</main>

<style>
	#google-button-signin {
		display: flex;
		justify-content: center; /* Center horizontally */
		align-items: center; /* Center vertically */
		height: 5vh; /* Set the height to center vertically within the viewport */
	}
</style>
