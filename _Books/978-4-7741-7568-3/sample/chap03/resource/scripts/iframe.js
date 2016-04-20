angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.url = 'http://www.wings.msn.to/';
  }]);