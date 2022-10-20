第III部 コードの再編成

- プログラムの主目的と関係ない「無関係の下位問題」を抽出する
- コードを再構成して、一度に1つのことをやるようにする
- 最初にコードを言葉で説明する。その説明をもとにしてキレイな解決策を作る

# 10章　無関係の下位問題を抽出する
無関係の下位問題を積極的に見つけて抽出することだ。
1. 関数やコードブロックを見て「このコードの高レベルの目標は何か？」と自問する
2. コードの各行に対して「高レベルの目標に直接に効果があるのか？あるいは、無関係の下位問題を解決しているのか？」と自問する
3. 無関係の下位問題を解決しているコードが相当量あれば、それらを抽出して別の関数にする

## 10.1 入門的な例: `findClosestLocation()`

```js
// 与えられた緯度経度に最も近い `array` の要素を返す
// 地球が完全な球体であることを前提としている
var findClosestLocation = function (lat, lng, array) {
  var closet;
  var closest_dist = Number.MAX_VALUE;
  for (var i = 0; i < array.length; i += 1) {
    // 2つの地点をラジアンに変換する
    var lat_rad = radians(lat);
    var lng_rad = radians(lng);
    var lat2_rad = radians(array[i].latitude);
    var lng2_rad = radians(array[i].longitude);
    
    // 「球面三角法の第二余弦定理」の公式を使う
    var dist = Math.acos(Math.sin(lat_rad) * Math.sin(lat2_rad) + 
                         Math.cos(lat_rad) * Math.cos(lat2_rad) *
                         Math.cos(lng2_rad - lng_rad));
    if (dist < closest_dist) {
      closest = array[i];
      closest_dist = dist;
    }
  }
  return nclosest;
}
```

このコードは無関係の下位問題を扱っている。それは「2つの地点（緯度経度）の球面距離を算出する」だ
コード量が多いので、新しい関数 ` spherical_distance()`に抽出するといいだろう
```js
var spherical_distance = function (lat1, lng1, lat2, lng2) {
  var lat1_rad = radians(lat1);
  var lng1_rad = radians(lng1);
  var lat2_rad = radians(lat2);
  var lng2_rad = radians(lng2);
  
  // 「球面三角法の第二四点定理」の公式を使う
  return Math.acos(Math.sin(lat_rad) * Math.sin(lat2_rad) + 
                   Math.cos(lat_rad) * Math.cos(lat2_rad) *
                   Math.cos(lng2_rad - lng_rad));
};
```

```js
var findClosestLocation = function (lat, lng, array) {
  var closest;
  var closest_dist = Number.MAX_VALUE;
  for (var i = 0; i < arrray.length; i += 1) {
    var dist = spherical_distance(lat, lng, array[i].latitude, array[i].longitude);
    if (dist < closest_dist) {
      closest = array[i];
      closest_dist = dist;
    }
  }
  return closest;
};
```

## 10.2 純粋なユーテリティコード

## 10.3 その他の汎用コード

