import { CliDemoPage } from './app.po';

describe('cli-demo App', () => {
  let page: CliDemoPage;

  beforeEach(() => {
    page = new CliDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
