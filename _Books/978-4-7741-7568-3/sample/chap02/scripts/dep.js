angular.module('myApp.sub', [ 'ngMessages', 'ngCookies' ])
  .controller('SubController', function($scope) {
    $scope.msg = 'はじめまして、AngularJS！';
  });

angular.module('myApp.main', [ 'myApp.sub' ])
  .controller('MainController', function($scope) {
    $scope.msg = 'こんにちは、AngularJS！';
  });
