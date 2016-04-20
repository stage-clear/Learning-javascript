angular.module('myApp', [])
  .controller('MyController', ['$scope', '$window', '$timeout', function($scope, $window, $timeout) {
    $window.navigator.geolocation.watchPosition(
      function(pos) {
        $timeout(function() {
          $scope.latitude = pos.coords.latitude;
          $scope.longitude = pos.coords.longitude;
        });
      },
      function(e) {
        console.log(e.message);
      }
    );
  }]);

