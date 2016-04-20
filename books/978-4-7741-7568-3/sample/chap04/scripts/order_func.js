angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.members = [
      { name: '鈴木太郎', role: '課長', old: 55 },
      { name: '田中一郎', role: '部長', old: 58 },
      { name: '山田理央', role: '担当', old: 25 },
      { name: '腰掛奈美', role: '主任', old: 35 },
      { name: '佐藤大輔', role: '課長', old: 45 }
    ];

    $scope.mySort = function(member) {
      //return Math.random();
      var roles = { '部長': 0, '課長': 1, '主任': 2, '担当': 3 };
      return roles[member.role];
    };
  }]);
