angular.module('myApp', [])
  .directive('myHello', function() {
    return {
      restrict: 'E',
      templateUrl: 'helloTemplate2.html'
    }
  })

  .controller('MyController', ['$scope', function($scope) {
  }]);
