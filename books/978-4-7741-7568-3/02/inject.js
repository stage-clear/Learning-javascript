// controller
var My = function($scope, BookList) {
  $scope.books = BookList();
};


// dependencies
My.$inject = ['$scope', 'BookList'];


// add controller to module
angular.module('MyApp', [])
  .controller('MyController', My)
  .value('BookList', function() {
    return [
      {
        title: 'Book 1'
      },
      {
        title: 'Book 2'
      }
    ];
  });