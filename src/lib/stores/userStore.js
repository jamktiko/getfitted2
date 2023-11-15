import { writable } from 'svelte/store';

export const u = writable({
	userClothes: [],
	userFits: [],
	myLikes: []
});
export const all = writable({
	allFits: []
});
