angular.module('myApp', [])
/*
  .config(['AppTitle', 'AppInfo', 'CommonProc',
    function(AppTitle, AppInfo, CommonProc) {
    console.log(AppTitle);
    console.log(AppInfo);
    CommonProc(AppInfo.author);
  }])
*/
  .value('AppTitle', 'AngularJSプログラミング')
  .value('AppInfo', {
    author: '山田理央',
    updated: new Date(2007, 5, 25)
  })
  .value('CommonProc', function(value) {
    console.log(value);
  })

  .controller('MyController', ['$scope', 'AppTitle', 'AppInfo', 'CommonProc',
    function($scope, AppTitle, AppInfo, CommonProc) {
    $scope.title = AppTitle;
    $scope.info = AppInfo;
    $scope.proc = CommonProc;
  }]);
