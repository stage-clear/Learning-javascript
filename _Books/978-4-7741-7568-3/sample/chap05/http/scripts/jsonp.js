angular.module('myApp', [])
  .controller('MyController',
    ['$scope', '$http', function($scope, $http) {
    $scope.onclick = function() {
      $http.jsonp('http://b.hatena.ne.jp/entry/jsonlite/',
        {
          params : {
            callback: 'JSON_CALLBACK',
            url: $scope.url
          }
        }
      )
      .success(function(data) {
        var comments = [];
        $scope.count = data.count + '件';
        angular.forEach(data.bookmarks, function(value, index) {
          if(value.comment !== '') {
            comments.push(value.comment);
          }
        });
        $scope.comments = comments;
      })
      .error(function(err) {
        $scope.count = '（エラー）';
        $scope.comments = [ '（エラー）' ];
      });
    };
  }]);
