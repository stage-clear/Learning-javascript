angular.module('myApp', [])
  .controller('MyController', ['$scope', '$sce', function($scope, $sce) {
    var memo = '<p onmouseover="alert(\'OK!\')">ようこそ</p>'
                  + '<a href="http://www.wings.msn.to">WINGSへ</a>'
                  + '<script>var x = 1;</script>'
                  + '<button>応募</button>';
    $scope.memo = $sce.trustAsHtml(memo);
    //$scope.memo  = $sce.trustAs($sce.HTML, memo);

  }]);
