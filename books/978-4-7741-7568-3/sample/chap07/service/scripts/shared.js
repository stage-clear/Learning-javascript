angular.module('myApp', [])
  .service('SharedService', function() {
    this.name = '権兵衛';
    this.getMessage = function() {
      return 'こんにちは、' + this.name + 'さん！';
    }
  })
  .controller('PrevController', ['$scope', 'SharedService',
    function($scope, SharedService) {
    $scope.name = SharedService.name;
    $scope.onclick = function() {
      SharedService.name = $scope.name;
    };
  }])
  .controller('NextController', ['$scope', 'SharedService',
    function($scope, SharedService) {
    $scope.shared = SharedService;
  }]);
