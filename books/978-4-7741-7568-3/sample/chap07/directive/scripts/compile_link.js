angular.module('myApp', [])
  .directive('compileLink', function() {
    return {
      restrict: 'E',
      //terminal: true,
      compile: function(element, attrs) {
        console.log('compile: ' + attrs.type);
        return {
          pre: function(scope, element, attrs, controller) {
            console.log('prelink: ' + attrs.type);
          },
          post: function(scope, element, attrs, controller) {
            console.log('postlink: ' + attrs.type);
          }
        };
      },
    };
  })
  .controller('MyController', ['$scope', function($scope) {
    $scope.data = ['い', 'ろ', 'は', 'に', 'ほ'];
  }]);