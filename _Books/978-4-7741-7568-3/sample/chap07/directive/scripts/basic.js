angular.module('myApp', [])
  .directive('myHello', function() {
    return {
      restrict: 'E',
      //replace: true,
      template: '<div>こんにちは、ディレクティブ！</div>'
    }
  })

  .controller('MyController', ['$scope', function($scope) {
  }]);
