# 物体に動く力を操作する
## Box2Dが使用する物理学
Box2Dが利用する物理学も基本的にはニュートン力学で, 物体に働く力と物体の質量,
物体の速度の相互作用を計算することで, シミュレーションを実行しています.

しかし, Box2Dの仮想世界は純粋なニュートン力学の世界とうわけではなく,
Box2D独自の要素も含まれています.

純粋なニュートン力学を再現するのではなく, ゲームなどでより「本物らしい」
シミュレーションを実行できるよう工夫されているのです.

## この章で学ぶこと
- 仮想世界の中に物体を作成し, その物体に力を作用させてみます
- 物体が, 力によって移動を開始し, 放物線を描いて落下する様子を確認します
- 物体への作用の種類を変えてみて, 物体の挙動の変化を観察します

## 仮想世界を作成する
### 仮想世界の作成
- [chapt3.html](../examples/chapt3.html)

### ボールの作成

```js
function init() {
  //...
  
  // ボールを作成
  bodyDef.type = b2Body.b2_dynamicBody;
  fixDef.shape = new b2CircleShape(2.0); // 半径
  fixDef.density = 0.8;
  fixDef.friction = 0.4;
  fixDef.restitution = 0.5;
  bodyDef.position.Set(10, 46);
  var ball = world.CreateBody(bodyDef);
  ball.CreateFixture(fixDef);
}
```

## クリックイベントの設定

```js
function init() {
  // ...
  
  // クリックイベントを登録する
  document.addEventListener('click', click, true);
  
  function click(e) {

  }
}
```

## 物体を操作する
### 物体に力を加える
物体に対する力は, 力のベクトルと物体内のどの点に対して加えるかという座標で与えられます.
ここでは力のベクトルを `(2500, -15000)`, 力を加える点を物体の重心にします.

```js
function click(e) {
  var force = new b2Vec2(2500, -15000); // 力のベクトル
  var point = ball.GetPosition(); // 力を加える点
  ball.ApplyForce(force, point); // 物体に力を加える
}
```

### 物体にトルクを加える
物体を回転させようとする力のことを「トルク」といいます.

```js
function click(e) {
  // ...
  ball.ApplyTorque(30000); // 物体にトルクを加える
}
```

物体に加えられる力とトルクは不可分なものではありません.  
たとえば物体に力を加えたときに, 力を加える場所と物体の重心が一直線上にない場合は, 
物体は移動と回転を組み合わせた複雑な動きをすることになります.

### 力, 移動速度, 衝撃の関係
物体に対して力を加えたとき, その物体がどの位の速度で移動を始めるかは, 加えられた大きさと物体の重さによります.

Box2Dでは, 物体の移動速度を直接, 変更することもできます.
物体の移動速度を直接変更するには `SetLinearVelocity()` を使用し,
物体の回転速度を変更するには, `SetAngularVelocity()` を使用します.

```js
var velocity = new b2Vec2(5, -30); // 移動速度のベクトル
ball.SetLinearVelocity(velocity); // 物体の移動速度を変更する
ball.SetAnbularVelocity(1.5); // 物体の回転速度を変更する
```

さらに, 実際の物理法則には存在しない概念ですが, Box2Dでは物体に対して「衝撃」(Impulse) を加えることもできます

```js
var velocity = new b2Vec2(2500, -15000); // 衝撃のベクトル
var point = ball.getPosition(); // 衝撃を加える点
ball.ApplyLinearImpulse(velocity, point); // 物体に衝撃を与える
ball.ApplyImpulse(3000); // 物体に回転の衝撃を与える
```

```error
Uncaught TypeError: ball.ApplyLinearImpulse is not a function
```

### 物体の位置を取得する

```js
// 物体の位置を取得する
var position = ball.GetPosition();
var x = position.x;
var y = position.y;
// 物体の角度を取得する
var angle = ball.GetAngle();
```

```js
function update() {
  // ...
  
  var position = ball.GetPosition();
  var x = position.x;
  var y = position.y;
  var angle = ball.GetAngle();
  document.getElementById('canvas').getContext('2d')
    .fillText('座標:('+ x +', '+ y +'), 角度: '+ angle, 10, 10);
}
```

また, 同様にして, `GetLinearVelocity()` で現在の物体の移動速度を,
`GetAngularVelocity()` で現在の物体の回転速度を取得できます.

#### 「力」と「衝撃」について

## より高度な機能で物体を操作する
### 物体を操作するその他の機能

### 空気抵抗のような効果を再現する
Box2D では物体に対して, その物体が仮想世界内を移動する際に, 移動する速度を減衰するように設定することができます.
移動速度の減衰率は `SetLinearDamping()` で指定します.  
同様に, 物体の回転の減衰率は `SetAngularDamping()` で指定します.

```js
// 物体の移動の減衰率を指定する
body.SetLinearDamping(0.3);
// 物体の回転の減衰率を指定する
body.SetAngularDamping(0.3);

// 物体の移動の減衰率を取得する
var damping = body.GetLinearDamping();
// 物体の回転の減衰率を取得する
var damping = body.GetAngularDamping();
```

## 物体を回転しないようにする
Box2Dの物体に対して, その重心とずれたところに力を加えると, 物体はその力に応じて回転を始めます.
しかし, 引数を `true` にして `SetFixedRotation()` を呼び出すことで, 物体の回転が抑止されるようになります.

この機能は, たとえば多数の円で砂の流れをシミュレートするときなどのように,
物体の回転を考慮しなくてもよい場合に使用することで, 計算量を節約することができます.

また, `IsFixedRotation()` を呼び出すことで, 物体が回転しないように設定されているかどうかを取得することができます.

```js
// 物体を回転しないようにする
body.SetFixedRotation(true);

// 物体が回転しないように設定されているかどうか
var fixed = body.IsFixedRotation();
```

### 仮想世界内に働いている力をすべてクリアする

```js
// 仮想世界内に働いている力をすべてクリアする
world.ClearForces();
```
