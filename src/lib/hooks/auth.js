import { session } from '$app/stores';
import { goto } from '$app/navigation';

function isUserLoggedIn() {
	const token = localStorage.getItem('jwtToken');

	if (token) {
		return true;
	} else {
		return false;
	} // Token puuttuu tai on vanhentunut
}

export function requireAuth() {
	const { subscribe, set } = session;
	return {
		subscribe,
		async login() {
			// Tarkista, onko käyttäjä kirjautunut
			// Jos ei ole, ohjaa kirjautumissivulle
			if (!isUserLoggedIn()) {
				// Muuta session-stoorin tilaa
				set({ userIsLoggedIn: false });
				goto('/');
			}
		}
	};
}
