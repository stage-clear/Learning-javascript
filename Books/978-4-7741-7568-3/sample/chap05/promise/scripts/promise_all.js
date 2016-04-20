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

    $q.all([
      asyncProcess('トクジロウ'),
      asyncProcess('ニンザブロウ'),
      asyncProcess('リンリン')
    ])
    .then(
      function(o_resolve) {
        console.log(o_resolve);
      },
      function(o_reject) {
        console.log(o_reject);
      }
    );
  }]);