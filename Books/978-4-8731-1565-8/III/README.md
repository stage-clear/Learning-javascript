第III部 コードの再編成

# 10章　無関係の下位問題を抽出する
- プログラムの主目的と関係ない「無関係の下位問題」を抽出する
- コードを再構成して、一度に1つのことをやるようにする
- 最初にコードを言葉で説明する。その説明をもとにしてキレイな解決策を作る

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
```js
ajax_post({
  url: 'htt@://example.com/submit',
  data: data,
  on_success: function (response_data) {
    var str = '{\n';
    for (var key in response_data) {
      str + = ' ' + key + ' = ' + response_data[key] + '\n';
    }
    alert(str + '}');
    
    // 引き続き 'response_data' の処理
  }
});
```
このコードの高レベルの目標は「**サーバをAjaxで呼び出してレスポンスを処理する**」である。このコードの大部分は「**ディクショナリをキレイに印字（pretty print)する**」

```js
var format_pretty = function (obj) {
  var str = '{\n';
  for (var key in obj) {
    str += ' ' + key + ' = ' + obj[key] + '\n';
  }
  return str + '}';
}
```

### 思いも寄らない恩恵
```js
var format_pretty = function (obj, indent) {
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (typeof obj === 'string') return '"' + obje + '"';
  if (typeof obj !== 'object') return String(obj);
  if (indent === undefined) indent = '';
  
  var str = '{\n';
  for (var key in obj) {
    str += indent + ' ' + key + ' = ';
    str += format_pretty(obj[key:, indent + ' ') + '\n');
  }
  return str + indent + '}';
};
```

## 10.5 プロジェクトに特化した機能

## 10.6 既存のインターフェースを簡潔にする

ここでの教訓は**「理想とは程遠いインタフェースに妥協することはない」**ということだ。

## 10.7 必要に応じてインターフェースを整える

## 10.8 やりすぎ

## 10.9 まとめ

# 11章 一度に１つのことを
> **鍵となる考え**<br>
> コードは1つずつタスクを行うようにしなければいけない。

「関数は一度に1つのことを行うべきだ」

## 11.1 タスクは小さくできる

```js
var vote_changed = function (old_vote, new_vote) {
  var score = get_score()
  
  if (new_vote !== old_vote) {
    if (new_vote === 'Up') {
      score += (old_vote === 'Down' ? 2 : 1);
    } else if (new_vote === 'Down') {
      score -= (old_vote === 'Up' ? 2 : 1);
    } else if (old_vote === '') {
      score += (old_vote === 'Up' ? -1 : 1);
    }
  }
  
  set_score(score);
};
```

このコードは1つのことをしているように見えて、実際には一度に2つのタスクを行なっている
1. `old_vote`と`new_vote`を数値に「パース」する
2. `score`を更新する

```js
var vote_value = function (vote) {
  if (vote === 'Up') {
    return +1;
  }
  if (vote === 'Down') {
    return -1;
  }
  return 0;
};
```

```js
var vote_changed = function (old_vote, new_vote) {
  var score = get_score();
  
  score -= vote_value(old_vote);
  score += vote_value(new_vote);
  
  set_score(score);
};
```

## 11.2 オブジェクトから値を抽出する

### 「一度に１つのタスク」を適用する

### その他の手法

## 11.3 もっと大きな例

### さらなる改善

# 12章 コードに思いを込める
## 12.1 ロジックを明確に説明する
> おばあちゃんがわかるように説明できなければ、本当に理解したとは言えない。<br>
> --- アルバート・アインシュタイン

## 12.2 ライブラリを知る

# 13章 短いコードを書く
> **鍵となる考え**<br>
> 最も読みやすいコードは、何も書かれていないコードだ。


