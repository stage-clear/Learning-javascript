angular.module('myApp', [ 'ngRoute' ])
  .config(function ($routeProvider) {
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
  });
