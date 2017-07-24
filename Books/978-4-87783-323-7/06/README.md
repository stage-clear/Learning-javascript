# ライティング
## 点光源
### 点光源とは
全方位に光を発することのできる光源です.

1. 光源の光源色 (r, g, b)
2. 光源の光強度 (intensity)
3. 光源からの光到達距離 (distance)
4. 光源からの距離による減衰指数 (decay)
5. 光源の位置座標 (x, y, z)

```js
var pointLight = new THREE.PointLight(color, intensity, distance, decay)
```

```js
// 光源初期化関数
var pointLight
var lighthelper
function initLight() {
  // 点光源オブジェクトの生成
  pointLight = new THRE.PointLight(0xffffff, 1)
  // 点光源オブジェクトの位置の設定
  pointLight.position.set(0, 0, 10)
  // 点光源オブジェクトのシーンへの追加
  scene.add(pointLight)
  // 点光源可視化オブジェクトの生成
  lighthelper = new THREE.PointLightHelper(pointLight, 5)
  // 点光源可視化オブジェクトのシーンへの追加
  scene.add(lighthelper)
}
```

### 点光源とポリゴン数
光源の位置座標が頂点座標に近いほど明るくなり, 頂点間は線形補間されるため,
上記のような実行結果（対角線上に不自然な明るい線が描画される）となるわけです.<br>
より自然な描画を行うためにはポリゴン数を増やす必要があります.

```js
// 形状オブジェクトの宣言と生成
var geometry = new THREE.PlaneGeometry(100, 100, 20, 20)
```

### PointLight クラス
- [three.js docs - __PointLight__](https://threejs.org/docs/#api/lights/PointLight)

```js
var pointLight =  new THREE.PointLight(color:hex, intensity:float, distance:float, dacay:float)
```

### PointLightHelper クラス
- [three.js docs - __PointLightHelper__](https://threejs.org/docs/#api/helpers/PointLightHelper)

```js
var lighthelper = new THREE.PointLightHelper(light:PointLight, shapeSize:float)
```

### 点光源の移動サンプル
- PointLight_animation.html

## スポットライト光源
### スポットライト光源とは
3次元空間中の1点を中心に光を当てる光源です.

1. 光源の光源色 (r, g, b)
2. 光源の光強度 (intensity)
3. 光源からの光到達距離 (distance)
4. スポットライトのカットオフ角度 (angle)
5. 光源軸からの距離による減衰係数 (penumbra)
6. 光源からの距離による減衰指数 (decay)
7. 光源の位置座標 (x, y, z)
8. 光源の中心となる3次元オブジェクト

```js
// スポットライトオブジェクトの生成
spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay)
```

```js
// 光源初期化関数
var spotLight
var lighthelper

function initLight() {
  // スポットライトオブジェクトの生成
  spotLight = new THREE.SpotLight(0xffffff, 1.0, 0, Math.PI / 6, 1, 0)
  // スポットライトオブジェクトの位置の設定
  spotLight.position.set(0, 0, 60)
  // スポットライトオブジェクトのシーンへの追加
  scene.add(spotLight)
  // スポットライト光源可視化オブジェクトの生成
  lighthelper = new THREE.SpotLightHelper(spotLight, 10)
  // スポットライト光源可視化オブジェクトのシーンへの追加
  scene.add(lightHelper)
}
```

### スポットライト光源のパラメータ
スポットライト光源を利用する際に注意が必要なのは, penumbra が 0 に近い場合, 
ライティング領域とその外の境界付近における描画が不自然になりうる点です.<br>
`penumbra = 0` では境界領域がギザギザになります.<br>
平面オブジェクトの分割数を 10x10, 100x100, 500x500 と, 分割数を大きくするに従って,
境界領域における描画が意図通りになっていきます.

ライティングの境界を際立たせるようなことを行わないのであれば, 自然な減衰が得られる
`penumbra=1.0`をataeteoite, カットオフ角度 (angle) で調整するのが良い方法と考えられます.

### SpotLight クラス
- [three.js docs - __SpotLight__](https://threejs.org/docs/#api/lights/SpotLight)

```js
var spotLight = new THREE.SpotLight(color:hex, intensity:float, distance:float, angle:float, penumbra:float, decay:float)
```

## SpotLightHelper クラス
- [three.js docs - __SpotLightHelper__](https://threejs.org/docs/#api/helpers/SpotLightHelper)

```js
var lighthelper = new THREE.SpotLightHelper(light:SpotLight)
```

### スポットライト光源のターゲットの設定

半径1の球オブジェクトをダミーオブジェクトとして生成します.
```js
// 形状オブジェクトの宣言と生成
var geometry = new THREE.SphereGeometry(1)
// 材質オブジェクトの宣言と生成
var material = new THREE.MeshBasicMaterial({opacity: 0.0, transparent: true}) // <-
// 球オブジェクト
sphere = new THREE.Mesh(geometry, material)
// 球オブジェクトのシーンへの追加
scene.add(sphere)
// スポットライト光源のターゲットオブジェクトの指定
spotLight.target = sphere // <-
```

球オブジェクトを完全透明化して, 位置座標をスポットライトの中心としたい場所に配置するだけです.

## 環境光源
### 環境光源とは
光源から直接光が当たっているか否か関わらず, 3次元オブジェクトを均等に照らす光です.

1. 光源の光源色 (r, g, b)
2. 光源の光強度 (intensity)

```js
ambientLight = new THREE.AmbientLight(color, inteisity)
```

```js
// 光源初期化関数
var directionaLight
var ambientLight
function initLight() {
  // 平行光源オブジェクトの生成
  directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
  // 平行光源オブジェクトの位置の設定
  directionalLight.position.set(0, 0, 100)
  // 平行光源オブジェクトのシーンへの追加
  scene.add(directionalLight)
  
  // 環境光源オブジェクトの生成
  ambientLight = new THREE.AmbientLight(0x444444)
  // 環境光源オブジェクトのシーンへの追加
  scene.add(ambientLight)
}
```

##### 環境光の物理学的意味
太陽からの直射日光が建物によって遮られて到達しない領域を考えます.
その領域が太陽光に直接照らされていなくても真っ暗にならないのは, 
地球上に存在するあまたの散乱光で照らされているからです.

### 環境光源のパラメータ
##### 環境光源による描画色の決定法

- Rの値: (光源色のR値) x (材質色のR値)
- Gの値: (光源色のG値) x (材質色のG値)
- Bの値: (光源色のB値) x (愛室色のB値)

### AmbientLight クラス

```js
var ambientLight = new THREE.AmbientLight(color:hex, intensity:float)
```

## 半球光源オブジェクト
### 半球光源とは
光源位置から原点に向かう __空色__ (skyColor) と, 原点から光源位置に向かう __地面色__ (groundColor) の
平行光源で照らす, three.js で用意されている特殊な光源です.

1. 光源の空色 (r, g, b)
2. 光源の地面色 (r, g, b)
3. 光源の光強度 (intensity)
4. 光源の位置座標 (x, y, z)

```js
var hemiLight = new THREE.HemisphereLight(skyColor, groundColor, intensity)
```

```js
// 光源初期化関数
var hemiLight 
var lighthelper 
function initLight() {
  // 半球光源オブジェクトの生成
  hemiLight = new THREE.HemisphereLight(0xffffff, 0x0000ff, 1.0)
  // 半球光源オブジェクトの位置の設定
  hemiLight.position.set(0, 0, 100)
  // 半球光源オブジェクトのシーンへの追加
  scene.add(hemiLight)
  // 半球光源可視化オブジェクトの生成
  lighthelper - new THREE.hemisphereLightHelper(hemilight, 10)
  // 半球光源可視化オブジェクトのシーンへの追加
  scene.add(lighthelper)
}
```

### hemisphereLight クラス
