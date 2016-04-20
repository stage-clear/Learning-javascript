angular.module('myApp', [ 'ngCookies' ])
  .controller('MyController',
  ['$scope', '$cookies', function($scope, $cookies) {
    $scope.email = $cookies.get('email');
    $scope.record = true;

    $scope.onclick = function() {
      if($scope.record) {
        var expire = new Date();
        expire.setMonth(expire.getMonth() + 3);
        $cookies.put('email', $scope.email, {
          expires: expire
        });
      } else {
        $cookies.remove('email');
      }
    };
  }]);
