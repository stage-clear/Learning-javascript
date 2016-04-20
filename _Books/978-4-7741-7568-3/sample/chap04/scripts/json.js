angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.obj = {
      name: 'トクジロウ',
      birth: new Date(2007, 7, 15),
      age: 3,
      family: ['リンリン', 'サチ', 'ニンザブロウ'],
      work: function() { /* メソッドの中身 */ },
      other: {
        favorite: 'ひまわり',
        memo: '偏屈爺さん'
      }
    };
  }]);
