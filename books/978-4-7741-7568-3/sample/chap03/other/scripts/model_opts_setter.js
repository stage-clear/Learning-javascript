angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.my = {
      _name: '権兵衛',
      name: function(name) {
        if (angular.isUndefined(name)) {
          return this._name;
        } else {
          this._name = name;
        }
      }
    };
  }]);
