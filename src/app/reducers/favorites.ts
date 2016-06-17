import { ActionReducer } from '@ngrx/store';
import { Book } from '../models/book';

declare let _: any;

export const ADD_FAVORITE_BOOK = 'ADD_FAVORITE_BOOK';
export const REMOVE_FAVORITE_BOOK = 'REMOVE_FAVORITE_BOOK';

export const favoriteBooks: ActionReducer<any> = (state: Book[] = [], action) => {
	let isAdded: any;

	switch (action.type) {
		case ADD_FAVORITE_BOOK:
			let isAdded: boolean = _.some(state, { 'id': action.payload.id });

			if (!isAdded) {
				let newState = [...state, action.payload];
				console.log(newState);
				console.log('Added a New Favorite Book'); 
				return newState;
			}

			return state;
		case REMOVE_FAVORITE_BOOK:
			let newState = _.reject(state, { 'id': action.payload.id });
			console.log(newState);
			return newState;
		default:
			console.log(state);
			return state;
	}
}