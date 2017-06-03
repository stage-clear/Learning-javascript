# 物体の形状とフィクスチャー
## 形状とフィクスチャーの概要
### フィクスチャーとは
Box2Dでは物体の形状を「フィクスチャー」という単位で扱います.
より正確には, 物体の形状と, 摩擦係数や密度などの物性をひとまとめにした単位として
「フィクスチャー」が用意されており, Box2Dにおける「物体」は, 複数の「フィクスチャー」を組み合わせて作成されます.

### この章で学ぶこと
- Box2Dにおける物体の形状とフィクスチャーの関係を学びます
- 複雑な形状をした物体を作成して物理シミュレーションを実行します
- 物体の異なる部分に対して, 異なる物性を設定する方法を学びます

## 仮想世界を作成する
### 仮想世界の作成
- [chapt4.html](../examples/chapt4.html)

### 物体の作成
Box2Dの物理シミュレーションが物体の形状を正しく扱うことを確認できるプログラムを作成します.
まずは, 最も単純な円を20個, ランダムな座標に作成して, その挙動を観察してみます.

```js
function init() {
  // ...
  
  for (var i = 0; i < 20; i++) {
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2CircleShape(2.0);
    fixDef.density = 0.8;
    fixDef.friction = 0.4;
    fixDef.restitution = 0.5;
    bodyDef.position.Set(
      15 + parseInt(Math.random() * 20, 10),
      15 + parseInt(Math.random() * 20, 10),
    );
    world.CreateBody(bodyDef).CreateFixture(fixDef);
  }
}
```

### 物体の形状の変更

```js
for (var i = 0; i < 20; i++) {
  bodyDef.type = b2Body.b2_dynamicBody;
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(2, 2);
  fixDef.density = 0.8;
  fixDef.friction = 0.4;
  fixDef.restitution = 0.5;
  bodyDef.position.Set(
    15 + parseInt(Math.random() * 20, 10),
    15 + parseInt(Math.random() * 20, 10),
  );
  world.CreateBody(bodyDef).CreateFixture(fixDef);
}
```

## フィクスチャーを作成する
### フィクスチャーの種類

- フィクスチャーの形状
  - ポリゴン `b2PolygonShape`
    - 矩形として設定 `SetAsBox()`
    - ポリゴンとして設定 `SetAsArray()`
  - 円 `b2CircleShape`
    - 半径を指定して作成
  - 線分 `b2EdgeShape`
    - 頂点2つを指定して作成

### ポリゴンとしてフィクスチャーを作成する
フィクスチャーの形状としてポリゴンを使用する場合, 
ポリゴンの各座標は, 物体の中心点を基準に設定します.

作成するポリゴンは, 物体の中心点を含んでいる必要はなく, 
物体の中心点とポリゴンの重心位置も異なっている場合があります.
ただし, ポリゴンは1つあたりの頂点数が6個以下で, かつ凸型をしている必要があります.
凹型をしている物体を作成したい場合は, 複数のフィクスチャーを組み合わせて作成します.

```js
for (var i = 0; i < 20; i++) {
  bodyDef.type = b2Body.b2_dynamicBody;
  fixDef.shape = new b2PolygonShape;
  // 頂点のリストを定義する
  var vertices = new Array();
  // 頂点を設定
  vertices[0] = new b2Vec2(0, -2);
  vertices[1] = new b2Vec2(1.902, -0.618);
  vertices[2] = new b2Vec2(1.176, 1.618);
  vertices[3] = new b2Vec2(-1.176, 1.618);
  vertices[4] = new b2Vec2(-1.902, -0.618);
  // 形状をポリゴンとして設定する
  fixDef.shape.SetAsArray(vertices, 5);
  fixDef.density = 0.8;
  fixDef.friction = 0.4;
  fixDef.restitution = 0.5;
  bodyDef.position.Set(
    15 + parseInt(Math.random() * 20, 10),
    15 + parseInt(Math.random() * 20, 10),
  );
  world.CreateBody(bodyDef).CreateFixture(fixDef);
}
```

### 複数のフィクスチャーからなる物体を作成する

作成する物体は, 簡単に矩形2つを組み合わせた十字架とします.
この十字架は凹型をしているので, ポリゴン1つからは作成することができません.

```js
for (var i = 0; i < 20; i++) {
  bodyDef.type = b2Body.dynamicBody;
  var fixDef1 = new b2FixtureDef;
  var fixDef2 = new b2FixtureDef;
  fixDef1.shape = new b2PolygonShape;
  fixDef1.shape.SetAsBox(0.5, 2);
  fixDef1.density = 0.8;
  fixDef1.friction = 0.4;
  fixDef1.restitution = 0.5;
  fixDef2.shape = new b2PolygonShape;
  fixDef2.shape.SetAsBox(2, 0.5);
  fixDef2.density = 0.8;
  fixDef2.friction = 0.4;
  fixDef2.restitution = 0.5;
  bodyDef.position.Set(
    15 + parseInt(Math.random() * 20, 10),
    15 + parseInt(Math.random() * 20, 10),
  );
  var body = world.CreateBody(bodyDef);
  body.CreateFixture(fixDef1);
  body.CreateFixture(fixDef2);
}
```
