angular.module('myApp', [])
/*
  .config(function($locationProvider){
     $locationProvider.hashPrefix('!');
  })
*/

  .controller('MyController',
    ['$scope', '$location', function($scope, $location) {
    $scope.onclick = function() {
      $location.url('articles?id=108#wings');
    };

/*
    if ($location.path() === '/articles') {
      console.log('id値：' + $location.search().id);
    }
*/
  }]);

