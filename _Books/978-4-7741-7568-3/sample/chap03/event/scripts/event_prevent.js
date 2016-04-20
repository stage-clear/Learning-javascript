angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.onpress = function($event) {
      var k = $event.which;
      if (!((k >= 48 && k <= 57) || k ===45 || k=== 8 || k === 0)) {
        $event.preventDefault();
      }
    };
  }]);