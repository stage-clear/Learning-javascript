angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.onclick = function() {
      $scope.myForm.myName.$rollbackViewValue();
      console.log($scope.myName);
    };
  }]);