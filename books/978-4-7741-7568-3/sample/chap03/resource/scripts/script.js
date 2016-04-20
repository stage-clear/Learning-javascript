angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.templates = [
      { title: 'execution', url: 'templates/execution.html' },
      { title: 'tempo', url: 'templates/tempo.html' }
    ];

    $scope.onload = function() {
      console.log($scope.template);
    };
  }]);
