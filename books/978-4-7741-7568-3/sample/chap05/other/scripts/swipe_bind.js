angular.module('myApp', [ 'ngTouch'])
  .controller('MyController', ['$scope', '$swipe',  function($scope, $swipe) {
    $swipe.bind(angular.element(document.getElementById('main')), {
      start: function(coords, ev) {
        console.log('start（' + ev.type + '）');
        console.log('[' + coords.x + ', ' + coords.y + ']');
      },
      move: function(coords, ev) {
        console.log('move（' + ev.type + '）');
        console.log('[' + coords.x + ', ' + coords.y + ']');
      },
      end: function(coords, ev) {
        console.log('end（' + ev.type + '）');
        console.log('[' + coords.x + ', ' + coords.y + ']');
      },
      cancel: function(ev) {
        console.log('cancel（' + ev.type + '）');
      }
    });
  }]);
