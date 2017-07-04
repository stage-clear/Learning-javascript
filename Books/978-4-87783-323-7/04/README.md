# 3次元オブジェクトの制御
## さまざまな数学クラス
### Vector2 クラス
- [three.js docs - __Vector2__](https://threejs.org/docs/#api/math/Vector2)

```js
var vector = new THREE.Vector2(x, y)
```

### Vector3 クラス
- [threes.js docs - __Vector3__](https://threejs.org/docs/#api/math/Vector3)

```js
var vector = new THREE.Vector3(x, y, z)
```

### Vector4 クラス
- [three.js docs - __Vector4__](https://threejs.org/docs/#api/math/Vector4)

```js
var vector = new THREE.Vector4(x, y, z, w)
```

### Matrix3 クラス
- [three.js docs - __Matrix3__](https://threejs.org/docs/#api/math/Matrix3)

```js
var matrix = new THREE.Matrix3(
  n11, n12, n13,
  n21, n22, n23,
  n31, n32, n33,
)
```

### Matrix4 クラス
- [thress.js docs - __Matrix4__](https://threejs.org/docs/#api/math/Matrix4)

```js
var matrix = new THREE.Matrix4(
  n11, n12, n13, n14,
  n21, n22, n23, n24,
  n31, n32, n33, n34,
  n41, n42, n43, n44,
)
```

### Quaternion クラス
- [three.js docs - __Quaternion__](https://threejs.org/docs/#api/math/Quaternion)

```js
var quaternion = new THREE.Quaternion(x, y, z, w)
```

### Euler クラス
- [three.js docs - __Euler__](https://threejs.org/docs/#api/math/Euler)

```js
var euler = new THREE.Euler(x, y, z, order)
```

### Box2 クラス
- [three.js docs - __Box2__](https://threejs.org/docs/#api/math/Box2)

```js
var box2 = new THREE.Box2(min:Vector2, max:Vector2)
```

### Box3 クラス
- [three.js docs - __Box3__](https://threejs.org/docs/#api/math/Box3)

```js
var box3 = new THREE.Box3(min:Vector3, max:Vector3)
```

### Line3 クラス
- [three.js docs - __Line3__](https://threejs.org/docs/#api/math/Line3)

```js
var line3 = new THREE.Line3(start:Vector3, end:Vector3)
```

### Triangle クラス
- [three.js docs - __Triangle__](https://threejs.org/docs/#api/math/Triangle)

```js
var triangle = new THREE.Triangle(a:Vector3, b:Vector3, c:Vector3)
```

### Plane クラス
- [three.js docs - __Plane__](https://threejs.org/docs/#api/math/Plane)

2次元空間中の英面は ax + by + cz + d = 0 で表すことができるため,
4つのパラメータ a, b, c, d で特徴づけられます.
平面の規格化された法線ベクトルは先の方程式のパラメータ a, b, c を用いて
n = 1 √ a<sup>2</sup> + b<sup>2</sup> + c<sup>2<sup>(a,b,c) で表されるため,
平面は法線ベクトルと定数dで表現できます.

```js
var plane = new THREE.Plane(normal:Vector3, constnt:float)
```

### Sphere クラス
- [three.js docs - __Sphere__](https://threejs.org/docs/#api/math/Sphere)

```js
var sphere = new THREE.Sphere(center:Vector3, radius:float)
```

### Spherical クラス
- [three.js docs - __Spherical__](https://threejs.org/docs/#api/math/Spherical)

2次元空間中の極座標を数学的に取り扱うオブジェクトを生成するクラスです
極座標は半径, 仰角, 方位角で特徴づけられます.

```js
var spherical = new THREE.Spherical(radius:float, phi:float, theta:float)
```

### Math ユーティリティ
- [three.js docs - __Math__](https://threejs.org/docs/#api/math/Math)

```js
Math.関数名
```

## 移動・回転・拡大
### Object3D クラス
- [three.js docs - __Object3D__](https://threejs.org/docs/#api/core/Object3D)

```js
var object = new THREE.Object3D()
```

### 3次元オブジェクトのグループ化（Group クラス）
- [three.js docs - __Group__](https://threejs.org/docs/#api/objects/Group)

```js
var axis
var arrows
function initObject() {
  // ... 軸オブジェクトを省略
  // 矢印オブジェクトをグループ化するオブジェクトの生成
  arrows = new THREE.Group()
  // x軸方向矢印オブジェクトの生成と追加
  arrows.add(
    new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0), // 方向
      new THREE.Vector3(0, 0, 0), // 原点
      60,                         // 長さ
      0xff0000,                   // 色
      10,                         // 矢印頭の長さ
      5,                          // 矢印頭の大きさ
    )
  )

  // y軸方向矢印オブジェクトの生成と追加
  arrows.add(
    new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0), // 方向
      new THREE.Vector3(0, 0, 0), // 原点
      60,                         // 長さ
      0x00ff00,                   // 色
      10,                         // 矢印頭の長さ
      5,                          // 矢印頭の大きさ
    )
  )
  
  // z軸
  arrows.add(
    new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1), // 方向
      new THREE.Vector3(0, 0, 0), // 原点
      60,                         // 長さ
      0x0000ff,                   // 色
      10,                         // 矢印頭の長さ
      5,                          // 矢印頭の大きさ
    )
  )
  
  // 3軸矢印オブジェクトのシーンへの追加
  scene.add(arrows)
}
```

### 位置座標の指定
##### 位置座標の指定

1. Vector3 クラスの set メソッドを利用

```js
arrows.position.set(x, y, z)
```

2. Vector3 クラスの setX メソッド, setY メソッド, setZ メソッドを利用

```js
arrows.position.setX(x)
arrows.position.setY(y)
arrows.position.setZ(z)
```

3. Vector3 クラス x, y, z プロパティに直接代入

```js
arrows.position.x = x
arrows.position.y = y
arrows.position.z = z
```

```js
var axis
var arrows

function initObject() {
  // ...
  // ...
  // 3軸オブジェクトの位置座標を設定
  arrows.position.set(25, 20, 15)
}
```

### オイラー角による回転角の設定

##### オイラー角の定義
回転におる座標変換は, もとの座標系における位置座標ベクトル（x, y, z）に対して,
各軸の回転に対する回転行列を順番に行列積を行うことで, __新しい座標における位置座標ベクトル（x', y', z'）__ を得ることができます.
行列の演算が演算の順番によって結果が異なる（__非可換__）ことから, x軸y軸z軸の回転の順番によって結果が異なりmasu.

##### three.js におけるオイラー角による回転角の指定方法

```js
arrows.rotation = new THREE.Vector3(α:回転角度, β:回転角度, γ:回転角度)
```
