describe('MyControllerコントローラーのテスト', function() {
  var scope;

  beforeEach(module('myApp.controller'));

  beforeEach(inject(function(_$rootScope_, _$controller_){
    var $rootScope = _$rootScope_;
    var $controller = _$controller_;
    scope = $rootScope.$new();
    $controller('MyController', { $scope: scope });
  }));

  it('スコープのチェック', function() {
    expect(scope.greeting).toEqual('こんにちは、権兵衛さん！');
    scope.myName = '山田';
    scope.onclick();
    expect(scope.greeting).toEqual('こんにちは、山田さん！');
  });
});
