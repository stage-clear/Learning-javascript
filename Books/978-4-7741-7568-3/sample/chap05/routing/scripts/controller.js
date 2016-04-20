angular.module('myApp')
  .controller('MainController', ['$scope', function($scope) {
    $scope.msg = 'ようこそWINGSプロジェクトへ!';
  }])

/*
  .controller('MainController',
  ['$scope', '$location', function($scope, $location) {
    $scope.msg = 'ようこそWINGSプロジェクトへ!';
    $scope.onclick = function() {
      $location.path('/articles/13');
    };
  }])
*/

  .controller('ResolveController',
  ['$scope', 'CurrentPosition', function($scope, CurrentPosition) {
    $scope.pos = CurrentPosition;
  }])


  .controller('ArticlesController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.id = $routeParams.id;
  }])

// 第6章 ルーティング関連の$broadcastイベント
/*
  .controller('ArticlesController',[
    '$scope', '$routeParams', '$location', '$anchorScroll',
    function($scope, $routeParams, $location, $anchorScroll) {
      $scope.id = $routeParams.id;
      $scope.$on('$routeChangeSuccess', function(e, new_r, old_r) {
        $location.hash($routeParams.scroll);
        $anchorScroll();  
      });
  }])
*/

  .controller('SearchController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.keyword = $routeParams.keyword;
  }]);
