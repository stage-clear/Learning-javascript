angular.module('myApp', [ 'ngRoute' ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/books/:id', {
        redirectTo: function(routeParams, path, search) {
          return '/articles/' + (Number(routeParams.id) + 10000) ;
        }
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
