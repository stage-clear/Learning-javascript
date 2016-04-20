angular.module('myApp', [])
  .controller('MyController',
  ['$scope', '$interval', function($scope, $interval) {
    var timer = $interval(function() {
      $scope.current = new Date();
    }, 1000);

    $scope.onclick = function() {
      $interval.cancel(timer);
    };
  }]);
