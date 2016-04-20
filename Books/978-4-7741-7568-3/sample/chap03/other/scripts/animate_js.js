angular.module('myApp', [ 'ngAnimate' ])
  .animation('.box', function() {
    return {
      enter : function(element, done) {
        element.css('opacity', 0);
        element.css('background-color', '#000');
        $(element).animate({
          opacity: 1,
          backgroundColor: '#ff0'
        }, 2000, 
        function() {
          element.css('background-color', '#fff');
          done();
        });
        return function(cancelled) {
          if(cancelled) {
            $(element).stop();
          }
        }
      },
      leave : function(element, done) {
        $(element).fadeOut(2000, done);
        return function(cancelled) {
          if(cancelled) {
            $(element).stop();
          }
        };
      }
    }
  })
  .controller('MyController', ['$scope', function($scope) {
    $scope.data = [ 'い', 'ろ', 'は', 'に', 'ほ', 'へ', 'と' ];
    var count = 0;

    $scope.oninsert = function() {
      $scope.data.push('Add' + count);
      count++;
    };

    $scope.onremove = function() {
      $scope.data.shift();
    };
  }]);
