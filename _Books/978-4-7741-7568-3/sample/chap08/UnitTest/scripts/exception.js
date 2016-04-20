angular.module('myApp.mock.exception', [])
  .service('ThrowService', ['$timeout', '$log', function($timeout, $log) {
    this.throw = function(num) {
      $timeout(function() {
        $log.info('ThrowService' + num);
        if (num > 5) {
          throw new Error('ThrowService throws error !');
        }
      }, 3000);
    };
  }]);
