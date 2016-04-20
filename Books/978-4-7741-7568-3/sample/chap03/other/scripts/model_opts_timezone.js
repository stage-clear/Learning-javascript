angular.module('myApp', [])
  .controller('MyController', function($scope) {
    $scope.today = new Date();
  });

