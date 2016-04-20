angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.today = new Date();
  }]);
