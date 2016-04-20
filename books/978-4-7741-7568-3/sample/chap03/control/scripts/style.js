angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.author = {
      name: 'YAMADA, Yoshihiro',
      gender: 'male',
      birth: new Date()
    };
  }]);
