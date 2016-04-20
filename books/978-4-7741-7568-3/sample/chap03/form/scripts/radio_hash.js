angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.scalarValue = 'スカラー値';
    $scope.arrayValue = [ 'あいうえお', 'かきくけこ', 'さしすせそ' ];
    $scope.hashValue = { name: '山田理央', sex: '男', age: 8 };
  }]);
