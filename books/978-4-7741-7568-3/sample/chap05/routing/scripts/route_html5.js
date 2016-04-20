angular.module('myApp', [ 'ngRoute' ])
.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/articles/:id', {
        templateUrl: 'views/articles.html',
        controller: 'ArticlesController'
      })
      .when('/search/:keyword*', {
        templateUrl: 'views/search.html',
        controller: 'SearchController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
