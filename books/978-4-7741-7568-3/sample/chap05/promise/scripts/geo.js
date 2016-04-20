angular.module('myApp', [])
  .controller('MyController',
    ['$scope', '$http', '$q', '$window',
    function($scope, $http, $q, $window) {
    $scope.onclick = function() {
      var getGeoPosition = function(success, error) {
        var deferred = $q.defer();
        $window.navigator.geolocation.getCurrentPosition(
          function(pos) {
            return deferred.resolve(pos.coords);
          },
          function(err) {
            return deferred.reject(err);
          }
        );
        return deferred.promise;
      };

      var getSunset = function(coords) {
        var today = new Date();
        return $http.jsonp('http://www.finds.jp/ws/movesun.php',
          {
            params : {
              jsonp: 'JSON_CALLBACK',
              lat: coords.latitude,
              lon: coords.longitude,
              y: today.getFullYear(),
              m: today.getMonth() + 1,
              d: today.getDate(),
              tz: 9.0,
              e: 0
            }
          }
        );
      };

      getGeoPosition()
        .then(
          function(coords) {
            return getSunset(coords);
          }
        )
        .then(
          function(data) {
            angular.forEach(data.data.result.event, function(value, index) {
              if (value.type === 'daytime' && value.boundary === 'end') {
                $scope.result = new Date(value.time).toLocaleString();
              }
            });
          },
          function(err) {
            $window.alert(err.message);
          }
        );
    };
  }]);
