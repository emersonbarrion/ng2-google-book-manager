import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { ObgBookAppComponent } from '../app/obg-book.component';

beforeEachProviders(() => [ObgBookAppComponent]);

describe('App: ObgBook', () => {
  it('should create the app',
      inject([ObgBookAppComponent], (app: ObgBookAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'obg-book works!\'',
      inject([ObgBookAppComponent], (app: ObgBookAppComponent) => {
    expect(app.title).toEqual('obg-book works!');
  }));
});
