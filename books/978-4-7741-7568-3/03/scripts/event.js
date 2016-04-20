
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.greeting = 'Hello, world';
    
    $scope.onclick = function() {
      $scope.greeting = 'Hello, ' + $scope.myName + '!';
    };
  }]);