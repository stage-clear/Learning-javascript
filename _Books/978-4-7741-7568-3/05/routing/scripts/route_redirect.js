
/**
 * `/books/100` のようなパスを受け取って `/articles/10108` に
 * リダイレクトする例
 */

angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider

      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })


      .when('/books/:id', { // <- 
        redirectTo: function(routeParams, path, search) {
          return '/articles/' + (Number(routeParams.id) + 10000);
        }
      })
      

      .otherwise({
        redirectTo: '/'
      })
  })