
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.url = 'http://google.com';
  }]);



/*
angular.module('myApp', [])
  .controller('MyController', ['$scope', '$timeout', function($scope, $timeout) {
    $timeout(function() {
      $scope.url = 'https://google.co.jp';
    }, 3000);
  }]);

*/