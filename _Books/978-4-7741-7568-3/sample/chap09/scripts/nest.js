angular.module('myApp', [ 'ui.router' ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('contents', {
        url: '/contents/{id:int}',
        controller: ['$scope', '$stateParams', function($scope, $stateParams) {
          $scope.id = $stateParams.id;
        }],
        template: '<div>記事コード：{{id}}</div>'
                + '［<a ui-sref=".pages({page: 1})">1</a>］'
                + '［<a ui-sref=".pages({page: 2})">2</a>］'
                + '<div ui-view></div>'
      })
      .state('contents.pages', {
        url: '/pages/{page:int}',
        controller: ['$scope', '$stateParams', function($scope, $stateParams) {
          $scope.page = $stateParams.page;
        }],
        template: '<div>ページ番号：{{page}}</div>'
      })

/*
      .state('contents.pages', {
        url: '/pages/{page:int}',
        views: {
          '@contents': {
            controller: ['$scope', '$stateParams', function($scope, $stateParams) {
              $scope.page = $stateParams.page;
            }],
            template: '<div>ページ番号：{{page}}</div>'
          }
        }
      });
*/
    $urlRouterProvider.otherwise('/');
  }])

  .controller('ContentsController', ['$scope', '$stateParams', function($scope, $stateParams) {
    $scope.id = $stateParams.id;
  }]);
