angular.module('myApp', [])
  .filter('grep', function (){
    return function(values, callback) {
      if (!angular.isArray(values)) {
        return values;
      }
      var result = [];
      angular.forEach(values, function(value) {
        if (callback(value)) {
          result.push(value);
        }
      });
      return result;
    }
  })
  .controller('MyController', ['$scope', function($scope) {
    $scope.data = [ 'あいうえお', 'かきくけ', 'さしす', 'たちつてと', 'な' ];

    $scope.myFilter = function(value) {
      return String(value).length < 5;
    };
  }]);