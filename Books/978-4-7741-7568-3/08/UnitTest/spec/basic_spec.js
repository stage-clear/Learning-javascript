

describe('nl2brフィルターのテスト', function() {
  beforeEach(module('myApp.filter'));
  
  it('改行付き文字列を変換する', inject(function($filter) {
    var str = 'こんにちは、世界！\nこんにちは！';
    var result = 'こんにちは、世界！<br />こんにちは！';
    
    var nl2br = $filter('nl2br');
    expect(nl2br(str)).toEqual(result);
  }));
});