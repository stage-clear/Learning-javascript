angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.base = 0;
    $scope.height = 0;
    $scope.area = 0;

/*
    $scope.cancel =
      $scope.$watchGroup(['base', 'height'],
        function(newValue, oldValue, scope) {
        scope.area = scope.base * scope.height / 2;
      });
*/

    $scope.cancel =
      $scope.$watchGroup(
        [
          function() { return $scope.base; },
          function() { return $scope.height; }
        ],
        function(newValue, oldValue, scope) {
        scope.area = scope.base * scope.height / 2;
      });

    $scope.onstop = function() {
      $scope.cancel();
    };

  }]);