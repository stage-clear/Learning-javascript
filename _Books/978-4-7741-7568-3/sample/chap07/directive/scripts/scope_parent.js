angular.module('myApp', [])
  .directive('myScope', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      controller: [ '$scope', function($scope) {
        $scope.onchild = function() {
          $scope.value++;
        };
      }],
      template: '<div><button ng-click="onchild()">加算</button>' +
        '{{value}}</div>'
    }
  })
  .controller('MyController', ['$scope', function($scope) {
    $scope.value = 10;
    $scope.onparent = function() {
      $scope.value++;
    };
  }]);
