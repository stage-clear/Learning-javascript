angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.greeting = 'こんにちは、権兵衛さん！';

    $scope.onclick = function() {
      $scope.greeting = 'こんにちは、' + $scope.myName + 'さん！';
    };
  }]);
