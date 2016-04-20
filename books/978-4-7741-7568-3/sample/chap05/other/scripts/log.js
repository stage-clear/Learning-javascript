angular.module('myApp', [])
  .config(['$logProvider', function($logProvider) {
    $logProvider.debugEnabled(true);
  }])
  .controller('MyController', ['$scope', '$log',  function($scope, $log) {
    $log.debug('デバッグ');
    $log.error('エラー');
    $log.info('情報');
    $log.log('一般ログ');
    $log.warn('警告');
  }]);
