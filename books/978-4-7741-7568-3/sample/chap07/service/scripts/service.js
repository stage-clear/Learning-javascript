angular.module('myApp', [])
  .service('FigureService', ['$log', function($log) {
    this.triangle = function(base, height) {
      $log.info('［triangle］底辺：' + base);
      $log.info('［triangle］高さ：' + height);
      return base * height / 2;
    };
    this.circle = function(radius) {
      $log.info('［circle］半径：' + radius);
      return radius * radius * Math.PI;
    };
    this.trapezoid = function(upper, lower, height) {
      $log.info('［trapezoid］上辺：' + upper);
      $log.info('［trapezoid］下辺：' + lower);
      $log.info('［trapezoid］高さ：' + height);
      return (upper + lower) * height / 2;
    };
  }])
  .controller('MyController', ['$scope', 'FigureService',
    function($scope, FigureService) {
    $scope.triangle = FigureService.triangle(4, 3);
    $scope.circle = FigureService.circle(5);
    $scope.trapezoid = FigureService.trapezoid(5, 10, 3);
  }]);
