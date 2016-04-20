describe('myBookディレクティブのテスト', function() {
  var $scope, element, link;

  beforeEach(module('myApp.directive'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    var $compile = _$compile_;
    var $rootScope = _$rootScope_;

    element = angular.element('<my-book my-book="data"></my-book>');
    link = $compile(element);
    $scope = $rootScope.$new(true);
    link($scope);
  }));

  it('ディレクティブの結果を確認する', function() {
    var result = 'JavaScript本格入門（2,980円／技術評論社）';
    var result2 = 'サーブレット＆JSPポケットリファレンス（2,680円／技術評論社）';

    $scope.data = {
      title: 'JavaScript本格入門',
      price: 2980,
      publish: '技術評論社',
    };
    $scope.$digest();
    expect(element.text()).toEqual(result);

    $scope.data = {
      title: 'サーブレット＆JSPポケットリファレンス',
      price: 2680,
      publish: '技術評論社',
    };
    $scope.$digest();
    expect(element.text()).toEqual(result2);
  });
});