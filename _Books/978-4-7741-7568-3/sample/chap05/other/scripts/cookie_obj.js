angular.module('myApp', [ 'ngCookies' ])
  .controller('MyController', ['$scope', '$cookies', function($scope, $cookies) {
    var data = { name: '山田理央', old: new Date(2007, 6, 25), sex: 'male' };
    $cookies.putObject('data', data);
    console.log($cookies.getObject('data').old);
  }]);
