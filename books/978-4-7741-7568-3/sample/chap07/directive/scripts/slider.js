angular.module('myApp', [])
  .directive('mySlider', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      require: '?ngModel',
      scope: {
        min: '@',
        max: '@',
        step: '@',
        value: '@',
        create: '=',
        change: '='
      },
      replace: true,
      template: '<div>'
              + '  <input type="text" size="3" readonly />'
              + '  <div class="mySlider"></div>'
              + '</div>',
      link: function(scope, element, attrs, ngModelController) {
        if (scope.min === undefined) { scope.min = 0; }
        if (scope.max === undefined) { scope.max = 100; }
        if (scope.step === undefined) { scope.step = 1; }
        if (scope.value === undefined) { scope.value = 0; }

        var input = element.find('input');
        var s = input.next();

        var updateModel = function(num) {
            ngModelController.$setViewValue(num);
        };

        ngModelController.$render = function(){
          s.slider('value', Number(ngModelController.$viewValue));
        };

        scope.$watch(function() { return ngModelController.$viewValue; },
          function(newValue, oldValue, scope) {
            input.val(newValue);
        });

        s.slider({
          min: Number(scope.min),
          max: Number(scope.max),
          step: Number(scope.step),
          value: Number(scope.value),
          create: function(e, ui) {
            ui.value = s.slider('option', 'value');
            if (scope.create) {
              scope.create(e, ui);
            }
            updateModel(ui.value);
          },
          change: function(e, ui) {
            if (scope.change) {
              scope.change(e, ui);
            }
            $timeout(function() {
              updateModel(ui.value);
            });
          }
        });
      }
    };
  }])

  .controller('MyController', ['$scope', function($scope) {
  }]);
