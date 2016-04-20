angular.module('myApp', [])
  .provider('MyLog', function() {
    this.defaults = { logLevel : 4 };
    this.$get = ['$log', function($log) {
      var level = this.defaults.logLevel;
      return {
        error : function(message) {
          if (level > 0) { $log.error(message); }
        },
        warn : function(message) {
          if (level > 1) { $log.warn(message); }
        },
        info : function(message) {
          if (level > 2) { $log.info(message); }
        },
        debug : function(message) {
          if (level > 3) { $log.debug(message); }
        }
      };
    }];
  })
  .config(['MyLogProvider', function(MyLogProvider) {
    MyLogProvider.defaults.logLevel = 3;
  }])
  .controller('MyController', ['$scope', 'MyLog', function($scope, MyLog) {
    MyLog.error('エラー');
    MyLog.warn('警告');
    MyLog.info('情報');
    MyLog.debug('デバッグ');
  }]);
