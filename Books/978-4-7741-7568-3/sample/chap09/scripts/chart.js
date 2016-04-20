angular.module('myApp', [ 'googlechart' ])
  .controller('MyController', ['$scope', function ($scope) {

    $scope.data = {
      'type': 'BarChart',
      'data': {
        'cols': [
          {
            'id': 'month',
            'label': '月',
            'type': 'string',
          },
          {
            'id': '978-4-7741-7078-7',
            'label': 'サーブレット＆JSPポケットリファレンス',
            'type': 'number',
          },
          {
            'id': '978-4-7741-6566-0',
            'label': 'PHPライブラリ＆サンプル実践活用',
            'type': 'number',
          },
          {
            'id': '978-4-7741-6410-6',
            'label': 'Rails 4アプリケーションプログラミング',
            'type': 'number'
          },
          {
            'id': '978-4-7741-6127-3',
            'label': 'iPhone／iPad開発ポケットリファレンス',
            'type': 'number'
          }
        ],
        'rows': [
          {
            'c': [
              {
                'v': 4,
                'f': '4月'
              },
              {
                'v': 20,
                'f': '200冊'
              },
              {
                'v': 10,
                'f': '100冊'
              },
              {
                'v': 7,
                'f': '70冊'
              },
              {
                'v': 4,
                'f': '40冊'
              }
            ]
          },
          {
            'c': [
              {
                'v': 5,
                'f': '5月'
              },
              {
                'v': 10,
                'f': '100冊'
              },
              {
                'v': 7,
                'f': '70冊'
              },
              {
                'v': 8,
                'f': '80冊'
              },
              {
                'v': 6,
                'f': '60冊'
              }
            ]
          },
          {
            'c': [
              {
                'v': 6,
                'f': '6月'
              },
              {
                'v': 5,
                'f': '50冊'
              },
              {
                'v': 5,
                'f': '50冊'
              },
              {
                'v': 3,
                'f': '30冊'
              },
              {
                'v': 1,
                'f': '10冊'
              }
            ]
          }
        ],

      },
      'options': {
        'title': '書籍別2015年春季売上',
        'isStacked': 'true',
        'vAxis': {
          'title': '売上月',
          'gridlines': {
            'count': 10
          }
        },
        'hAxis': {
          'title': '売上数（10冊単位）'
        }
      }
    }
  }]);