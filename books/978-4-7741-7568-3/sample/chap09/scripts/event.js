angular.module('myApp', [ 'ui.event' ])
  .controller('MyController', ['$scope', function($scope) {
    $scope.oncontext = function($event) {
      $event.preventDefault();
    };
  }]);