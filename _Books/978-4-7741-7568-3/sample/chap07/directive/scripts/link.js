angular.module('myApp', [])
  .directive('myImageBtn', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        preSrc: '@',
        postSrc: '@'
      },
      template: '<img src="{{src}}" ng-mouseenter="onenter()" ng-mouseleave="onleave()" />',
      link: function(scope, element, attrs, controller) {
        scope.src = scope.preSrc;

        scope.onenter = function() {
           scope.src = scope.postSrc;
        };
        scope.onleave = function() {
           scope.src = scope.preSrc;
        };

      }
    }
  })
  .controller('MyController', ['$scope', function($scope) {
  }]);
