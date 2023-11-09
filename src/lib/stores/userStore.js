import { writable } from 'svelte/store';

export const u = writable({
	userName: {},
	userPicture: '',
	userClothes: [],
	userFits: [],
	myLikes: []
});
export const all = writable({
	allFits: []
});
