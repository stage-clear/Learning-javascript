angular.module('myApp', [ 'ngTouch'])
  .controller('MyController', ['$scope', function($scope) {
    var current = 0;
    var data = [
      'こんにちは、AngularJS！', 
      'ご機嫌いかが、AngularJS！', 
      'また会いましたね、AngularJS！'
    ];
    $scope.contents = data[current];

    $scope.onleft = function() {
      current++;
      if (current > data.length - 1) { current = 0; }
      $scope.contents = data[current];
    };

    $scope.onright = function() {
      current--;
      if (current < 0) { current = data.length - 1; }
      $scope.contents = data[current];
    };
  }]);