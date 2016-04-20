angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.books = [
      'サーブレット＆JSPポケットリファレンス',
      'アプリを作ろう！Android入門',
      'ASP.NET MVC 5実践プログラミング',
      'JavaScript逆引きレシピ',
      'サーブレット＆JSPポケットリファレンス'
    ];
  }]);
