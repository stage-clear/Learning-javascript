angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.books = [
      {
        isbn: '978-4-7741-7078-7',
        title: 'サーブレット＆JSPポケットリファレンス',
        price: 2680,
        publish: '技術評論社',
        published: new Date(2015, 0, 8)
      },
      {
        isbn: '978-4-8222-9634-6',
        title: 'アプリを作ろう！Android入門',
        price: 2000,
        publish: '日経BP',
        published: new Date(2014, 11, 20)
      },
      {
        isbn: '978-4-7980-4179-7',
        title: 'ASP.NET MVC 5実践プログラミング',
        price: 3500,
        publish: '秀和システム',
        published: new Date(2014, 8, 20)
      },
      {
        isbn: '978-4-7981-3546-5',
        title: 'JavaScript逆引きレシピ',
        price: 3000,
        publish: '翔泳社',
        published: new Date(2014, 7, 28)
      },
      {
        isbn: '978-4-7741-6566-0',
        title: 'PHPライブラリ＆サンプル実践活用',
        price: 2480,
        publish: '技術評論社',
        published: new Date(2014, 5, 24)
      },
      {
        isbn: '978-4-8222-9836-4',
        title: '.NET開発テクノロジ入門',
        price: 3800,
        publish: '日経BP',
        published: new Date(2014, 5, 5)
      },
      {
        isbn: '978-4-7741-6410-6',
        title: 'Rails 4アプリケーションプログラミング',
        price: 3500,
        publish: '技術評論社',
        published: new Date(2014, 3, 11)
      },
      {
        isbn: '978-4-7741-6127-3',
        title: 'iPhone／iPad開発ポケットリファレンス',
        price: 2780,
        publish: '技術評論社',
        published: new Date(2013, 10, 23)
      }
    ];
  }]);
