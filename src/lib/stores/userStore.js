import { writable } from 'svelte/store';

export const u = writable({
	isLoggedIn: false,
	userName: '',
	fullName: '',
	userClothes: [],
	userFits: [],
	myLikes: []
});
export const all = writable({
	allFits: []
});
