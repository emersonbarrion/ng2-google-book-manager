import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { GoogleBooksService } from './services/google-books/google-books.service';
import { InputDebounceComponent } from "./components/input-debounce/input-debounce.component";
import { SampleComponent } from "./components/sample/sample.component";
import { AppStore } from './models/app-store';
import { Book } from './models/book';

declare let _: any;

@Component({
  	moduleId: module.id,
  	selector: 'obg-book-app',
  	templateUrl: 'obg-book.component.html',
  	styleUrls: ['obg-book.component.css'],
	providers: [GoogleBooksService],
	directives: [InputDebounceComponent, SampleComponent]
})
export class ObgBookAppComponent implements OnInit {
	title = 'Google Books';
	sampleBooks: any;
	favoriteBooks: any;
	error: string;
	books: any;
	
	constructor(private googleBookService: GoogleBooksService, private store: Store<AppStore>){
	}

	ngOnInit() {
		this.store.select('favoriteBooks').subscribe(books => this.favoriteBooks = books);
		this.viewFavoriteBooks();
	}

	getBooks(){
		this.googleBookService
			.searchBooks('test')
			.subscribe(books => this.sampleBooks = books,
					   error => this.error = <any>error);
	}

	searchBooks(query) {
		let words = _.split(_.trim(query), ' ');
		let searchText = _.join(words, '+');
		console.log(query);

		if (query) {
			this.googleBookService
				.searchBooks(searchText)
				.subscribe(books => this.sampleBooks = books,
							error => this.error = <any>error);
		}
	}

	viewFavoriteBooks() {
		this.googleBookService
			.viewFavoriteBooks()
			.subscribe(books => this.sampleBooks = books,
					   	error => this.error = <any>error);
	}

	addFavoriteBook(book: Book) {
		this.googleBookService.addFavoriteBooks(book);
	}

	removeFavoriteBook(book: Book) {
		this.googleBookService.removeFavoriteBooks(book);
	}

	remove(book){
		console.log('COMING FROM OUTPUT');
		this.removeFavoriteBook(book);
	}
}