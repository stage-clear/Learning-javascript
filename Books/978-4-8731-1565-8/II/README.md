第II部 ループとロジックの単純化
# ７章 制御フローを読みやすくする
## 7.1 条件式の引数の並び順

## 7.2 if/elseブロックの並び順
- 条件は否定形よりも肯定形を使う。例えば、`if (!debug)`ではなく、`if (debug)`を使う
- 単純な条件を先に書く。`if`と`else`が同じ画面に表示されるので見やすい
- 関心を引く条件や目立つ条件を先に書く

## 7.3 三項演算子

> **鍵となる考え**<br>
> 行数を短くするよりも、他の人が理解するのにかかる時間を短くする

> **アドバイス**<br>
> 基本的には `if/else`を使おう。三項演算子はそれによって簡潔になるときにだけ使おう。

## 7.4 do/whileループを避ける

do/whileループが変わっているのは、コードブロックを再実行する条件が下にあることだ。
コードは上から下に読んでいくので、do/whileは少し不自然だ。
コードを２回読むことになってしまう。

## 7.5 関数から早く返す

## 7.7 ネストを浅くする

> **鍵となる考え**<br>
> 変更するときにはコードを新鮮な目で見る。一歩下がって全体を見る

# 8章 巨大な式を分割する

> **鍵となる考え**<br>
> 巨大な式は飲み込みやすい大きさに分割する

## 8.1 説明変数

```
if line.split(':')[0].strip() == 'root'
  ...

// 説明変数を使うと
username = line.split(':')[0].strip()
if username == 'root'
  ...
```

## 8.2 要約変数

```
if (request.user.id == document.owner_id) {
  // ユーザはこの文書を編集できる
}

if (request.user.id != document.owner_id) {
  // 文書は読み取り専用
}

// 要約変数を使うと
final boolean = user_owns_document = (request.user.id == document.owner_id);

if (user_owns_document) {
  // ユーザーはこの文書を編集できる
}

if (!user_owns_document) {
  // 文書は読み取り専用
}
```

## 8.3 ド・モルガンの法則を使う
```
1) not (a or b or c)   ←→ (not a) and (not b) and (not c)
2) not (a and b and c) ←→ (not a) or (not b) or (not c)
```
この法則が覚えにくいようであれば、「`not`を分解して`and/or'を反転する」（逆方向は「`not`をくくりだす」）と覚えればいい。

> **どうして1行で書こうとしたのだろう？そのときは「オレは頭がいい」と思っていたのだ。**

# 9章 変数と読みやすさ
以下の3つの問題に取り組みことになる。

1. 変数が多いと変数を追跡するのが難しくなる。
2. 変数のスコープが大きいとスコープを把握する時間が長くなる。
3. 変数が頻繁に変更されると現在の値を把握するのが難しくなる。

## 9.1 変数を削除する
### 役に立たない一時変数
```js
now = datetime.datetime.now()
root_message.last_view_time = now

// [After]
root_message.last_view_time = datetime.datetime.now()
```
`now`がなくても楽に理解できる。

### 中間結果を削除する

```js
var remove_one = function (array, value_to_remove) {
  var index_to_remove = null;
  for (var i = 0; i < array.length; i += 1) {
    if (array[i] === value_to_remove) {
      index_to_remove = i;
      break;
      
      // [After] index_to_remove を削除する
      // array.splice(i, 1);
      // return;
    }
  }
  if (index_to_remove !== null) {
    array.splice(index_to_remove, 1);
  }
};
```

### 制御フロー変数を削除する
```js
boolean done = false;

while (/*条件*/ && !done) {
  ...
  if (...) {
    done = true;
    continue;
  }
}

// [After]
while (/*条件 */) {
  ...
  if (...) {
    break;
  }
}
```

## 9.2 変数のスコープを縮める

> **鍵となる考え**
> 変数のことが見えるコード行数をできるだけ減らす。

### JavaScriptで「プライベート」変数を作る
```js
submitted = false; // 注意: グローバル変数

var submit_form = function (form_name) {
  if (submitted) {
    return; // 二重投稿禁止
  }
  // ...
  submitted = true;
};

// [After] プライベート変数を使う
var submit_form = (function () {
  var submitted = false; // 以下の関数からしかアクセスされない
  
  return function (form_name) {
    if (submitted) {
      return ; // 二重投稿禁止
    }
    // ...
    submitted = true;
  };
}());
```

### JavaScriptのグローバルスコープ
```html
<script>
  var f = function () {
    // 危険: `i`は`var`でせんげんされていない
    for (i = 0; i < 10; i += 1) {
      //...
    }
  };
  f();
</script>
```
