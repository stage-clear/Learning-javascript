angular.module('myApp', [])
  .factory('$exceptionHandler'
  , ['$window', '$log', function ($window, $log) {
    return function (exception, cause) {
      $window.alert('ページで不明なエラーが発生しました。\r'
        + '時間をおいてから、再度アクセスしてください。');
      $log.error(exception);
      // $log.error(exception.message);
    };
  }])
  .controller('MyController', ['$scope', function($scope){
    throw new Error('エラーが発生しました！');
  }]);