angular.module('myApp.mock.http', [])
  .controller('MyController', ['$scope', '$http', function($scope, $http) {
    $scope.onclick = function() {
      $http({
        method: 'GET',
        url: 'http.php',
        params: { name: $scope.name }
      })
      .success(function(data, status, headers, config){
        $scope.result = data;
      })
      .error(function(data, status, headers, config){
        $scope.result = '!!通信に失敗しました!!';
      });
    };
  }]);
