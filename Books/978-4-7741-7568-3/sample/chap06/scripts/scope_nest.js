angular.module('myApp', [])
  .controller('ParentController',
    ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.value = 1;

    $scope.onparent = function() {
      $rootScope.value++;
    };

  }])
  .controller('ChildController',
    ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.onchild = function() {
      $rootScope.value++;
    };
  }]);

