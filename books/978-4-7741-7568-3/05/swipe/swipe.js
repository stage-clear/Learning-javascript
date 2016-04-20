

angular.module('myApp', ['ngTouch'])
  .controller('MyController', ['$scope', function($scope) {
    // 現在のコンテンツ位置を示す値
    var current = 0;
    // ページに表示すべきコンテンツ
    var data = [
      'Hello, AngularJS!',
      'Whats up AngularJS!',
      'Nice to see you AngularJS'
    ];
    
    // ページに初期表示をセット
    $scope.contents = data[current];
    
    // 左スワイプで次のコンテンツに移動
    $scope.onleft = function() {
      current++;
      // 配列末尾の場合、先頭位置に移動
      if (current > data.length - 1) {
        current = 0;
      }
      $scope.contents = data[current];
    };
    
    $scope.onright = function() {
      current--;
      
      // 配列先頭の場合、末尾位置に移動
      if (current < 0) {
        current = data.length - 1;
      }
      $scope.contents = data[current];
    }
  }]);