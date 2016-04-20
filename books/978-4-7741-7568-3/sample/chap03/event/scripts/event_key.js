angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.onkeydown = function($event) {
      $scope.altKey = $event.altKey;
      $scope.ctrlKey = $event.ctrlKey;
      $scope.shiftKey = $event.shiftKey;
      $scope.which = $event.which;
    };
  }]);
