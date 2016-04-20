angular.module('myApp', [])
  .directive('myHello', function() {
    return {
      restrict: 'E',
      templateUrl: 'helloTemplate.html'
    }
  })

  .controller('MyController', ['$scope', function($scope) {
  }]);
