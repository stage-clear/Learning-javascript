angular.module('myApp', [])
  .directive('myHelloName', function() {
    return {
      restrict: 'E',
      transclude: true,
       template: '<div>こんにちは、<span ng-transclude></span>さん！</div>'
    }
  })

  .controller('MyController', ['$scope', function($scope) {
  }]);
