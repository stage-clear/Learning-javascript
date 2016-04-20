describe('E2Eテストの基本', function() {
  it('連続したページの操作', function() {
    browser.get('/angular/chap03/event/event.html');
    expect(browser.getTitle()).toEqual('AngularJS');

    element(by.model('myName')).sendKeys('山田');
    element(by.buttonText('送信')).click();
    expect(element(by.binding('greeting')).getText())
      .toEqual('こんにちは、山田さん！');

/*
  element(by.binding('greeting')).getText().then(function(text) {
    expect(text.length).toEqual(11);
  });
*/
//  (element(by.binding('greeting')).getText().length).toEqual(11);

    element(by.linkText('次のページへ')).click();
    expect(element.all(by.repeater('book in books')).count()).toEqual(8);
  });
});