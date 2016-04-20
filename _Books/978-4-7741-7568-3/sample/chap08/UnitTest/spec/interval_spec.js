describe('$intervalモックのテスト', function() {
  var LoopService;

  beforeEach(module('myApp.mock.interval'));

  beforeEach(inject(function(_LoopService_){
    LoopService = _LoopService_;
  }));

  it('スコープのチェック', inject(function($interval) {
    var messages = [ 'AngularJSの基本', 'コントローラー', 'サービス', 'モジュール', 'DIコンテナー' ];
    for (var i = 0; i < messages.length; i++) {
      expect(LoopService.message).toEqual(messages[i]);
      $interval.flush(5000);
    }
    expect(LoopService.message).toEqual(messages[0]);
  }));
});
