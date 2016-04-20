

angular.module('myApp', [])
  .controller('MyController', 
    ['$scope', '$http', '$q', '$window', 
    function($scope, $http, $q, $window) {
      // ボタンクリックで日の出時刻を取得
      
      $scope.onclick = function() {
        // 経度/緯度情報を取得するための Promise を生成
        var getGeoPosition = function(success, error) {
          var deferred = $q.defer();
          // Geolocation API で現在位置を取得
          $window.navigator.geolocation.getCurrentPosition(
            // 成功コールバック関数で処理を resolve（現在の座標を送信）
            function(pos) {
              return deferred.resolve(pos.coords);
            },
            // 失敗コールバック関数で処理を reject（エラー情報を送信）
            function(err) {
              return deferred.reject(err);
            }
          );
          return deferred.promise;
        };
        
        // 日の入り時刻を取得するための Promise を生成
        var getSunset = function(coords) {
          var today = new Date();
          var api = '//www.finds.jp/ws/movesun.php';
          // 日の出日の入り計算 API に JSONP で問い合わせ
          return $http.jsonp(api, {
            params: {
              jsonp: 'JSON_CALLBACK',    // JSONP のための決まりごと
              lat: coords.latitude,     // 緯度
              lon: coords.longitude,    // 経度
              y: today.getFullYear(),   // 年
              m: today.getMonth() + 1,   // 月
              d: today.getDate(),       // 日
              tz: 9.0,                  // タイムゾーン
              e: 0                      // 標高
            }
          });
        };
        
        // 位置情報の取得を開始
        getGeoPosition()
          .then(
            // 位置情報取得に成功したら、日の入り情報取得を開始
            function(coords) {
              return getSunset(coords);
            }
          )
          .then(
            // 日の入り情報取得に成功したら、日の入り時刻情報を取得
            function(data) {
              angular.forEach(data.data.result.event,
                function(value, index) {
                  if (value.type === 'daytime' && value.boundary === 'end') {
                    $scope.result = new Date(value.time).toLocaleString();
                  }
                }
              );
            },
            // 失敗したら、エラーメッセージをダイアログ表示
            function(err) {
              $window.alert(err.message);
            }
          );
      };
    }]);