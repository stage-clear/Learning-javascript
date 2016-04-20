angular.module('myApp', [])
  .filter('percent', ['$filter', function ($filter){
    return function(value, fraction) {
      if (!angular.isNumber(value)) {
        return value;
      }
      if (!angular.isNumber(fraction)) {
        fraction = 0;
      }
      return $filter('number')(value * 100, fraction) + '%';
    }
  }]);