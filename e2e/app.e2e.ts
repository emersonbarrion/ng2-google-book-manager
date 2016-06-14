import { ObgBookPage } from './app.po';

describe('obg-book App', function() {
  let page: ObgBookPage;

  beforeEach(() => {
    page = new ObgBookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('obg-book works!');
  });
});
