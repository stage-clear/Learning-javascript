
describe('nl2brフィルターのテスト', function() {
  // 注入したサービスを格納する変数
  var $filter;
  
  beforeEach(module('myApp.filter2'));
  
  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));
  
  it('改行付き文字列を変換する', function() {
    var str = 'こんにちは、世界！\nこんにちは';
    var res = 'こんにちは、世界！<br />こんにちは';
    
    var nl2br = $filter('nl2br');
    expect(nl2br(str)).toEqual(res)
  })
})