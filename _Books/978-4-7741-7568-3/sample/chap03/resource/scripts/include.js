angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {

// 第6章 インクルード時に発生する$emitイベント
/*
    $scope.$on('$includeContentRequested', function(e, path) {
      console.log(e);
      console.log(path);
    });
*/

    $scope.templates = [
      { title: 'execution', url: 'templates/execution.html' },
      { title: 'tempo', url: 'templates/tempo.html' }
    ];

    $scope.onload = function() {
      console.log($scope.template);
    };
  }]);
