angular.module('myApp', [])
  .directive('myTabPanel', function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        active: '@'
      },
      template: 
       '<div class="container">' + 
       '  <ul>' + 
       '    <li ng-repeat="tab in tabs" ng-class="{selected:tab.selected}">' + 
       '      <a href="#" ng-click="onselect(tab)">{{tab.title}}</a>' + 
       '    </li>' + 
       '  </ul>' + 
       '  <div class="panel" ng-transclude></div>' + 
       '</div>',
      controller: ['$scope', function($scope) {
        $scope.tabs = [];

        this.addTab = function(tab) {
          $scope.tabs.push(tab);
          if ($scope.tabs.length - 1 === Number($scope.active)) {
            $scope.onselect(tab);
          }
        };

        $scope.onselect = function(tab) {
          angular.forEach($scope.tabs, function(t) {
            t.show = false;
            t.selected = false;
          });
          tab.show = true;
          tab.selected = true;
        };
      }]
    };
  })
  .directive('myTab', function() {
    return {
      require: '^^myTabPanel',
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<div ng-show="show" ng-transclude></div>',
      scope: {
        title: '@'
      },
      link: function(scope, element, attrs, panelController) {
        panelController.addTab(scope);
      }
    }
  })

  .controller('myController', ['$scope', function($scope) {
  }]);
