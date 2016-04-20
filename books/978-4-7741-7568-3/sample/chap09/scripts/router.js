angular.module('myApp', [ 'ui.router' ])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        controller: 'MainController',
        templateUrl: 'templates/main.html'
      })
      .state('articles', {
        url: '/articles/{id:int}',
        controller: 'ArticlesController',
        templateUrl: 'templates/articles.html'
      })
      .state('search', {
        url: '/search/*keyword',
        controller: 'SearchController',
        templateUrl: 'templates/search.html'
      });
    $urlRouterProvider.otherwise('/');
  }])

  .controller('MainController', ['$scope', function($scope) {
    $scope.msg = 'ようこそWINGSプロジェクトへ!';
  }])
  .controller('ArticlesController', ['$scope', '$stateParams',
    function($scope, $stateParams) {
    $scope.id = $stateParams.id;
  }])
  .controller('SearchController', ['$scope', '$stateParams',
    function($scope, $stateParams) {
    $scope.keyword = decodeURIComponent($stateParams.keyword);
  }]);
