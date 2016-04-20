angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.base = 0;
    $scope.height = 0;
    $scope.area = 0;


    $scope.$watch('base * height', function(newValue, oldValue, scope) {
      //scope.height = scope.height + 1;
      scope.area = scope.base * scope.height / 2;
    });


    /*
    $scope.$watch('base * height / 2', function(newValue, oldValue, scope) {
      scope.area = newValue;
    });
    */

    /*
    $scope.$watch(
      function() {
        return $scope.base * $scope.height / 2;
      }, 
      function(newValue, oldValue, scope) {
        scope.area = newValue;
      });
    */
  }]);