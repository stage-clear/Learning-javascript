angular.module('myApp', [])
  .directive('myBook', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        book: '=myInfo'
      },
      template: '<div>{{book.title}}（{{book.price | number}}円／{{book.publish}}）</div>'
    }
  })
  .controller('MyController', ['$scope', function($scope) {
    $scope.data = {
      title: 'JavaScript本格入門',
      price: 2980,
      publish: '技術評論社'
    };
  }]);
