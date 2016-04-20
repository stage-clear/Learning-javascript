
angular.module('myApp.sub', ['ngMessages', 'ngCookies'])
  .controller('SubController', ['$scope', function($scope) {
      $scope.msg = 'Hi, AngularJS!';
  }]);


angular.module('myApp.main', ['myApp.sub'])
  .controller('MainController', ['$scope', function($scope) {
    $scope.msg = 'Hello AngularJS';
  }]);

