import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../../models/app-store';

@Component({
  moduleId: module.id,
  selector: 'app-sample',
  templateUrl: 'sample.component.html',
  styleUrls: ['sample.component.css']
})
export class SampleComponent implements OnInit {
	favoriteBooks: any;
	@Output() remove = new EventEmitter();

	constructor(private store: Store<AppStore>) {
		store.select('favoriteBooks').subscribe(books => this.favoriteBooks = books);
	}

	ngOnInit() {
	}

	removeFavoriteBook(book) {
		this.remove.emit(book);
	}

}