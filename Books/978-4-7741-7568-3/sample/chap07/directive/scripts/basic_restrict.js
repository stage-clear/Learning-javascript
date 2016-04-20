angular.module('myApp', [])
  .directive('myHello', function() {
    return {
      restrict: 'EACM',
      replace: true,
      template: '<div>こんにちは、ディレクティブ！</div>'
    }
  })

  .controller('MyController', ['$scope', function($scope) {
  }]);
