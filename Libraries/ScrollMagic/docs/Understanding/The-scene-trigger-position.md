# シーンを引き出す位置

もし, シーンを引き出す位置を設定する方法, 言い換えると, 実行されるポイントを不思議に感じるなら, それは正しいことです.
引き出し位置は基本的に特定のスクロール位置, それぞれのシーン効果を得る場所です.

３つの引数の組み合わせから開始位置を作成します.
`offset`, `triggerElement` そして `trigerHook` です.

ひとつずつ見ていきましょう.

はじめるために, "シーン" を呼び出す変数を作成し `ScrollMagic.Scene()` クラスを初期化します.

```js
var scene = new ScrollMagic.Scene()
```

この `ScrollMagic.Scene` の引数には key-value のオブジェクトを渡すことができます.
提供されているオプションは[こちら](http://scrollmagic.io/docs/ScrollMagic.Scene.html#ScrollScene)から.

```js
var scene = new ScrollMagic.Scene({
  triggerElement: '#scroll-trigger' // 実行する位置
})
```

例からわかるように, 上記で使用した `triggerElement` プロパティは ScrollMagic によって提供されています.
`triggerElement` 値はセレクター, DOMオブジェクト, または jQuery オブジェクトを指定でき, シーンの起動を定義します.
もし未定義なら、ページ開始時にシーンを正しく起動します(offset が設定されていなければ).
その場合, DOMノードの id 値を使います.
