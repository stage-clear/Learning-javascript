

describe('MyControllerコントローラーのテスト', function() {
  // MyController のスコープを格納するための変数
  var scope;
  
  // モジュールを有効化
  beforeEach(module('myApp.controller'));
  
  // $rootScope/$controller サービスを注入
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    var $rootScope = _$rootScope_;
    var $controller = _$controller_;
    // テスト対象のコントローラーを初期化
    scope = $rootScope.$new();
    $controller('MyController', { $scope: scope });
  }));
  
  it('スコープのチェック', function() {
    // 初期状態の greeting プロパティをチェック
    expect(scope.greeting).toEqual('こんにちは、John!');
    // myName プロパティを更新 & onclick イベントリスナーを実行
    scope.myName = 'Yamada';
    scope.onclick();
    // 処理終了後の greeting プロパティをチェック
    expect(scope.greeting).toEqual('こんにちは、Yamada!')
  })
})