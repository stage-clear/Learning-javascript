angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.path = 'http://www.web-deli.com/image/linkbanner_l.gif';

    $scope.onmouseenter = function($event) {
      console.log($event);
      $scope.path = 'http://www.web-deli.com/image/home_chara.gif';
    };

    $scope.onmouseleave = function() {
      $scope.path = 'http://www.web-deli.com/image/linkbanner_l.gif';
    };
  }]);
