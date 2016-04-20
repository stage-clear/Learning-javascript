angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.onmousemove = function($event) {
      $scope.screenX = $event.screenX;
      $scope.screenY = $event.screenY;
      $scope.pageX = $event.pageX;
      $scope.pageY = $event.pageY;
      $scope.clientX = $event.clientX;
      $scope.clientY = $event.clientY;
      $scope.offsetX = $event.offsetX;
      $scope.offsetY = $event.offsetY;
    };
  }]);
