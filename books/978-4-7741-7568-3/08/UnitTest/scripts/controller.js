

angular.module('myApp.controller', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.greeting = 'こんにちは、John!';
    
    $scope.onclick = function() {
      $scope.greeting = 'こんにちは、' + $scope.myName + '!';;
    };
  }])