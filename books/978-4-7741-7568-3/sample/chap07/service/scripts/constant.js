angular.module('myApp', [])
/*
  .config(['AppTitle', 'AppInfo', 'CommonProc',
    function(AppTitle, AppInfo, CommonProc) {
    console.log(AppTitle);
    console.log(AppInfo);
    CommonProc(AppInfo.author);
  }])
*/
  .constant('AppTitle', 'AngularJSプログラミング')
  .constant('AppInfo', {
    author: '山田理央',
    updated: new Date(2007, 5, 25)
  })
  .constant('CommonProc', function(constant) {
    console.log(constant);
  })

  .controller('MyController', ['$scope', 'AppTitle', 'AppInfo', 'CommonProc',
    function($scope, AppTitle, AppInfo, CommonProc) {
    $scope.title = AppTitle;
    $scope.info = AppInfo;
    $scope.proc = CommonProc;
  }]);
