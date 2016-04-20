angular.module('myApp', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
  }])
  .controller('MyController', ['$scope', '$http', function($scope, $http) {
    $scope.onclick = function() {
      $http.get('http.php', { params: { name: $scope.name } })
      .success(function(data, status, headers, config){
        $scope.result = data;
      })
      .error(function(data, status, headers, config){
        $scope.result = '!!通信に失敗しました!!';
      });
    };
  }]);
