import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { favoriteBooks } from '../../reducers/favorites';
import { Book } from '../../models/book';
import { AppStore } from '../../models/app-store';

const API_URL: string = 'https://www.googleapis.com/books/v1/';
const API_KEY: string = 'AIzaSyDeoa4Z1eFpm-RywHByLlomzvUO1f8OPf0';
const USER_ID: string = '102110239655793071330';

declare let _: any;

@Injectable()
export class GoogleBooksService implements OnInit {
	constructor(private http: Http, private store: Store<AppStore>) {
	}

	ngOnInit() {
	}

    extractData(res: Response): Book[] {
		let results = res.json();
		let books: Book[] = [];
		
		_.each(results.items, (result) =>{
			books.push({
				'id': result.id,
				'title': result.volumeInfo.title,
				'description': result.volumeInfo.description
			});
		});

		return books;
    }

	private handleError (error: any) {
		let errMsg = (error.message) ? error.message :
		error.status ? `${error.status} - ${error.statusText}` : 'Server error';

		console.error(errMsg);

		return Observable.throw(errMsg);
	}

    searchBooks(searchText): Observable<Book[]> {
		return this.http
					.get(`${API_URL}volumes?q=intitle:${searchText}`)
					.map(this.extractData)
					.catch(this.handleError);
    }

    viewFavoriteBooks(): Observable<Book[]> {
		let url: string = API_URL + 'users/' + USER_ID + '/bookshelves/0/volumes';

		return this.http
					.get(url)
					.map(this.extractData)
					.catch(this.handleError);
    }

	addFavoriteBooks(book: Book) {
		this.store.dispatch({ type: 'ADD_FAVORITE_BOOK', payload: book });
	}

	removeFavoriteBooks(book: Book) {
		this.store.dispatch({ type: 'REMOVE_FAVORITE_BOOK', payload: book });
	}
}
