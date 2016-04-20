
angular.module('myApp', ['ngSanitize'])
  .controller('MyController', ['$scope', function($scope) {
    $scope.memo = '<p onmouseover="alert(\'OK\')">Welcome</p>' + 
      '<a href="http://www.wings.msn.to">WINGS</a>' + 
      '<script> var x = 1; </script>' + 
      '<button>submit</button>';
  }]);