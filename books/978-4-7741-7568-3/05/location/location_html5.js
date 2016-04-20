

angular.module('myApp', [])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true); // <-
  })
  .controller('MyController', ['$scope', '$location', 
    function($scope, $location) {
      $scope.onclick = function() {
        $location.url('/articles?id=100#hash');
        if ($location.path() === '/articles') {
          console.log('id: ' + $location.search().id);
        }
      };
  }]);