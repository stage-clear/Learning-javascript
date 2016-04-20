angular.module('myApp', [ 'ngCookies' ])
  .config(['$cookiesProvider', function($cookiesProvider) {
     var expire = new Date();
     expire.setMonth(expire.getMonth() + 6);
     $cookiesProvider.defaults.expires = expire;
  }])

  .controller('MyController', ['$scope', '$cookies', function($scope, $cookies) {
    $scope.email = $cookies.get('email');
    $scope.record = true;

    $scope.onclick = function() {
      if($scope.record) {
        $cookies.put('email', $scope.email);
      } else {
        $cookies.remove('email');
      }
    };
  }]);
