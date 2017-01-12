# ScrollMagic の使い方
- [origin](https://github.com/janpaepke/ScrollMagic/wiki/Getting-Started-:-How-to-use-ScrollMagic)

## ScrollMagic はどのようにして動作するか
ScrollMagicの基本的なデザインパターンは,任意の数のシーンを持つコントローラです.

1. スクロール要素ごとに1つの __コントローラ__ があります. 
   多くの場合, それはブラウザウィンドウをスクロールするコンテナとした一つのコントローラとなります.
   ですが, スクロールするDIV要素や複数のコンテナを使用することもできます.
2. __シーン__ は, スクロールの位置において, いつなにが起こるかを定義します.
   それは, アニメーションを始めたり, 要素を固定したり, 要素のクラスを変更したりなど
   あなたの望むことを実行することができます.

## コントローラを定義する
前途したように, 多くの場合はブラウザウィンドウがスクロールするコンテナとなります.
コントローラを作成するには, 初期設定と `ScrollMagic.Controller()` クラスを使うことができます.
新しいインスタンスを作成し変数に割り当てます.

```js
var controller = new ScrollMagic.Controller()
```
これだけです! これからもっとおもしろくなります.

## シーンを定義する
シーンは, `ScrollMagic.Scene()` クラスを使うことで作成されます.
`ScrollMagic.Scene` は, コントローラがどう反応すべき場所を定義します.
ここに "シーン" を呼び出した変数を定義し, 新しい `ScrollMagic.Sence()` のインスタンスを作成します.

```js
var scene = new ScrollMagic.Scene()
```

`ScrollMagic.Scene` の内側（引数）で, オプションプロパティのオブジェクトを指定することができます.
利用可能なオプションは[こちら](http://scrollmagic.io/docs/ScrollMagic.Scene.html#ScrollScene).  
これらのオプションは, シーンの振る舞いや効果を説明します.
[シーン操作のサンプル](http://scrollmagic.io/examples/basic/scene_manipulation.html) で確認することができます.

```js
var scene = new ScrollMagic.Scene({
  offset: 100, // 100px スクロールした後でシーンを始めます
  duration: 400 // 400px スクロールしている間要素を固定します
})
```

## シーンをコントローラに追加する
コンテナのスクロールに反応するシーンを持つために, コントローラにシーンを追加しなければいけません.
最初から定義しました.

```js
var scene = new ScrollMagic.Scene({
  triggerElement: '#pinned-trigger1', // この要素に到達したときにシーンを始めます.
  duration: 400 // 400px の間要素を固定します.
})
.setPin('#pinned-element1') // この要素を固定します.

// コントローラにシーンを追加します.
controller.addScene(scene)
```

もし複数のシーンを望むなら, 以下のようにして一度でコントローラに通すことができます.

```js
controller.addScene([
  scene1,
  scene2,
  scene3
])
```

コントローラのメソッドを使う代わりに, シーンから一意のコントローラに追加することができます.

```js
var scene = new ScrollMagic.Scene({
  triggerElement: '#trigger1'
})
.addTo(controller) // コントローラに追加します

var scene2 = new ScrollMagic.Scene({
  triggerElement: '#trigger2'
})
.addTo(controller) // コントローラに追加します
```

上記の例では, `addTo()` を "チェインニング" と呼ばれるテクニックを使っています.
もしセミコロンを使わないなら, `ScrollMagic.Scene` のメソッドを "チェイン" でつなぐことができます.

次は, シーンにいくつかのアニメーションを追加してみましょう.
