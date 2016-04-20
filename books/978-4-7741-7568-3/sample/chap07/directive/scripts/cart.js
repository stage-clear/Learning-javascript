angular.module('myApp', [])
  .directive('myCart', function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: { },
      template: '<div>' + 
                '  <ul ng-transclude></ul>' +
                '  <hr />' +
                '  合計：{{sum | number}}円' +
                //'  合計：{{ctrl.sum | number}}円' +
                '</div>',
      controller: ['$scope', function($scope) {
        $scope.sum = 0;

        this.addItem = function(item) {
          $scope.sum += Number(item.price);
        };
      }]
/*
      controllerAs: 'ctrl',
      controller: function() {
        this.sum = 0;

        this.addItem = function(item) {
          this.sum += Number(item.price);
        };
      }
*/
    };
  })
  .directive('myCartItem', function() {
    return {
      require: '^^myCart',
      restrict: 'E',
      replace: true,
      template: '<li>{{title}}（{{price | number}}円）</li>',
      scope: {
        title: '@',
        price: '@'
      },
      link: function(scope, element, attrs, cartController) {
        cartController.addItem(scope);
      },
    }
  })



  .controller('MyController', ['$scope', function($scope) {
  }]);
