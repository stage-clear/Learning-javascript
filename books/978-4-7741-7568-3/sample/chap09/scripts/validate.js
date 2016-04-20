angular.module('myApp', [ 'ui.validate' ])
  .controller('MyController', ['$scope', function($scope) {
    $scope.ngword = function(input) {
      var result = true;
      var keywords = [ '暴力', '犯罪', 'スパム' ];
      if(angular.isString(input)) {
        angular.forEach(keywords, function(value, key) {
          if (input.indexOf(value) > -1) {
            result = false;
          }
        });
      }
      return result;
    };
  }]);