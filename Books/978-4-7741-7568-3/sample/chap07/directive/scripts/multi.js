angular.module('myApp', [])
  .directive('myRandomDecorate', function() {
    return {
      restrict: 'A',
      multiElement: true,
      scope: {
        color: '@',
        bgcolor: '@',
      },
      compile: function(elements, attrs) {
        var selectColor = function(colors) {
          var list = colors.split(',');
          return list[Math.floor(Math.random() * list.length)]
        };
        return function(scope, elements, attrs) {
          angular.forEach(elements, function(elm) {
            if (elm.nodeType !== Node.ELEMENT_NODE) { return; }
            var e = angular.element(elm);
            if (attrs.color) {
              e.css('color', selectColor(attrs.color));
            }
            if (attrs.bgcolor) {
              e.css('background-color', selectColor(attrs.bgcolor));
            }
          });
        }
      }
    };
  })

  .controller('MyController', ['$scope', function($scope) {
  }]);
