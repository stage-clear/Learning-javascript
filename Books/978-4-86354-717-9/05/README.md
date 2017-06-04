# 物体の衝突
## Box2Dにおける衝突の概要
### 衝突検出とは
Box2Dでは, 物体と物体の衝突はシミュレーションのステップごとで評価され,
もし, 物体と物体が衝突していれば, その結果を取得することができます.

### この章で学ぶこと
- Box2Dにおける物体の相互作用と衝突について学びます
- 衝突判定を組み込んだ物理シミュレーションを実行します
- マウスによって物体を操作する単純な物理ゲームを作成します

## 仮想世界を作成する
### 仮想世界の作成
- [chapt5.html](../examples/chapt5.html)

### 衝突判定を行う
床とボールが接触したときにメッセージを表示するようにします.
Box2Dの衝突検出は `b2ContactListner` クラスを仮想世界に対して設定することで利用できます.

```js
function init() {
  // ...
  
  // 衝突検出のリスナーを登録する
  var listener = new b2ContactListener;
  listener.BeginContact = function(contact) {
    // 衝突が始まった
  }
  listener.endContact = function(contact) {
    // 衝突が終わった
  }
  // 仮想世界に対してリスナーを登録する
  world.SetContactListener(listener);
}
```

コールバック関数に渡される引数は, 衝突を表す `b2Contact` クラスで, 
1つの衝突点には必ず2つのフィクスチャーが介在しています.
衝突した2つのフィクスチャーを表す `b2Fixture` クラスは, `GetFixtureA()` `GetFixtureB()` から取得することができます.
さらにフィクスチャーから物体を表す `b2Body` クラスを取得するには `GetBody()` を呼び出します.

```js
  var listener = new b2ContactListener;
  listener.BeginContact = function(contact) {
    // 床とボールが衝突したら
    if ((contact.GetFixtureA().GetBody() === ball &&
      contact.GetFixtureB().GetBody() === floor) ||
      (contact.GetFixtureA().GetBody() === floor &&
      contact.GetFixtureB().GetBody() === ball)) {
      // メッセージを表示する
      alert('Clear');
    }
  }
  
  listener.EndContact = function(contact) {
    // 衝突が終わった
  }

  // 仮想世界に対してリスナーを登録する
  world.SetContactListener(listener);
```

### クリックされた座標上にある物体を取得する
任意のタイミングである場所に存在している物体を取得したい場合は `b2AABB` クラスと
仮想世界の `QueryAABB()` を使用して, 特定の範囲内に存在しているフィクスチャーを列挙することができます.

`b2AABB` クラスは, Box2Dの仮想世界内の領域を指定するためのクラスで,
2つの座標で定義される矩形を領域として定義します.

```js
var aabb = new b2AABB();
aabb.lowerBound.Set(10, 10);
aabb.upperBound.Set(20, 20);
```

さらに, 仮想世界の `QueryAABB()` では, 指定された領域の中に存在しているすべてのフィクスチャーを列挙することができます.

```js
world.QueryAABB(function(fixture) {
  // フィクスチャーを取得する
  return true; // 列挙を続ける
}, aabb);
```

`QueryAABB()` への引数は, フィクスチャーを受け取るコールバック関数と領域を指定する `b2AABB` クラスです.

フィクスチャーは1つひとつコールバック関数を呼び出しながら渡されてますが,
コールバック関数が `false` を返すと `QueryAABB()` はフィクスチャーの列挙を停止します.
そのため, ある領域内に目的の物体が存在しているのかをチェックしたい場合には,
すべてのフィクスチャーを列挙するのではなく,その物体が見つかった時に列挙を中断することで, 
CPUパフォーマンスを改善できます.

```js
// 座標上にある物体を列挙する
function getBodyAtPosition(objX, objY) {
  // 座標をベクトルにする
  var mousePVec = new b2Vec2(objX, objY);
  // b2AABB を作成する
  aabb.lowerBound.Set(objX - 0.001, objY - 0.001);
  aabb.upperBound.Set(objX + 0.001, objY + 0.001);
  var selectedBOdy = null;
  
  // フィクスチャーを列挙する
  world.QueryAABB(function(fixture) {
    // フィクスチャーの上に正しく座標があるかチェックする
    if (fixture.getShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
      // 配列に物体を入れていく
      if (selectedBody === null) {
        selectedBody = new Array();
      }
      var found = false;
      // フィクスチャーから物体を取得する
      var body = fixture.GetBody();
      // すでに保存されている物体は追加しない
      for (var i = 0; i < selectedBody.length; i++) {
        if (selectedBody[i] === body) {
          found = true;
          break;
        }
        if (!found) {
          selectedBody.push(body);
        }
      }
    }
    
    return true;
  }, aabb);
  
  // 列挙の結果, 出来上がった配列を返す
  return selectedBody;
}
```

## 衝突判定を行うゲームを作成する
### 箱を作成する

### 障害物を作成する
密度と摩擦係数を大きめに設定した矩形を作成します.

### クリックイベントを作成する

### センサーを作成する
センサー(Sensor) は, Box2Dにおける特殊なフィクスチャーで, 物体として衝突は起こしませんが,
衝突判定の対象にはなるものです.  
つまり, センサーはその他の物体がすり抜けるようなフィクスチャーだと言えます.  
センサーは, 物体の通過を検出したり, 物体の当たり判定を実際の物体の大きさよりも大きいものにしたりする際に使用されます.

センサーを作成するには, `CreateFixture()` で作成したフィクスチャーの `SetSensor()` を呼び出します.  
センサーは他の物体をすり抜けるので, 密度や反発係数などの物性を指定する必要はありません.

```js
function init() {
  // ...
  
  // センサーを作成する
  bodyDef.type = b2Body.b2_staticBody;
  fixDef.shape = new b2PolygonShape;
  var vertices = new Array();
  vertices[0] = new b2Vec2(-1.4, 2);
  vertices[1] = new b2Vec2(-1.4, -2);
  vertices[2] = new b2Vec2(1.4, 0);
  fixDef.shape.SetAsArray(vertices, 3);
  bodyDef.position.Set(28, 23, 5);
  bodyDef.angle = 0;
  var sensorFixture = world.CreateBody(bodyDef).CreateFixture(fixDef);
  sensorFixture.SetSensor(true);
}
```

ボールがセンサーを通過した際医は, 右向きの大きな力が加わるようにしてみます.

```js
var listener = new b2ContactListener;
listener.BeginContact = function(contact) {
  // ...
  
  // センサーの通過だったら
  if ((contact.GetFixtureA().GetBody() === ball &&
       contact.GetFixtureB() === sensorFixture) ||
      (contact.GetFixtureA() === sensorFixture &&
       contact.GetFixtureB().GetBody() === ball)) {
    ball.ApplyForce(new b2Vec2(50000, 0));
  }
}
```

```error
Box2D.js:4606 Uncaught TypeError: Cannot read property 'x' of undefined
```

```js
ball.ApplyForce(new b2Vec2(50000, 0), ball.GetPosition());
```
## スリープモードについて
### スリープモードとは
__スリープモード__とは, 衝突や重力の影響などのシミュレーションから除外されたモードの物体のことです.
デフォルトでは, 0.5秒間, 衝突に関わらないでいる物体をスリープモードに変更します.
これにより, 物理演算に必要となる計算量を節約することができます.

長い時間, 静止していた物体をシミュレーションの対象に戻すには, 引数に `true` を指定して,
物体を表す `b2Body` クラスの `SetAwake()` を呼び出します.  
また, 物体を強制的にスリープモードに移行させるには, 引数に `false` を指定して `SetAwake()` を呼び出します.

```js
// スリープモードから回復する
body.SetAwake(true);
```

### 物体をスリープモードに移行しないようにする
物体をスリープ状態に遷移させないようにするには, 引数を `false` にして,
物体を表す `b2Body` クラスの `SetSleepingAllowed()` を呼び出します.

```js
// スリープモードに移行しないようにする
body.SetSleepingAllowed(false);
```

## 衝突のフィルターについて
### 衝突できる物体をグループごとに分ける
衝突できる物体と物体は, フィルターによって管理されます.
フィルターは `b2FilterData` クラスで定義されます.<br>
作成したフィルターをフィクスチャーに設定するには, フィクスチャーを表す `b2Fixture` クラスの `SetFilterData()` を呼び出します.<br>
衝突できる物体のグループは, フィルター内の `categoryBits` のプロパティのフラグによって管理されます.
物体は, フィルターとなる `maskBits` プロパティと, 論理ANDを取って有効なビットが含まれている物体のみと衝突できます.

- [chapt5-2.html](../examples/chapt5-2.html)


