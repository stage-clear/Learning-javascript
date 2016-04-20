angular.module('myApp', [])
  .controller('MyController', ['$scope', '$timeout', '$log', '$q', function($scope, $timeout, $log, $q) {
    var asyncProcess = function(value) {
      var deferred = $q.defer();
      $timeout(
        function() {
          deferred.notify('asyncProcess');
          if (value === undefined || value === '') {
            deferred.reject('入力値が空です');
          } else {
            deferred.resolve('入力値は' + value);
          }
        }, 1000);
      return deferred.promise;
    };

    asyncProcess('トクジロウ')
    // asyncProcess()
      .then(
        function(o_resolve) {
          $log.info(o_resolve);
          //return '**' + o_resolve + '**';
        }, 
        function(o_reject) {
          $log.info(o_reject);
          // return $q.reject('**' + o_reject + '**');
        },
        function(o_notify) {
          $log.info(o_notify);
        }
      );
      /*
      .then(
        function(o_resolve) {
          $log.info(o_resolve);
        },
        function(o_reject) {
          $log.info(o_reject);
        }
      );
      */
  }]);