import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideStore } from '@ngrx/store';
import { ObgBookAppComponent, environment } from './app/';

import { favoriteBooks } from './app/reducers/favorites';

if (environment.production) {
  enableProdMode();
}

bootstrap(ObgBookAppComponent, [
	HTTP_PROVIDERS,
	provideStore({ favoriteBooks })
])
.catch(err => console.error(err));