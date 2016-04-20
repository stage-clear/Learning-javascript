

angular.module('myApp', ['ngMessageFormat'])
  .controller('MyController', ['$scope', function($scope) {
    $scope.favs = ['Yamada', 'Koshikake', 'Tanaka', 'Sato', 'Suzuki'];
  }]);