angular.module('myApp', [])
//angular.module('myApp', [ 'ngMessageFormat' ])
  .controller('MyController', ['$scope', function($scope) {
    $scope.favs = [ '山田理央', '鈴木洋平', '腰掛奈美', '田中哲市', '佐藤令' ];
  }]);

