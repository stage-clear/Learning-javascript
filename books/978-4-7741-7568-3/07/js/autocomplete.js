angular.module('myApp', [])
  .directive('myAutocomplete', function() {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {
        source: '=',
        minlength: '@',
        select: '='
      },
      link: function(scope, element, attrs, ngModelController) {
        if (!ngModelController) return ;
        
        if (scope.minlength === undefined) {
          scope.minlength = 2;
        }
        
        element.autocomplete({
          source: scope.source,
          minLength: scope.minlength,
          select: function(e, ui) {
            if (scope.select) {
              scope.$apply(function() {
                scope.select(e, ui);
              })
            }
            
            scope.$apply(function() {
              ngModelController.$setViewValue(ui.item.value);
            })
          }
        })
      }
    }
  })
  .controller('MyController', ['$scope', function($scope) {
    $scope.data = ['accepts', 'action_name', 'add', 'add_column'];
    
    $scope.onselect = function(e, ui) {
      if (ui.item) {
        console.log(ui.item.value);
      }
    }
  }]);