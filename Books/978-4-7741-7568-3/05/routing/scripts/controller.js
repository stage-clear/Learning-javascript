


angular.module('myApp')
  .controller('MainController', ['$scope', function($scope) {
    $scope.msg = 'Welcome ';
  }])
  .controller('ArticlesController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.id = $routeParams.id;
  }])
  .controller('SearchController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.keyword = $routeParams.keyword;
  }])
  
  
  /*
   * Resolve 対応
   */
  .controller('ResolveController', ['$scope', 'CurrentPosition', function($scope, CurrentPosition) {
    $scope.pos = CurrentPosition;
  }]);
