angular.module('myApp', [])
  .controller('ParentController', ['$scope', function($scope) {
    $scope.$root.value = 1;

    $scope.onparent = function() {
      $scope.$root.value++;
    };

  }])
  .controller('ChildController', ['$scope', function($scope) {
    $scope.onchild = function() {
      $scope.$root.value++;
    };
  }]);


