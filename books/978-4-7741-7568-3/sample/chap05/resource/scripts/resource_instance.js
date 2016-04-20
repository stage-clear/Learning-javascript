angular.module('myApp', [ 'ngResource' ])
  .controller('MyController',
   ['$scope', '$resource', function($scope, $resource) {

    var Book = $resource(
      'resource.php/:isbn',
      { isbn: '@isbn' },
      { update: { method: 'PUT' } }
    );
    $scope.books = Book.query();

/*    var b = Book.get({ isbn: '978-4-7741-7078-7' }, function() {
      b.title = 'サーバサイドJavaポケットリファレンス';
      b.$update(function() {
        $scope.books = Book.query();
      });
    });
*/

    Book.get({ isbn: '978-4-7741-7078-7' }, function(b) {
      b.title = 'サーバサイドJavaポケットリファレンス';
      b.$update(function() {
        $scope.books = Book.query();
      });
    });

    var b = new Book({ isbn: '978-4-7741-XXXX-X' });
    b.title = 'AngularJSポケットリファレンス';
    b.price = 3000;
    b.publish = '技術評論社';
    b.published = '2015-10-10';
    b.$save(function() {
      $scope.books = Book.query();
    });

    $scope.oninsert = function() {
      Book.save(
        $scope.book,
        function() {
          $scope.books = Book.query();
        });
    };

    $scope.onedit = function(isbn) {
      $scope.book = Book.get({ isbn: isbn });
    };

    $scope.onupdate = function() {
      Book.update(
        $scope.book,
        function() {
          $scope.books = Book.query();
        });
    };

    $scope.ondelete = function(isbn) {
      Book.delete(
        { isbn: isbn },
        function() {
          $scope.books = Book.query();
        });
    };
  }]);