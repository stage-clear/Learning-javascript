/*
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.url = 'https://gihyo.jp/dp';
  }]);
*/
angular.module('myApp', [])
  .controller('MyController', ['$scope', '$timeout',  function($scope, $timeout) {
    $timeout(function() {
      $scope.url = 'https://gihyo.jp/dp';
    }, 3000);
  }]);
