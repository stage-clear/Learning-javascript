describe('nl2brフィルターのテスト', function() {
  var $filter;

  beforeEach(module('myApp.filter2'));

  beforeEach(inject(function(_$filter_){
    $filter = _$filter_;
  }));

  it('改行付き文字列を変換する', function() {
    var str = 'こんにちは、世界！\nこんにちは、赤ちゃん！';
    var result = 'こんにちは、世界！<br />こんにちは、赤ちゃん！';

    var nl2br = $filter('nl2br');
    expect(nl2br(str)).toEqual(result);
  });
});
