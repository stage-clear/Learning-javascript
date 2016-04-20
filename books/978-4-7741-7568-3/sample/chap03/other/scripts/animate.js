angular.module('myApp', [ 'ngAnimate' ])
  .controller('MyController', ['$scope', function($scope) {
    $scope.data = [ 'い', 'ろ', 'は', 'に', 'ほ', 'へ', 'と' ];
    var count = 0;

    $scope.oninsert = function() {
      $scope.data.push('Add' + count);
      count++;
    };

    $scope.onremove = function() {
      $scope.data.shift();
    };
  }]);