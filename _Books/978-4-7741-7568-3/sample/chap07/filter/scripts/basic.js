angular.module('myApp', [ 'ngSanitize' ])
  .filter('nl2br', function (){
    return function(value) {
      if (!angular.isString(value)) { 
        return value;
      }
      return value.replace(/\r?\n/g, '<br />');
    }
  });
