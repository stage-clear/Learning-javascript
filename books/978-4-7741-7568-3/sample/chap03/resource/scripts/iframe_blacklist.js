angular.module('myApp', [])
  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://www.wings.msn.to/**'
    ])
    $sceDelegateProvider.resourceUrlBlacklist([
      'http://www.wings.msn.to/index.php/-/A-07/**'
    ]);
  }])
  .controller('MyController', ['$scope', function($scope) {
    $scope.url = 'http://www.wings.msn.to/index.php/-/A-07/978-4-7741-7078-7/';
    // $scope.url = 'http://www.wings.msn.to/';
  }]);