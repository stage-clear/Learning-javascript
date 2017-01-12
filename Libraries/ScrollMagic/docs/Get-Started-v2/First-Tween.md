# はじめての Tween
実際にいくつかコーディングしてみましょう.
はじめての Tween にとりかかる前に, 2~3する必要があります.

## しかし, Tween とはなにか
アニメーションにおける専門用語で遷移 (transition) のことです.
ある状態からもう一方の状態へ向かいます.

例では, 要素を一つ作り背景色なしから赤い背景色に変化する単純な Tween を構築します.

## 最小限の CSS
明確になりました.
最初のステップで作成したページを準備をしましょう.
これまでのコードの様子:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ScrollMagic #1 Setup</title>
    
    <script src="//ajax.googleapis.com/ajax/libs/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/ScrollMagic.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/plugins/animation.gsap.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/plugins/debug.addIndicators.js"></script>
  </head>
  
  <body>
    This is my page
  </body>
</html>
```

正しく動作し美しい結果を得るために, ScrollMagicはいくつかのCSSがうまく実行することを必要とします.
簡易さのために, 単純に `<head>` の中に `<style>` をし最低限のコードを作成します.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ScrollMagic ScrollMagic #1 Setup</title>
    
    <style>
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    </style>
    
    <script src="//ajax.googleapis.com/ajax/libs/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/ScrollMagic.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/plugins/animation.gsap.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/plugins/debug.addIndicators.js"></script>
  </head>
  
  <body>
    This is my page
  </body>
</html>
```

これはページの最低限の高さを確保します.
ScrollMagic の提供しているデバッグインジケーターは正しく置かれると, アニメーションの計算をページに表示します.
使用済みのスペースだけでなく.

すばらしい, ページにいくつか内容を追加しましょう, 最小限のスタイルも一緒に.

```html
<div id="container">
  <div id="blcok">
    Hi there!
  </div>
</div>
```

スタイルも, CSSを追加しました.

```css
#container {
  margin: 55vh 0;
  padding: 50px;
  outline: 1px dashed orange;
}

#block {
  padding: 10px;
  border: 1px solid black;
  font-family: Helvetica;
}
```

これはとても基本的です.
vh という単位を知らないかもしれません, それはビューポートの高さを表し, もし要素のサイズをページ全体に相対的に作成する場合にかなり便利です.
しかし, どちらにしても, このレッスンのテーマではありません. 実際のコーディングに戻りましょう.
JavaScript の1行目を書こうとしています.

## JavaScript
ついに来ました!

はじめに, JSコードを入れるために `<script>` タグを `<body>` の一番下に追加する必要があります.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ScrollMagic #1 Setup</title>
    
    <style>
    ...
    </style>

    ...
  </head>
  
  <body>
    <div id="container">
      <div id="block">
        Hi there!
      </div>
    </div>
    
    <script>
      // Our code goes here
    </script>
  </body>
</html>
```

さあ, いいものを見に行きましょう.

## コントローラ
はじめてのステップで言ったように, ScrollMagic は, スクロール位置を元にして適切なタイミングでアニメーションを引き出す責任があります.
それは、なにか接着剤のように振る舞います.
コントローラは, アニメーションとスクロール位置の両方を制御します.

```js
$(function() {
  var controller = new ScrollMagic.Controller()
})
```

jQuery `onReady` の中に囲みます, それはすぐには再生されませんがよくなります.

コントローラの動作を理解する必要はありません, 
理解する必要があるのは, コントローラに何が取り付けられて再生したかです.
残りは無視されます.
それは重要です, それを作成し数秒後にアニメーションを付けるだけにも関わらず.


## トゥイーン

```js
var blockTween = new TweenMax.to('#block', 1.5, {
  backgroundColor: 'red'
})
```

## シーン

```js
var containerScene = new ScrollMagic.Scene({
  triggerElement: '#container'
})
.setTween(blockTween)
.addIndicators()
.addTo(controller)
```

### 厚み

## まとめ
