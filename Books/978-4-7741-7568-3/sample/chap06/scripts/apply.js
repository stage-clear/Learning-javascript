angular.module('myApp', [])
  .controller('MyController',
  ['$scope', '$window', function($scope, $window) {
    $window.navigator.geolocation.watchPosition(
      function(pos) {
        // $scope.latitude = pos.coords.latitude;
        // $scope.longitude = pos.coords.longitude;

        if (!$scope.$$phase) {
          $scope.$apply(function(scope) {
            scope.latitude = pos.coords.latitude;
            scope.longitude = pos.coords.longitude;
          });
        }
      },
      function(e) {
        $window.alert(e.message);
      }
    );
  }]);