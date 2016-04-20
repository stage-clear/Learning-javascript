angular.module('myApp.mock.interval', [])
  .service('LoopService', ['$interval', function($interval) {
    this.current = 0;
    this.messages = [ 'AngularJSの基本', 'コントローラー', 'サービス',
      'モジュール', 'DIコンテナー' ];
    this.message = this.messages[0];

    var _this = this;
    $interval(function() {
      _this.current++;
      _this.message = _this.messages[_this.current % 5];
    }, 5000);
  }]);
