angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.current = new Date();
  }]);
