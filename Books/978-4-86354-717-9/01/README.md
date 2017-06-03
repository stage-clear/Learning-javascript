# Box2D とは

## Box2D と物理シミュレーションの概要
### Box2D とは

## 2D物理シミュレーションについて
Box2Dは物理シミュレーションの一種で、「2D剛体シミュレーション」と呼ばれるものの一つです.  
「剛体」というのは, Box2D上で扱われるすべての物体はある決まった形状を持ち, 力が加わっても変形しないという意味です.

- 剛体シミュレーション (例: 砂時計の砂, 鉄骨の結合店に働く力)
- 流体シミュレーション (例: 容器の中の水)
- 応力シミュレーション (例: 鉄骨の変形)

## 実行環境と開発環境について
### 開発言語

### Box2DWeb のダウンロード
- [hecht-software/box2dweb](https://github.com/hecht-software/box2dweb)

### APIドキュメント
- [All Packages - Box2DFlash Documentation](http://www.box2dflash.org/docs/2.1a/reference/)

## Box2D を使う
### Box2DWeb のファイル構成

### ソースコードの書き方

### Box2D の読み込み

### Box2DWeb のクラス
JavaScript は ActionScript と違い, パッケージ名の定義など, いくつかの機能が存在しないため,
パッケージ名も含んだクラス名を記述します.  
たとえば, `b2Vec2` は `Box2D.Common.Math` というパッケージ内に存在しており, 
パッケージも含めたクラス名は `Box2D.Common.Math.b2Vec2` となります.

```js
/* まちがっている例: クラス名のみ */
var v = new b2Vec2()

/* ただしい例: パッケージ名も含んだクラス名*/
var w = newBox2D.Common.Math.b2Vec2()
```

```js
var b2Vec2 = Box2D.Common.Math.b2Vec2
var x = new b2Vec2()
```

HTMLファイルのひな形:

```html
<!doctype html>
<html>
  <head>
    <script src="Box2DWeb.js"></script>
    <script>
      function init() {
        var b2Vec2 = Box2D.Common.Math.b2Vec2
          , b2AABB = Box2D.Collision.b2AABB
          , b2BodyDef = Box2D.Dynamics.b2BodyDef
          , b2Body = Box2D.Dynamics.b2Body
          , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
          , b2Fixture = Box2D.Dynamics.b2Fxture
          , b2World = Box2D.Dynamics.b2World
          , b2MassData = Box2D.Collision.Shapes.b2MassData
          , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
          , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
          , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
          , b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef
        ;
      }
    </script>
  </head>
  <body onload="init">

  </body>
</html>
```

### サンプルプログラムを動かしてみる
