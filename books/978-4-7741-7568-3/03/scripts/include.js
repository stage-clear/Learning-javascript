

angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    // template 
    $scope.templates = [
      { title: 'executaion', url: 'templates/execution.html' },
      { title: 'tempo', url: 'templates/tempo.html' }
    ];
    
    // onload
    $scope.onload = function() {
      console.log($scope.template);
    };
  }]);