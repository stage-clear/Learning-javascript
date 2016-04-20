angular.module('myApp', [ 'ngSanitize' ])
  .controller('MyController', ['$scope', function($scope) {
    $scope.urls = [
      'http://www.wings.msn.to/',
      'https://www.wings.msn.to/',
      'ftp://www.wings.msn.to/',
      'file://c:/data/wings/',
      'サポートサイトはこちら（ http://www.wings.msn.to/ ）',
      'hoge@example.com',
      'mailto:hoge@example.com',
    ];
  }]);
