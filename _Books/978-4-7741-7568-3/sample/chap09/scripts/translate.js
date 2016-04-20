angular.module('myApp', [ 'pascalprecht.translate' ])
  .config(['$translateProvider', function($translateProvider) {
    $translateProvider
      .useStaticFilesLoader({
          prefix: 'i18n/',
          suffix: '.json'
      })
      .preferredLanguage('ja')
      //.determinePreferredLanguage()
      .fallbackLanguage('en');
  }])
  .controller('MyController', ['$scope', function($scope) {
    $scope.data = { name: '山田理央' };
  }]);