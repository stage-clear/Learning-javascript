# 基本的な物理シミュレーション
## 物理シミュレーションの概要
### 仮想世界とは
Box2Dの仮想世界には x と y の座標軸が存在し, 二次元物体を含むことができます.

### 物理シミュレーションの実行
Box2Dは, 時間の経過とともに現象がどのように進むかをシミュレートする「時間分割シミュレーション」の一種です.

## この章で学ぶこと
- 実際に仮想世界を作成し, 物理シミュレーションを動作させてみます
- 物体を作成して, 重力に従って落下する様子を観察します
- 物体の物性を変化させてみて, シミュレーションの挙動がどう変化するかを観察します

## 仮想世界を作成する
### 仮想世界の作成

```js
var world = new b2World(
  new b2Vec2(0, 9.8),  // 与える重力のベクトルは1G
  true
)
```

### Canvas の作成
Box2Dでは慣例的に, 内部の座標をメートル単位で扱います.

```html
<body class="init()">
  <canvas id="canvas" width="500" height="500" style="background-color: #333;">

  </canvas>
</body>
```

### 表示の設定
`debugDraw` クラスを利用することで, 画像や描写処理を用意しなくても, 物体の挙動などシミュレーションの結果を表示することができます.

```js
function init() {
  // ...
  
  var debugDraw = b2DebugDraw();
  debugDraw.SetSprite(document.getElementById('canvas').getContext('2d'));
  debugDraw.SetDrawScale(10.0);
  debugDraw.SetFillAlpha(0.5);
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
  world.SetDebugDraw(debugDraw);

  window.setInterval(update, 1000 / 60);
  
  function update() {
    world.Step(1 / 60, 10, 10);
    world.DrawDebugData();
    world.ClearForces();
  }  
}
```

仮想世界の表示する領域が 50mx50m なのに対して, `<canvas>` の大きさが 500pxx500px なので,
`debugDraw.SetDrawScale(100)` と記述して表示の倍率を10倍に設定します.

- `setFillAlpha()` で物体の透明度
- `SetLineThickness()` で物体の境界線の幅
- `SetFlags()` で表示する対象のフラグ

## 物体のパラメーターを設定する
### 床の作成
幅が50m, 高さが2mの矩形からなる物体を作成します

```js
function init() {
  // ...
  
  // create a floor
  var fixDef = new b2FixtureDef;
  var bodyDef = new b2BodyDef;
  
  bodyDef.type = b2Body.b2_staticBody;
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(25, 1);
  boxDef.position.Set(25, 49);
  world.CreateBody(bodyDef).CreateFixture(fixDef);
  
}
```

### 物体のタイプと形状
物体を作成する際に必要となるパラメーターには, 物体が仮想世界のどの場所にあるか,
どのようにシミュレートされるべきかなどの物体そのものを定義するものと,
物体がどのような形をしているかという形状を定義するものがあります.

- `b2BodyDef` - 物体そのもののパラメータを入れるクラス
- `b2FixtureDef` - 物体の形状に関するパラメータを入れるクラス

Box2Dでは, 物体の種類がいくつかあり, それぞれ異なったタイプとしてシミュレートされます.

- `b2_staticBody` 空間に固定された動かない物体
- `b2_dynamicBody` 重力の影響を受け動く通常の物体
- `b2_kinematicBody` 重力の影響は受けないが, 衝突の影響は受けて動く物体
