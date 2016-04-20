

angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.onclick1 = function() {
      console.log('clicked outer');
    };
    
    $scope.onclick2 = function($event) {
      $event.stopPropagation();
      console.log('clicked inner');
    };
  }]);