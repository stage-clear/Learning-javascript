angular.module('myApp', [ 'ui.router' ])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        views: {
          upper: {
            controller: 'MainUpperController',
            templateUrl: 'templates/main_upper.html'
          },
          lower: {
            controller: 'MainLowerController',
            templateUrl: 'templates/main_lower.html'
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  }])

  .controller('MainUpperController', ['$scope', function($scope) {
    $scope.msg = 'ようこそWINGS PROJECTへ!';
  }])
  .controller('MainLowerController', ['$scope', function($scope) {
    $scope.msg = 'ようこそwings projectへ!';
  }]);