angular.module('myApp', [ 'uiGmapgoogle-maps' ])
  .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
  }])
  .controller('MyController', ['$scope', 'uiGmapGoogleMapApi',
    function($scope, uiGmapGoogleMapApi) {
    uiGmapGoogleMapApi.then(function(maps) {
      $scope.map = {
        center: { latitude: 35.692402, longitude: 139.722881 },
        zoom: 14,
        options: {
          mapTypeId: google.maps.MapTypeId.SATELLITE
        },
        markers: [
          {
            id: 1,
            latitude: 35.693449,
            longitude: 139.7356357,
            title: '技術評論社',
            content: '本書を刊行いただいた出版社',
            show: false
          },
          {
            id: 2,
            latitude: 35.689487,
            longitude: 139.691706,
            title: '東京都庁',
            content: '展望室から東京のまちを一望できます。',
            show: false
          }
        ]
      };

      angular.forEach($scope.map.markers, function(marker, index) {
        marker.onclick = function() {
          marker.show = !marker.show;
        };
      });
    });
  }]);