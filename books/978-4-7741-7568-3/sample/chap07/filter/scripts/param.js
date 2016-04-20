angular.module('myApp', [])
  .filter('truncate', function (){
    return function(value, length, omission) {
      if (!angular.isString(value)) {
        return value;
      }
      if (!angular.isNumber(length)) {
        length = 50;
      };
      omission = omission || '...';
      if (value.length <= length) {
        return value;
      } else {
        return value.substring(0, length) + omission;
      }
    }
  });
