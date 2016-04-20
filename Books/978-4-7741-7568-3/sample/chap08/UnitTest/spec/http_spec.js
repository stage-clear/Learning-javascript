describe('$httpBackendモックによるテスト', function() {
  var scope, $httpBackend;

  beforeEach(module('myApp.mock.http'));

  beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_) {
    var $rootScope = _$rootScope_;
    var $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    $controller('MyController', { $scope: scope });
  }));

  it('スコープのチェック（成功時）', function() {
    var result = 'こんにちは、山田さん！';

    $httpBackend.expect('GET', 'http.php?name=' + encodeURI('山田'))
      .respond(result);

    expect(scope.result).toBeUndefined();

    scope.name = '山田';
    scope.onclick();
    $httpBackend.flush();
    expect(scope.result).toEqual(result);
  });

  it('スコープのチェック（失敗時）', function() {
    var error = '!!通信に失敗しました!!';

    $httpBackend.expect('GET', 'http.php?name=').respond(500, '');
    //$httpBackend.expectGET('http.php?name=').respond(500, '');

    scope.name = '';
    scope.onclick();
    $httpBackend.flush();
    expect(scope.result).toEqual(error);
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});