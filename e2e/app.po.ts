export class ObgBookPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('obg-book-app h1')).getText();
  }
}
