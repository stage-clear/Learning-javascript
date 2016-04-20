angular.module('myApp', [])
  .controller('PrevController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
    $scope.onclick = function() {
      $rootScope.$broadcast('textChanged', $scope.name);
    };
  }])
  .controller('NextController', ['$scope', function($scope) {
    $scope.$on('textChanged', function(e, data) {
      $scope.result = 'こんにちは、' + data + 'さん！';
    });
  }]);