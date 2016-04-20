angular.module('myApp', [ 'ngSanitize' ])
  .controller('MyController', ['$scope', function($scope) {
    $scope.memo = '<p onmouseover="alert(\'OK!\')">ようこそ</p>'
                  + '<a href="http://www.wings.msn.to">WINGSへ</a>'
                  + '<script>var x = 1;</script>'
                  + '<button>応募</button>';
  }]);
