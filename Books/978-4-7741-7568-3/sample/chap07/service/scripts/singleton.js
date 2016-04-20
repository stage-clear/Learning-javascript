/*
angular.module('myApp', [])
  .service('SharedService', function() {
    this.name = '権兵衛';
    this.getMessage = function() {
      return 'こんにちは、' + this.name + 'さん！';
    }
  })
  .controller('PrevController', ['$scope', 'SharedService',
    function($scope, SharedService) {
    var svc = SharedService;
    $scope.shared = svc;
    $scope.name = svc.name;
    $scope.onclick = function() {
      svc.name = $scope.name;
    };
  }])
  .controller('NextController', ['$scope', 'SharedService',
    function($scope, SharedService) {
    var svc = SharedService;
    $scope.shared = svc;
    $scope.name = svc.name;
    $scope.onclick = function() {
      svc.name = $scope.name;
    };
  }]);
*/

angular.module('myApp', [])
  .service('SharedService', function() {
    var MyService = function() {
      this.name = '権兵衛';
      this.getMessage = function() {
        return 'こんにちは、' + this.name + 'さん！';
      };
    };
    return function() {
      return new MyService();
    };
  })
  .controller('PrevController', ['$scope', 'SharedService',
    function($scope, SharedService) {
    var svc = SharedService();
    $scope.shared = svc;
    $scope.name = svc.name;
    $scope.onclick = function() {
      svc.name = $scope.name;
    };
  }])
  .controller('NextController', ['$scope', 'SharedService',
    function($scope, SharedService) {
    var svc = SharedService();
    $scope.shared = svc;
    $scope.name = svc.name;
    $scope.onclick = function() {
      svc.name = $scope.name;
    };
  }]);
