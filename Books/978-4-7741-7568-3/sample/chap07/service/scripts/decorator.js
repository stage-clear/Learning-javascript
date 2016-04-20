angular.module('myApp', [])
  .config(['$provide', function($provide) {
    $provide.decorator('$log', ['$delegate', '$window',
      function($delegate, $window) {
      $delegate.error = function(message) {
        $window.alert(message);
      };
      return $delegate;
    }]);
  }])
  .controller('MyController', ['$scope', '$log', function($scope, $log) {
    $log.error('エラー');
    $log.warn('警告');
  }]);
