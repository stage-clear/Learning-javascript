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
  
  var debugDraw = new b2DebugDraw();
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

その後, `fixDef.shape.SetAsBox(25, 19)` で, 物体の形状と位置を指定しています.

### 物体の追加

```js
function init() {
  // ...
  
  // create a object
  bodyDef.type = b2Body.b2_dynamicBody;
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(2, 2);
  bodyDef.position.Set(25, 10);
  world.CreateBody(bodyDef).CreateFixture(fixDef);
}
```

### 反発係数の設定
物体に反発係数を設定するには, `b2FixtureDef` クラスの `restitution` プロパティを設定します.

```js
function init() {
  // ...
  fixDef.restitution = 0.5; 
}
```

## より高度なパラメーターを設定する
### その他のパラメーター

### 密度と摩擦係数

- `restitution` 反発係数. 1なら衝突した後, 同じ速度で跳ね返る. 1以上に設定することもできる
- `friction` 摩擦係数. 物体間に斜めの力が働いている場合, 互いに滑って動くための摩擦を設定する
- `density` 密度. 形状の密度と物体の大きさを掛け合わせたものが, その形状の質量となる

__重力を斜め方向にし, 物体感の摩擦を確かめる__  

```js
var world = new b2World(
  newb2Vec2(4,4, 8.7),
  true
)
```

物体を上から落下するのではなく, 初めから床の上に置いてあるようにします.

```
bodyDef.position.Set(10, 46);
```

ここで, 床と物体の両方に摩擦係数を設定してみましょう

```
fixDef.friction = 0.8;
```

`0.8` では全く動かず `0.4` の場合, 物体は非常にゆっくりと床の上を滑ります.

### 物体の重さと重心の位置
`b2Body` クラスの `GetMass()` を使用することで, 物体が作成された後に, その物体を重さを取得することができます.

```js
var mass = body.getMass();
```

なんらかの理由で, 物体の重さを再計算させる場合には, `ResetMassData()` を呼び出します.

```js
body.ResetMassData();

var mass = body.GetMass();
```

物体の重心位置は, 作成したものを表す `b2Body` クラスの
`GetLocalCenter()` か `GetWorldCenter()` から取得できます.  
戻り値は `b2Vec2` クラスとなっています.

- `GetLocalCenter()` 物体のローカル座標での重心位置
- `GetWorldCenter()` 物体のワールド座標での重心位置

```js
var localcenter = body.GetLocalCenter();
var localcenter_x = localcenter.x;
var localcenter_y = localcenter.y;

var worldcenter = body.GetWorldCenter();
var worldcenter_x = worldcenter.x;
var worldcenter_y = worldcenter.y;
```

ローカル座標とは物体の中心座標を基準にした相対座標のことをいい,
ワールド座標とは物体の存在している仮想世界上での座様のことをいいます.  
ローカル座標での重心位置は物体が移動しても変化しませんが, ワールド座標でみると変化します.

### 物体を削除する
物体を削除するには, 削除したい物体を表す `b2Body` クラスを引数に指定し,
`b2World` クラスの `DestroyBody()` を使用します.

```js
var mybody = world.CreateBody(bodyDef);
mybody.CreateFixture(fixDef);

world.DestroyBody(mybody);
```


仮想世界内にあるすべての物体を削除するには, `b2World` クラスの `GetBodyList()` を使用し,
仮想世界内にあるすべての物体を取得します.  
`GetBodyList()` で取得できる物体は `b2Body` クラスのリンクリストとなっており,
繰り返して `GetNext()` を呼び出すことですべての物体を列挙することができます.

```js
for (var b = world.GetBodyList(); b; b = b.GetNext()) {
  world.DestroyBody(b)
}
```
