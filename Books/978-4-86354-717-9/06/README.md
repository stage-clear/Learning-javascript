# ジョイント
## ジョイントとは
__ジョイント__ とは, Box2Dが持っている独自の機能で, 2つの物体を一定の法則に従って
動作するように関連づけるための仮想的なオブジェクトです.

## この章で学ぶこと
- Box2Dにおけるジョイントについて学びます
- ジョイントを使用して物体と物体を結びつけます
- 物理ゲームのジョイントを組み込んで, 自動で動作するステージを作成します

## 仮想世界を作成する
### 仮想世界の作成
- [chapt6.html](../examples/chapt6.html)

### なぜジョイントを使用するか
タイヤを表す円形の物体を作成して, その挙動を全てシミュレートする場合,
そのタイヤを軸受けに固定しようとすると, __タイヤは軸受けと衝突してしまい__, うまくいきません.

### アンカーポイントとは
アンカーポイントはそのジョイントが作用する仮想空間内の点のことで,
すべてのジョイントに存在します.

アンカーポイントは, 必ずしも結びつける物体の上に存在している必要はありません.

多くのジョイントでは, その際にジョイントが受け入れる力の値を設定することができます.
また, 外部から物体に与えられた力によって稼働する代わりに, 自動的に動作するように
ジョイントにモーターを設定することもできます.

## 物理シミュレーションを実行する
### 回転する床を作成する

```js
function init() {
  // ...
  
  // 回転する障害物を作成する
  bodyDef.type = b2Body.b2_dynamicBody;
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(7, 0.5);
  fixDef.density = 1.0;
  fixDef.friction = 1.0;
  fixDef.restitution = 0.1;
  bodyDef.position.Set(43, 15);
  bodyDef.angle = 0;
  var movebox1 = world.CreateBody(bodyDef);
  movebox1.CreateFixture(fixDef);
}
```

この物体を床となる物体に結びつけます.

まず `b2RevoluteJoinDef` クラスを作成して, そのクラスにアンカーポイントと結びつける物体の情報を登録し,
`b2World` クラスの `CreateJoint()` を呼び出すことで, ジョイントを作成することができます.

```js
function init() {
  // ...
  
  // 2つの物体を回転するように結びつける
  var jd = new b2RevoluteJointDef();
  // アンカーポイントを設定する
  var anchor = new b2Vec2(43, 15);
  // b2RevoluteJointDef の設定を初期化する
  jd.Initialize(floor, movebox1, anchor);
  // b2RevoluteJointDef を作成する
  world.CreateJoint(jd);

}
```

次に, このジョイントが自動で稼働するように, ジョイントにモーターを設定します

```js
// b2RevoluteJointDef の設定を初期化する
jd.Initialize(floor, movebox1, anchor);
// 自動で動かすモーターの速度を設定する
jd.motorSpeed = -0.5;
// 自動で動かすモーターの力を設定する
jd.maxMotorTorque = 1000000;
// 自動で動かすモーターの速度を有効にする
jd.enableMotor = true;
// b2RevoluteJointDef を作成する
world.CreateJoint(jd);
```

### 複数のジョイントを組み合わせた機構を作成する
自動的に回転するクランクを作成するために `Revolute Joint` と,
ピストンを軸に沿って移動させるための `Prismatic Joint`,
さらにクランクとピストンを結ぶロッドの代わりに, 2つのアンカーポイント間を等距離で結びつける
`Distance Joint` を使用します.

```js
function init() {
  // ...
  
  // b2ResoluteJointDef を作成する
  world.CreateJoint(jd);
  
  // ピストンの円の部分
  bodyDef.type = b2Body.b2_dynamicBody;
  fixDef.shape = new b2CircleShape(5.0);
  fixDef.density = 0.5;
  fixDef.friction = 0.4;
  fixDef.restitution = 0.6;
  bodyDef.position.Set(8, 42);
  var piston1 = world.CreateBody(bodyDef);
  piston1.CreateFixture(fixDef);
  
  // 円が回転するようにする
  var jd = new b2RevoluteJointDef();
  var anchor = new b2Vec2(8, 42);
  jd.Initialize(floor, piston1, anchor);
  jd.motorSpeed = 1.0;
  jd.maxMotorTorque = 1000000;
  jd.enableMotor = true;
  world.CreateJoint(jd);

  // ピストンの四角の部分
  bodyDef.type = b2Body.b2_dynamicBody;
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(3, 3);
  fixDef.density = 1.0;
  fixDef.friction = 1.0;
  fixDef.restitution = 0.1;
  bodyDef.position.Set(8, 28);
  bodyDef.angle = 0;
  var piston2 = world.CreateBody(bodyDef);
  piston2.CreateFixture(fixDef);
  
  // 四角が上下運動するようにする
  var jd = new b2PrismaticJointDef();
  var anchor = new b2Vec2(8, 28);
  var axis = new b2Vec2(0.1);
  jd.Initialize(floor, piston2, anchor, axis);
  world.CreateJoint(jd);
}
```

```js
function init() {
  // ...
  
  // 四角と縁を結ぶ
  var js = new b2DistanceJointDef();
  var anchor1 = new b2Vec2(13, 42);
  var anchor2 = new b2Vec2(8, 28);
  jd.Initialize(piston1, piston2, anchor1, anchor2);
  world.CreateJointDef(jd);
}
```

### センサーのついたピストンを作成する

```js
function init() {
  // ...
  
  // ピストンの四角の部分
  bodyDef.type = b2Body.b2_dynamicBody;
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(3, 3);
  fixDef.density = 1.0;
  fixDef.friction = 1.0;
  fixDef.restitution = 0.1;
  bodyDef.position.Set(8, 28);
  bodyDef.angle = 0;
  var piston2 = world.CreateBody(bodyDef);
  piston2.CreateFixture(fixDef);
  
  // センサーを作成する
  bodyDef.type = b2Body.b2_dynamicBody;
  fixDef.shape = new b2PolygonShape;
  var vertices = new Array();
  vertices[0] = new b2Vec2(1.4, -3);
  vertices[1] = new b2Vec2(1.4, -7);
  vertices[2] = new b2Vec2(-1.4, -5);
  fixDef.shape.SetAsArray(vertices, 3);
  var sensorFixture = piston2.CreateFixture(fixDef);
  sensorFixture.SetSensor(true);
}
```

センサーにボールが接触した場合には, 左向きの大きな力がボールに加わるようにします.

```
// 衝突検出のリスナーを登録する
var listener = new b2ContactListener;
listener.BeginContact = functioin(contact) {
  // 床とボールの衝突だったら
  if ((contact.GetFixtureA().GetBody() === ball &&
       contact.GetFixtureB().GetBody() === floor) || 
      (contact.GetFixtureA().GetBody() === floor &&
       contact.GetFixtureB().GetBody() === ball)) {
    alert('Clear');
  }
  
  // センサーの衝突だったら
  if ((contact.GetFixtureA().GetBody() === ball &&
       contact.GetFixtureB() === sensorFixture) || 
      (contact.GetFixtureA() === sensorFixture &&
       contact.GetFixtureB().GetBody() === ball)) {
    ball.ApplyForce(new b2Vec2(-50000, 0));
  }
}
```

## その他のジョイント
### いろいろなジョイント

### Weld Joint
2つの物体を動かないように固定するためのジョイント.

```js
// 2つの物体を動かないように固定する
var jd = new Box2D.Dynamics.Joints.b2WeldJointDef();
// アンカーポイントを設定する
var anchor = new Box2D.Common.Math.b2Vec2(120, 120);
// WeldJoint を定義する
jd.Initialize(body1, body2, anchor);
// WeldJoint を作成する
world.CreateJoint(jd);
```

ジョイントに作用している力を取得したい場合は, `GetReactionForce()` と `GetReactionTorque()` を使用します.

```js
// ジョイントに関連づけられている力を取得する
var force = joint.GetReactionForce(1.0f); // 時間あたりの力
// ジョイントに関連づけられているトルクを取得する
var torque = joint.GetReactionTorque(1.0f); // 時間あたりのトルク
```

- [外部のサンプル](https://phaser.io/examples/v2/box2d/weld-joint)

### Revolute Joint
2つの物体をある1つの点を中心にして回転できるように結びつけるジョイント

Revolute Joint の回転角度を制限するには, `b2RevoluteJointDef` クラスの `enableLimit` プロパティを
`true` に設定します.
また, ラジアン単位で `upperAngle` プロパティに回転角度の上限を, `lowerAngle` プロパティに回転角度の下限を指定します.

```js
// 2つの物体をお互いに回転できるように結びつける
var jd = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
// アンカーポイントを設定する
var anchor = new Box2D.Common.Math.b2Vec2(120, 120);
// RevoluteJoint を定義する
jd.Initialize(body1, body2, anchor);
// 角度の設定を有効にする
jd.enableLimit = true;
// 回転できる角度を設定する
jd.upperAngle = 1.5707964; // 上限の角度
jd.lowerAngle = -1.5707964; // 下限の角度
// RevoluteJoint を作成する
world.CreateJoint(jd);
```

また, 現在の角度, ジョイントに働いているトルク, 回転速度を取得することができます.

```js
// 2つの物体の現在の角度を取得する
var angle = revoluteJoint.GetJointAngle();
// ジョイントに設定されているモーターのトルクを取得
var turque = revoluteJoint.GetMotorToruque();
// 時間あたりのジョイントに働く反作用のトルクを取得
var reactionTorque = revoluteJoint.GetReactionTorque(1.0);
// ジョイントの回転速度を取得する
var speed = revoluteJoint.GetJointSpeed();
// ジョイントに設定されているモーターの回転速度を取得する
var motorSpeed = revoluteJoint.GetMotorSpeed();
```
- [外部のサンプル](https://phaser.io/examples/v2/box2d/revolute-joint)

### Distance Joint
決められた長さを持った棒のようなジョイントで, 2つの物体をその棒で結びつけます.

より正確には, Distance Joint は棒ではなく, 一定の減衰率と共振周波数を持ったバネをシミュレートするジョイントです.

```js
// 2つの物体を一定の距離になるように結びつける
var jd = new Box2D.Dynamics.Joints.g2DistanceJointDef();
// 2つのアンカーポイントを設定する
var anchor1 = new Box2D.Common.Math.b2Vec2(100, 100);
var anchor2 = new Box2D.Common.Math.b2Vec2(200, 200);
// DistanceJoint の設定を初期化する
jd.Initialize(body1, body2, anchor1, anchor2);
// DistanceJoint の共振周波数を設定する
jd.frequencyHz = 10.0f;
// DistanceJoint の減衰率を設定する
jd.dampingRatio = 0.5;
// DistanceJoint を作成する
world.CreateJoint(jd);
```

- [外部のサンプル](https://phaser.io/examples/v2/box2d/distance-joint)

### Friction Joint
2つの物体が互いに移動する際に働く力に対して上限を設定します.

```js
// 2つの物体を互いに移動するとき摩擦が働くように結びつける
var jd = new Box2D.Dynamics.Joints.b2FrictionJointDef();
// アンカーポイントを設定する
var anchor = new Box2D.Common.Math.b2Vec2(100, 100);
// FrictionJointの設定を初期化する
jd.Initialize(body1, body2, anchor);
// 受け入れる最大の力を設定する
jd.maxForce = 10.0;
// 受け入れる最大のトルクを設定する
jd.maxTorque = 10.0;
// FrictionJoint を作成する
world.CreateJoint(jd);
```

- [外部のサンプル](https://phaser.io/examples/v2/box2d/friction-joints)

### Prismatic Joint
2つの物体が互いにある軸線上でのみ動作できるように結びつける.

```js
// 2つの物体をピストンのように動くよう結びつける
var jd = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
// アンカーポイントを設定する
var anchor = new Box2D.Common.Math.b2Vec2(100, 100);
// ピストンの軸を設定する
var axis = new Box2D.Common.Math.b2Vec2(250, 250);
axis.Normalize();
// PrismaticJoint の設定を初期化する
jd.Initialize(body1, body2, anchor, axis);
// 可動範囲の制限を有効にする
jd.enableLimit = true;
// 可動範囲の上限を設定する
jd.upperTranslation = 200.0;
// 可動範囲の下限を設定する
jd.lowerTranslation = 50.0;
// PrismaticJointを作成する
world.CreateJoint(jd);
```

- [Phaser - Box2d - Prismatic Joint](https://phaser.io/examples/v2/box2d/prismatic-joint)

### Pulley Joint
2つの物体が互いに滑車でつながれたように結びつけます.<br>
結びつけられた2つの物体は, 片方が下がれば, もう片方は上がる動作をします.

```js
// 2つの物体を滑車でつながれたように動かす
var jd = new Box2D.Dynamics.Joints.b2PulleyJointDef();
// アンカーポイントを設定する
var anchor1 = new Box2D.Common.Math.b2Vec2(100, 150);
var anchor2 = new Box2D.Common.Math.b2Vec2(200, 150);
// 滑車のロープをかける場所を設定する
var groundAnchor1 = new Box2D.Common.Math.b2Vec2(100, 300);
var groundAnchor2 = new Box2D.Common.Math.b2Vec2(200, 300);
// 滑車の比率を 2.0 にして PulleyJoint の設定を初期化する
jd.Initialize(body1, body2, groundAnchor1, groundAnchor2, anchor1, anchor2, 2.0f);
// PulleyJointを作成する
world.CreateJoint(jd);
```

- [Phaser - Box2d - Pulley Joint](https://phaser.io/examples/v2/box2d/pulley-joint)

### LineJoint
Prismatic Joint と Revolute Joint を組み合わせたジョイントで,
軸線上で移動できるように制限されたアンカーポイントに対して, さらにその周りを回転できるように物体を結びつけます.

```js
// 2つの物体をサスペンションのように働くよう結びつける
var jd = new Box2D.Dynamics.Joints.b2LineJointDef();
// 移動できる軸線を設定する
var axis = new Box2D.Common.Math.b2Vec2(0,0f, -1.0);
// アンカーポイントを設定する
var anchor = new Box2D.Common.Math.b2Vec2(200, 150);
// LineJoint の設定を初期化する
jd.Initialize(body1, body2, anchor, axis);
// 移動できる軸線上の距離を設定する
jd.lowerTranslation = -100;
jd.upperTranslation = 100;
// 軸線上の移動制限を有効にする
jd.enableLimit = true;
// LineJoint を作成する
world.CreateJoint(jd);
```

### Mouse Joint
特殊なジョイントで, ユーザーがマウスカーソルを使って物体を引っ張る動作を実現するためにあります.

```js
var md = new b2MouseJointDef();
md.bodyA = world.GetGroundBody();
md.bodyB = body;
md.target.Set(mouseX, mouseY);
md.collideConnected = true;
md.maxForce = 300.0 * body.GetMass();
mouseJoint = world.CreateJoint(md);

// 省略...

// Mouse Joint のターゲットとなる座標を設定する
mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
// シミュレーションのステップごとに現在のマウスカーソル位置を更新する
```

- [box2dweb - demo.html](https://github.com/hecht-software/box2dweb/blob/master/demo.html)

### Gear Joint
通常, Box2Dのジョイントは物体と物体を結びつけますが, Gear Joint では物体と物体ではなく,
ジョイントとジョイントを結びつけます.<br>
Gear Joint で結びつけることができるジョイントは, Revolute Joint か Prismatic Joint で, 
それぞれどのように組み合わせても構いません.

```js
// 1つ目と2つ目の物体を互いに回転できるように結びつける
var jd1 = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
// アンカーポイントを定義する
var anchor1 = new Box2D.Common.Math.b2Vec2(100, 100);
// RevoluteJoint を定義する
jd1.Initialize(body1, body2, anchor1);
// RevoluteJoint を作成する
var joint1 = world.CreateJoint(jd1);

// 1つ目と3つ目の物体を互いに回転できるように結びつける
var jd2 = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
// アンカーポイントを定義する
var anchor2 = new Box2D.Common.Math.b2Vec2(140, 140);
// RevoluteJoint を定義する
jd2.Initialize(body1, body3, anchor2);
// RevoluteJoint を作成する
var joint2 = world.CreateJoint(jd2);

// 2つのジョイントを連動するよう結びつける
var jd3 = new Box2D.Dynamics.Joints.b2GearJointDef();
// 2つのジョイントを設定する
jd3.joint1 = joint1;
jd3.joint2 = joint2;
// 2つのジョイントのレートを設定する
jd3.ratio = -1.0f;
// GearJoint を作成する
world.CreateJoint(jd3);
```

- [Rack and pinion](https://en.wikipedia.org/wiki/Rack_and_pinion)

#### シミュレーションの誤差について
ジョイントの動作に関するシミュレーションは, 物体の移動などのシミュレーションの後に行われます.
そのため, Weld Joint で固定しても, 計算精度の限界から, 一瞬だけ2つの物体が離れてしまうように見える場合があります.
厳密に固定したい場合は, 物体と物体を Weld Joint で結びつけるのではなく, 複数のフィクスチャーからなるただ1つの物体を作成します.

#### ジョイントに働く力について
`GetReactionForce()` と `GetReactionTorque()` は, Weld Joint に限らず, すべてのジョイントで使用することができます.
ある程度以上の力が働いた際にジョイントを削除するようなコードを記述しておけば, ある程度以上の力で切れる鎖や,
重い荷物で崩壊する橋などを作成することができます.



- [Phaser - Box2d - Gear Joints](https://phaser.io/examples/v2/box2d/gear-joints)
