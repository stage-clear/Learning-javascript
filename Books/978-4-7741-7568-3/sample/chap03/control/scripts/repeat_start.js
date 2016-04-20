angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.articles = [
      {
        title: 'サーブレット＆JSPポケットリファレンス',
        body: 'Javaエンジニアには欠かせないサーブレット＆JSPのリファレンス。サーブレット3.1＆JSP2.3に対応。',
        author: '山田祥寛'
      },
      {
        title: 'iPhone／iPad開発ポケットリファレンス',
        body: 'スマホやタブレットの代名詞といえるiPhone/iPadでアプリ開発するための知識をまとめたリファレンスが登場。',
        author: '片渕彼富'
      },
      {
        title: 'Java ポケットリファレンス',
        body: '忘れてしまいがちな基本情報をコンパクトなサイズに凝縮。逆引きで目的からすぐに探せて、サンプルで具体的な実装イメージをつかめます。',
        author: '高江賢'
      },
    ];
  }]);
