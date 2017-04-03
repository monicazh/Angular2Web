import { Angular2PlayermatchPage } from './app.po';

describe('angular2-playermatch App', () => {
  let page: Angular2PlayermatchPage;

  beforeEach(() => {
    page = new Angular2PlayermatchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
