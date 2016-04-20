angular.module('myApp', [])
  .config(function($locationProvider){
     $locationProvider.html5Mode(true);
  })
  .controller('MyController',
    ['$scope', '$location', function($scope, $location) {
    $scope.onclick = function() {
      $location.url('articles?id=108#wings');
    };
  }]);

