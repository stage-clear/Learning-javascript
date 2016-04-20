angular.module('myApp', [])
  .directive('myUnique', ['$http', '$q', function($http, $q) {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {},
      link: function(scope, elm, attr, ctrl) {
        if (!ctrl) return;

        ctrl.$asyncValidators.unique = function(modelValue, viewValue) {
          var value = modelValue || viewValue;
          return $http.get(attr.myUnique + value).
            then(
              function() {
                return $q.reject('value exists!');
              }, function() {
                return true;
              });
        };

        attr.$observe('myUnique', function(value) {
          ctrl.$validate();
        });
      }
    }
  }])

  .controller('MyController', ['$scope', function($scope) {
  }]);
