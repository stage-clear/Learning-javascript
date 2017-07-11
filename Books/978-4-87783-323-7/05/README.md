# シェーディング
## シェーディングの基本
### シェーディングの必要性
例えば, 赤一色の直方体が3次元空間中に存在することを考えたtoki,
直方体の各面は視点と光源, 面の向きによってカメラが飛び込んでくる色が異なります.
このようなその立体感を出すための手法が __シェーディング（陰影付け）__ と呼ばれる作業となります.

シェーディングを実装するまでに必要な要素は次の3つです.
1. 光源の設定 → 光源オブジェクトの準備
2. 反射材室の設定 → 反射材質オブジェクトの準備
3. 法線の設定 → 法線ベクトルの計算

### 光源の設定
OpenGL にて3次元空間を照らす光源には, __点光源__ と __スポットライト光源__ の2種類があります.
さらに, 点光源の特殊な例として __平行光源（無限遠光源）__ を設定することができます.

##### 光源の種類
- DirectionalLight 平行光源
- PointLight 点光源
- SpotLight スポットライト光源
- AmbientLight 環境光源

### 反射材室の設定
光源に対して, オブジェクト表面の質感を決めるのが反射材質です.<br>
反射材質オブジェクトに反射材質を指定することで, シェーディングを実装することができます.
反射材質には, マット紙のようなザラつきのある __ランバート反射材質__ と, コート紙のような光沢のある __フォン反射材質__ ,
ファン反射材質を拡張した __標準反射材質__ が用意されています.

- MeshLambertMaterial ランバート反射材質
- MeshPhongMaterial フォン反射材質
- MeshStandardMaterial 標準反射材質

### 法線の設定
シェーディングは, 光源からの光線ベクトルやオブジェクトの面の法線ベクトルを利用した演算を行う必要があります.
WebGLの場合, 行列演算を理解し自前で実装する必要がありますが, three.js では, その作業をすべて自前で実行してくれるメソッドが
用意されているため, 各面に対して非常に簡単に法線を設定することができます.

## 平行光源オブジェクトの準備
### 平行光源
平行光源とは無限の彼方にある点光源から点射される光を生成する光源で, 無限遠光源とも呼ばれます.
平行光源を利用するメリットは, シェーディングのための演算が簡単なので, 処理が軽いことです.

平行光源を特徴付けるパラメータは, 次の通りです.
1. 光源の光源色 - x, y, z
2. 光源の光強度 - intensity
3. 光源の位置座標 - x, y, z
4. 光線の中心とするオブジェクト - target

##### 高原の設定手順
1. 平行光源オブジェクトをグローバル変数として宣言
2. 平行光源の設定
3. 平行光線ベクトルの設定
4. 光源をシーンに追加

```js
// 光源初期化関数の定義
var directionalLight // 平行光源オブジェクト
function initLight() {
  // 平行光源オブジェクトの生成
  directionalLight = new THREE.DirectionalLight(oxffffff, 1.0)
  // 平行光源オブジェクトの光源位置座標の設定
  directionalLight.position.set(50, 20, 100)
  // 平行光源オブジェクトのシーンへの追加
  scene.add(directionalLight)
}
```

##### 白色光とは
__光の三原則__ と呼ばれる赤, 緑, 青をすべて混ぜると白色になります.
物理学的には, そもそも色という概念はありません.

この3色が最大値の時の色を白色と読んでいます.
そして我々の認識できる電磁波の波長領域は, 可視領域と呼ばれています.

##### 平行光源オブジェクトを生成するコンストラクタ

```js
directionalLight = new THREE.DirectionalLight(hex, intensity)
```

#### 平行光源の光源の位置座標の指定

```js
directionalLight.position.set(x, y, z)

// or
directionalLight.position.x = x
directionalLight.position.y = y
directionalLight.position.z = z
```

##### three.js スタート関数への追記
```js
function threeStart() {
  initThree()
  initCamera()
  initLight()
  initObject()
  draw()
}
```


## Light クラス
- [three.js docs - __Light__](https://threejs.org/docs/#api/lights/Light)

```js
var light = new THREE.Light(color:hex, intensity:float)
```

### DirectionalLight クラス
- [three.js docs - __DiretionalLight__](https://threejs.org/docs/#api/lights/DirectionalLight)

```js
var light = new THREE.DirectionalLight(hex:hex, intensity:float)
```

### DirectionalLightHelper クラス
- [three.js docs - __DirectionalLightHelper__](https://threejs.org/docs/#api/helpers/DirectionalLightHelper)

```js
var lighthelper = new THREE.DirectionalLightHelper(light:Light, size:float)
```

```js
// 平行光源可視化オブジェクトの生成
lighthelper = new THREE.DirectionalLightHelper(directionalLight, 10)
```

## 反射材質オブジェクトの準備
光源に対する3次元オブジェクトの表面の見え方（質感など）を決定する材質オブジェクトの準備を行います.

three.js ではシェーディングの対象となる材質として, ランバート反射材質, フォン反射材質, 標準反射材質の3種類が用意されています

### 反射材質
