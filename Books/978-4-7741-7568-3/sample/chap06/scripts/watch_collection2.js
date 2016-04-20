angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.book = {
      isbn: '978-4-7741-7078-7',
      title: 'サーブレット＆JSPポケットリファレンス',
      price: 2680,
      publish: '技術評論社',
      published: new Date(2015, 0, 8),
      images : [ 'cover.jpg', 'logo.jpg' ]
    };

    $scope.$watchCollection('book', function(newValue, oldValue, scope) {
      console.log(newValue);
    });

    $scope.onclick = function() {
      //$scope.book = {};
      //$scope.book.title = '未定';
      //$scope.book.author = '山田太郎';
      $scope.book.images.push('cover2.jpg');
    };
  }]);
