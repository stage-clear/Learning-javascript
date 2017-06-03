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
```

