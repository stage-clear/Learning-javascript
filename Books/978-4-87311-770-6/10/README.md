# テクスチャ

- テクスチャの読み込みとメッシュへの適用
- バンプマップと法線マップを使用したメッシュの奥行きや詳細の表現
- ライトマップを使用した擬似シャドウの作成
- 環境マップを使用したマテリアルへの詳細な反射の追加
- スペキュラマップを使用したメッシュの特定の場所への光沢の追加
- メッシュのUVマップの調整とカスタマイズ
- テクスチャの入力としてのcanvas要素とvideo要素

## マテリアルでテクスチャを利用
メッシュの色, 光沢, 凸凹, 反射を定義するために利用できます.

### テクスチャを読み込んでメッシュに適用

```js
function createMesh(geom, imageFile) {
  var textureLoader = new THREE.TextureLoader()
  var texture = textureLoader.load(
    '../assets/textures/general' + imageFile
  )
  var mat = new THREE.MeshPhongMaterial()
  mat.map = texture
  
  var mesh = new THREE.Mesh(geom, mat)
  return mesh
}
```

テクスチャとしてはPNG, GIF, JPEG形式の画像が利用できます.<br>
テクスチャの読み込みは非同期に実行されることに注意しくてください.
もしテクスチャが読み込まれるまで描画をまつのであれば次のようなコードを使用します.

```js
texture = textureLoader.load(
  '../assets/textures/general/' + imageFile, 
  function(texture) {
    renderer.render(scene)  
  })
```

テクスチャとして望めばどのような画像でも使用できますが,
各辺が2の累乗の長さを持つ正方形のテクスチャを使用したときにもっともよい結果が得られます.
（256x256, 512x512, 1024x1024）

テクスチャをどう拡大するかについては, `magFilter` プロパティで設定でき,
どう縮小するかについては `minFilter` プロパティで設定できます.

##### テクスチャの拡大縮小用フィルタ
- `THREE.NearestFilter` - このフィルタはもっとも近くにあるテクセルの色を使用する. 
  拡大時に使用した場合はブロックノイズを生じ, 縮小時に使用するとディテールが大幅に失われる
- `THREE.LinearFilter` - このフィルタはより高度なもので, 4つの近傍のテクセルの色を使用して設定する色を決定する.
  これも縮小時にはディテールが失われるが, 拡大時にはよりスムーズになりブロックノイズも少なくなる

これら基本的な値の他にミップマップが利用できます.
ミップマップとは複数のテクスチャ画像を組み合わせたもので, それぞれが前のテクスチャの半分のサイズになっています.

##### ミップマップ用のフィルタ
- `THREE.NearestMipMapNearestFilter` - 必要な解像度にもっとも近いミップマップを選択し, そのテクスチャに対してニアレストフィルタの原理を適用する
  拡大時はブロックノイズが乗るが, 縮小時は非常に滑らかになる
- `THREE.NearestMipMapLinearFilter` - ミップマップをひとつではなくレベルの近いミップマップ2つ選ぶ.
  それぞれのレベルのミップマップについてニアレストフィルタを適用して中間の値を2つ得て, その2つの値に線形フィルタに渡し, 最終的な値を得る
- `THREE.LinearMipMapNearestFilter` - 必要な解像度にもっとも近いミップマップを選択し, そのテクスチャに対して線形フィルタの原理を適用する
- `THREE.LinearMipMapLinearFIlter` - ミップマップをひとつではなくレベルの近いミップマップを2つ選ぶ.
  それぞれのレベルのミップマップについて線形フィルタを適用して, 中間の値を2つ得る. その2つの値を線形フィルタに渡し, 最終的な値を得る

明示的に指定しなければ, `{magFilter: THREE.LinearFilter}` `{minFilter: THREE.LinearMipMapLinearFilter}` を使用します.

- [three.js docs - __TextureLoader__](https://threejs.org/docs/#api/loaders/TextureLoader)
- [01-basic-texture.html](https://codepen.io/kesuiket/pen/yXgzoQ)

別のフォーマットで記述されたテクスチャを読み込むためのローダーがいくつかあります.

__`THREE.DDLSLoader`__<br>
DirectDraw Surface フォーマットで記述されたテクスチャを読み込むことができます.
これはマイクロソフト社の独自フォーマットでテクスチャを圧縮して保持します

```js
var loader = new THREE.DDSLoader()
var texture = loader.load('../assets/textures/seafloor.dds')
var mat = new THREE.MeshPhongMaterial()
mat.map = texture
```

- [01-basic-texture-dds.html](https://codepen.io/kesuiket/pen/qjRVBR)

内部的にこのローダーは `THREE.CompressedTextureLoader` を使用しています

__`THREE.PVRLoader`__<br>
Power VR は圧縮したテクスチャを保持するまた別の独占ファイルフォーマットです.
Three.js は Power VR3.0 ファイルフォーマットをサポートしていて, このフォーマットで記述された
テクスチャを使用することができます.

```js
var loader = new THREE.PVRLoader()
var texture = loader.load('../assets/textures/seafloor.dds')
var mat = new THREE.MeshPhongMaterial()
mat.map = texture
```

- [01-basic-texture-pvr.html](https://codepen.io/kesuiket/pen/eRgepN) - 

このフォーマットのテクスチャはすべての WebGL 実装でサポートされているわけではないということに注意してください.
そのためこれを使用してテクスチャが表示されなかった場合はコンソールエラーで確認してください.<br>
内部的に `THREE.ComporessedTextureLoader` を使用しています

__`THREE.TGALoader`__<br>
Targa はラスタグラフィックファイルフォーマットで今でも多くの3Dソフトウェアプログラムで使用されています.
`TREE.TGALoader` を使用すると, 3Dモデルでこのフォーマットで記述されたテクスチャを利用できます.

```js
var loader = new THREE.TGALoader()
var texture = loader.load('../assets/texture/crete_color8.tga')
var mat = new THREE.MeshPhongMaterial()
mat.map = texture
```

- [01-basic-texture-tga.html](https://codepen.io/kesuiket/pen/VWPreM)

### バンプマップを使用した皺（しわ）
- [02-bump-map.html](https://codepen.io/kesuiket/pen/OgWONo)

```js
function createMesh(geom, imageFile, bump) {
  var textureLoader = new THREE.TextureLoader()
  var texture = textureLoader.load('../assets/textures/general/' + imageFile)
  geom.compputeVertexNormals()
  
  var bump = textureLoader.load('../assets/textures/general/' + bump)
  mat.bumpMap = bump
  mat.bumpScale = 0.2
  
  var mesh = new THREE.Mesh(geom, mat)
  return mesh
}
```

バンプマップはグレースケール画像ですが, カラー画像を使うこともできます.
その場合はピクセルの明度が凹凸の高さを表します.

### 法線マップを使用した詳細な凹凸と皺
- [03-normal-map.html](https://codepen.io/kesuiket/pen/GErOEX)

```js
function createMesh(geom, imageFile, normal) {
  var textureLoader = new THREE.TextureLoader()
  
  var t = textureLoader.load('../assets/textures/general/' + imageFile)
  var m = textureLoader.load('../assets/textures/general/' + imageFile)
  
  var mat2 = new THREE.MeshPhongMaterial()
  mat2.map = t
  mat2.normalMap = m
  
  var mesh = new THREE.Mesh(geom, mat2)
  return mesh
}
```

法線マップにはその作成がそれほど簡単ではないという問題があります.
法線マップを作成するには Blender や Photoshop のような特殊なツールが必要になります.
これらのツールを使用すると高解像度のレンダリング結果やテクスチャの入力として法線マップを作成できます.

### ライトマップを使用した擬似シャドウ
- [04-light-map.html](https://codepen.io/kesuiket/pen/EXZopd)

ライトマップは事前レンダリングされた影（事前に焼き込まれた影とも呼ばれます）で、見ている人の実際の影のような錯覚を起こさせます

```js
var textureLoader = new THREE.TextureLoader()
var lm = textureLoader.load('../assets/textures/lightmap/lm-1.png')
var wood = textureLoader.load('../assets/textures/general/floor-wood.jpg')
var groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x777777,
  lightMap: lm,
  map: wood,
})
groundGeom.faceVertexUvs[1] = groundGeom.faceVertexUvs[0]
```

ライトマップを表示させるにはいくつかの設定が必要です.
ライトマップを使用するにはUVマッピング（テクスチャのどの部分を面のどの部分を面のどの部分に表示するか）の明示的な定義が必要になります.

### 環境マップを使用した擬似環境反射
環境反射の計算は非常にCPU負荷が高く, 通常はレイトレーシングを使用する必要があります.

- [05-env-map-static.html](https://codepen.io/kesuiket/pen/QgdQLO)
