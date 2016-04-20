angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.path = 'JavaScript:alert("危険！")';
  }]);
