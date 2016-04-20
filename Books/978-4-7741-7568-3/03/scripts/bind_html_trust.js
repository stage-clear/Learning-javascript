
angular.module('myApp', ['ngSanitize'])
  .controller('MyController', ['$scope', '$sce', function($scope, $sce) {
    var memo = '<p onmouseover="alert(\'OK\')">Welcome</p>' + 
      '<a href="http://www.wings.msn.to">WINGS</a>' + 
      '<script> var x = 1; </script>' + 
      '<button>submit</button>';

    $scope.memo = $sce.trustAsHtml(memo);
  }]);