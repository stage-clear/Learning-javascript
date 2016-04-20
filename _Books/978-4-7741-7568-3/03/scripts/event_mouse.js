
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    // initial image
    $scope.path = 'http://www.web-deli.com/image/linkbanner_l.gif';
    
    // on mouse enter
    $scope.onmouseenter = function($event) {
      console.info($event);
      $scope.path = 'http://www.web-deli.com/image/home_chara.gif';
    };
    
    // on mouse leave
    $scope.onmouseleave = function() {
      $scope.path = 'http://www.web-deli.com/image/linkbanner_l.gif';
    };
  }]);