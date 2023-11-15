<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { u } from '$lib/stores/userStore.js';
	import { jwtDecode } from 'jwt-decode';

	async function fetchUserClothes() {
		try {
			// Retrieve the JWT token from localStorage or a cookie
			const jwtToken = sessionStorage.getItem('jwtToken'); // Adjust this based on your storage method

			if (jwtToken) {
				const decodedToken = jwtDecode(jwtToken);
				const userId = decodedToken.username;

				// Include the token in the headers of the request
				const headers = {
					Authorization: `Bearer ${jwtToken}`
				};

				const response = await fetch(`http://localhost:3000/clothes/userid/${userId}`, {
					headers
				});

				if (response.ok) {
					u.set({
						userClothes: await response.json(),
						myLikes: []
					});
				} else {
					console.error('Error fetching user fits');
				}
			} else {
				console.error('JWT token not found');
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchUserFits() {
		try {
			// Retrieve the JWT token from localStorage or a cookie
			const jwtToken = sessionStorage.getItem('jwtToken'); // Adjust this based on your storage method

			if (jwtToken) {
				const decodedToken = jwtDecode(jwtToken);
				const userId = decodedToken.username;
				// Include the token in the headers of the request
				const headers = {
					Authorization: `Bearer ${jwtToken}`
				};

				const response = await fetch(`http://localhost:3000/fits/${userId}`, {
					headers
				});

				if (response.ok) {
					u.set({
						userFits: await response.json(),
						myLikes: []
					});
				} else {
					console.error('Error fetching user fits');
				}
			} else {
				console.error('JWT token not found');
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchUserData() {
		try {
			// Retrieve the JWT token from localStorage or a cookie
			const jwtToken = sessionStorage.getItem('jwtToken'); // Adjust this based on your storage method

			if (jwtToken) {
				const decodedToken = jwtDecode(jwtToken);
				const userId = decodedToken.username;

				// Include the token in the headers of the request
				const headers = {
					Authorization: `Bearer ${jwtToken}`
				};

				// Fetch user clothes
				const clothesResponse = await fetch(`http://localhost:3000/clothes/userid/${userId}`, {
					headers
				});

				// Fetch user fits
				const fitsResponse = await fetch(`http://localhost:3000/fits/${userId}`, {
					headers
				});

				if (clothesResponse.ok && fitsResponse.ok) {
					// Set both userClothes and userFits in the store
					u.set({
						userClothes: await clothesResponse.json(),
						userFits: await fitsResponse.json(),
						myLikes: []
					});
				} else {
					console.error('Error fetching user data');
				}
			} else {
				console.error('JWT token not found');
			}
		} catch (error) {
			console.error(error);
		}
	}

	function handleCredentialResponse(response) {
		fetch('http://localhost:3000/users/glogin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ gtoken: response.credential })
		})
			.then((response) => response.json())
			.then((data) => {
				// Handle the JWT token received from the backend as needed
				const token = data.token;

				if (token) {
					// Store the token in local storage
					sessionStorage.setItem('jwtToken', token);

					// Fetch user's clothes and fits from the database
					fetchUserData();

					// after succesfully logged in, directed to home page which is feed/me
					goto('/home');
				}
			})
			.catch((error) => {
				console.error('Error sending Google token to the backend', error);
				// Handle the error, show a message, or redirect to an error page if necessary.
			});
	}

	// Kutsu handleGoogleLogin-funktiota Google-kirjautumisen tapahtuessa.

	onMount(() => {
		try {
			if (typeof google !== 'undefined' && google.accounts) {
				google.accounts.id.initialize({
					client_id: '892655829126-ifsbmmfgufu400i9efn5c8hhmhrdhh7o.apps.googleusercontent.com',
					callback: handleCredentialResponse
				});

				google.accounts.id.renderButton(document.getElementById('google-button-signin'), {
					scope: 'profile email',
					logo_alignment: 'left',
					type: 'stantard',
					size: 'large',
					theme: 'filled_black',
					shape: 'pill',
					text: 'continue_with'
				});

				google.accounts.id.prompt();
			} else {
				console.error('Google Sign-In API not available.');
			}
		} catch (error) {
			console.error('Error initializing Google Sign-In API:', error);
		}
	});
</script>

<main>
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
