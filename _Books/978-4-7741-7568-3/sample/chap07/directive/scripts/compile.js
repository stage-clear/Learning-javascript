angular.module('myApp', [])
  .directive('button', function() {
    return {
      restrict: 'E',
      compile: function(element, attrs) {
        element.addClass('btn');
        if (attrs.type) {
          var data = { submit:'primary', reset:'warning', button:'default' };
          element.addClass('btn-' + data[attrs.type]);
        }
        if (attrs.block === 'block') {
          element.addClass('btn-block');
        }
      }
    };
  })

  .controller('MyController', ['$scope', function($scope) {
  }]);