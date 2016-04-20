angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.onemit = function() {
      $scope.$emit('notify', 'Emit');
    };

    $scope.onbroad = function() {
      $scope.$broadcast('notify', 'Broadcast', new Date());
    };
  }])
  .controller('ParentController', ['$scope', function($scope) {
    $scope.$on('notify', function(e, data) {
      $scope.parentResult = e.name + '/' + e.targetScope.message
        + '/' + data;
    });
  }])
  .controller('Child1Controller', ['$scope', function($scope) {
    $scope.$on('notify', function(e, data, current) {
      $scope.child1Result = e.name + '/' + e.targetScope.message
        + '/' + data + '/' + current.toLocaleString();
    });
  }])
  .controller('Child2Controller', ['$scope', function($scope) {
    $scope.$on('notify', function(e, data, current) {
      $scope.child2Result = e.name + '/' + e.targetScope.message
        + '/' + data + '/' + current.toLocaleString();
    });
  }]);