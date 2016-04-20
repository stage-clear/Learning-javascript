


angular.module('myApp', ['ngRoute'])
  .factory('MyPosition', ['$q', '$window', function($q, $window) {
    var deferred = $q.defer();
    // 現在位置を取得して、呼び出し元にその座標（pos.coords）を送信
    $window.navigator.geolocation.getCurrentPosition(
      function(pos) {
        return deferred.resolve(pos.coords);
      }
    );
    return deferred.promise;
  }])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      // ... 中略

      .when('/resolve', {
        templateUrl: 'views/resolve.html',
        controller: 'ResolveController',
        // `CurrentPosition` という名前で依存関係のあるサービスを注入
        resolve: {
          CurrentPosition: 'MyPosition'
        }
      })

      // ... 中略
  }]);
