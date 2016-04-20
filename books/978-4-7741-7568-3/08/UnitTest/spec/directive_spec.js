

describe('myBookディレクティブのテスト', function() {
  // スコープ/myBook 要素/ リンク関数を格納するための変数
  var $scope, element, link;
  
  // モジュールを有効化
  beforeEach(module('myApp.directive'));
  
  // $compile サービスでディレクティブをコンパイル
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    var $compile = _$compile_;
    var $rootScope = _$rootScope_;
    
    // 要素オブジェクトをコンパイル処理
    element = angular.element('<my-book my-book="data"></my-book>');
    link = $compile(element);

    // スコープと要素をリンク
    $scope = $rootScope.$new(true);
    link($scope);
  }));
  
  it('ディレクティブの結果を確認する', function() {
    var result = 'JavaScript本格入門（2,980円／技術評論社）';
    var result2 = 'サーブレット＆JSPポケットリファレンス（2,680円／技術評論社）';
    // スコープを設定し、出力結果のテキストをチェック
    $scope.data = {
      title: 'JavaScript本格入門',
      price: 2980,
      publish: '技術評論社'
    };
    $scope.$digest();
    expect(element.text()).toEqual(result);

    $scope.data = {
      title: 'サーブレット＆JSPポケットリファレンス',
      price: 2680,
      publish: '技術評論社'
    };
    $scope.$digest();
    expect(element.text()).toEqual(result2)
  })
})