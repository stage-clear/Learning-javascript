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

シャドウマップを適切に配置できると, 次に立方体を適切な位置に配置して影がそれらから落ちているように見せかける必要があります.

### 環境マップを使用した擬似環境反射
環境反射の計算は非常にCPU負荷が高く, 通常はレイトレーシングを使用する必要があります.

- [three.js docs - __CubeTextureLoader__](https://threejs.org/docs/#api/loaders/CubeTextureLoader)
- [three.js docs - __ShaderMaterial__](https://threejs.org/docs/#api/materials/ShaderMaterial)
- [05-env-map-static.html](https://codepen.io/kesuiket/pen/QgdQLO)

1. __CubeMapオブジェクトの作成__<br>
   まず初めに CubeMap オブジェクトを作成します. CubeMap は立方体の各面に適用される6つのテクスチャをまとめたものです.
2. __CubeMap オブジェクトを使用した立方体の作成__<br>
   CubeMap の立方体はカメラを動かした時に見える環境を模擬するものです. これにより周りに見える環境の中に立っているような錯覚を起こさせます.
   見ている人は空間内にいるような錯覚に陥りますが, 実際のところは内側に周囲の環境をテクスチャとして張り付いた立方体の中にいます
3. __CubeMap オブジェクトをテクスチャとして適用__
   先ほど環境を模擬するために使用した CubeMap オブジェクトはメッシュのテクスチャとしても使用できます.
   そしてこのテクスチャが設定されたオブジェクトは周囲の環境を反射しているかのように見えます.

使用する画像さえ準備できれば, CubeMap の作成は非常に簡単です.
必要なのは, 組み合わせることで周囲の環境全体を構成できる6つの画像です.
つまり前向き（posz）, 後ろ向き（negz）, 上向き（posy）, 下向き（negy）, 右向き（posx）, 左向き（negx）の画像が必要です.

CubeMapに使用できる画像をダウンロードできるサイトがいくつかあり, 
今回のサンプルでは[Humus - Textures](http://www.humus.name/index.php?page=Textures)からダウンロードした画像を使用しています.

```js
function createCubeMap() {
  var path = '../assets/textures/cubemap/parliament/'
  var format = '.jpg'
  var urls = [
    path + 'posx' + format, path + 'negx' + format,
    path + 'posy' + format, path + 'negy' + format,
    path + 'posz' + format, path + 'negz' + format,
  ]
  var cubeTextureLoader = new THREE.CubeTextureLoader()
  var textureCube = cubeTextureLoader.load(urls)
  return textureCube
}
```

360度のパノラマ画像があれば, CubeMap の作成にしようできる画像の組に変換することもできます.
[Convert panorama](http://gonchar.me/panorama/)を使用してください.

```js
var urls = [
  'right.png',
  'left.png',
  'top.png',
  'bottom.png',
  'front.png',
  'back.png',
]
```

CubeMap を使用する場合, まず次のようにして立方体を作成します

```js
var textureCube = createCubeMap()
var shader = THREE.ShaderLib['cube']
shader.uniforms['tCube'].value = textureCube
var material = new THREE.ShaderMaterial({
  fragmentShader: shader.fragmentShader,
  vertexShader: shader.vertexShader,
  uniforms: shader.uniforms,
  depthWrite: false,
  side: THREE.BackSide,
})
cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), material)
```

`THREE.ShaderMaterial` を使用して CubeMap に基づいて環境を作成できる特別なシェーダー（`var shader = THREE.ShaderLib['cybe']`）があります.
CubeMap を使用してこのシェーダーを設定し, メッシュを作成してシーンに追加します.
このメッシュを内側から眺めると, 自分が立っている周囲の環境が擬似的に映し出されます.<br>
同じ CubeMap オブジェクトをメッシュに適用すると擬似反射を生じます.

```js
var sphere1 = createMesh(
  new THREE.SphereGeometry(10, 15, 15), 'plaster.jpg'
)
sphere1.material.envMap = textureCube
sphere1.rotation.y = -0.5
sphere1.position.x = 12
sphere1.position.y = 5
scene.add(sphere1)

var sphere2 = createMesh(
  new THREE.BoxGeometry(10, 15, 15),
  'plaster.jpg', 'plaster-normal.jpg'
)
sphere2.material.envMap = textureCube
sphere2.rotation.y = 0.5
sphere2.position.x = -12
sphere2.position.y = 5
scene.add(sphere2)
```

CubeMap オブジェクトを利用して反射だけでなく屈折（ガラスのようなオブジェクト）を実現することもできます

```js
var textureCube = cubeTextureLoader.load(urls)
textureCube.mapping = THREE.CubeRefractionMapping
```

`recfection` プロパティと同じように, マテリアルの `refraction` プロパティを使用すると屈折率を設定できます.

このサンプルではメッシュに静的な環境マップを使用しました.
つまりメッシュの表面では周囲の環境だけが反射され, 環境内のメッシュは反射されません.
立方体と球にお互いが写り込んでいないことを確認できます.<br>
シーン内で他のオブジェクトも含めて反射を実現するにはどうすればよいかを示します.

- [three.js docs - __CubeCamera__](https://threejs.org/docs/#api/cameras/CubeCamera)
- [05-env-map-dynamic.html](https://codepen.io/kesuiket/pen/BZpPRv)

```js
var cubeCamera = new THREE.CubeCamera(0.1, 20000, 256)
scene.add(cubeCamera)
```

`THREE.CubeCamera` を使用してすべてのオブジェクトが描画されたシーンのスナップショットを撮り, それを CubeMap に設定します.
カメラの位置を動的な反射を表示させたい　`THREE.Mesh` の位置を一致にさせる必要があります.
このサンプルでは中心の球にだけこの動的な反射を設定しています.<br>
球にだけ動的な反射を設定するのでその他のオブジェクトのものと合わせて2種類のマテリアルが必要になります.

```js
var dynamicEnvMaterial = new THREE.MeshBasicMaterial({
  envMap: cubeCamera.renerTarget,
  side: THREE.DoubleSide,
})
var envMaterial = new THREE.MeshBasicMaterial({
  envMap: textureCube,
  side: THREE.DoubleSide,
})
```

前のサンプルとの主な違いは, 動的な反射を実現するために `envMap` プロパティに以前設定した
`textureCube` ではなく `cubeCamera.renderTarget` を設定していることです.<br>
中央の球には `dynamicEnvMaterial` を使用し, その他には `envMaterial` を使用します

```js
var sphere = new THREE.Mesh(sphereGeometry, dynamicEnvMaterial)
sphere.name = 'sphere'
scene.add(sphere)

var cylinder = new THREE.Mesh(cylinderGeometry, envMaterial)
cylinder.name = 'cylinder'
scene.add(cylinder)
cylinder.position.set(10, 0, 0)

var cube = new THREE.Mesh(boxGeometry, envMaterial)
cube.name = 'cube'
scene.add(cube)
cube.position.set(-10, 0, 0)
```

```js
function render() {
  sphere.visible = false
  cubeCamera.updateCubeMap(renderer, scene)
  sphere.visible = true
  
  renderer.render(scene, camera)
  ...
  requestAnimationFrame(render)
}
```

まず初めに非表示nisiteimasu.
これは他の2つのオブジェクトからの反射だけを見えるようにするためです.
次に `updateCubeMap()` を呼び出して `cubeCamera` でシーンを描画simasu.
その後, 球を再表示してシーンを通常どおり描画すると, 球の反射の中に立方体と円柱が映り込みます.

### スペキュラマップ
マテリアルの光沢とハイライトの色を指定できます.

- [06-specular-map.html](https://codepen.io/kesuiket/pen/XgpPvx) - スペキュラマップと法線マップを同時に使用して地球を描画

海の部分がハイライトされ光を反射しているのが確認できます.
一方, 大陸の部分は非常に暗く, （ほとんど）光を反射siteimasenn.

スピキュラマップを設定すると, ピクセルの値が大きい（黒が最小で白が最大）部分ほど表面の光沢が強くなります.
通常はスピキュラマップは反射の色を指定する `specular` プロパティと組み合わせて利用します.

```js
var textureLoader = new THREE.TextureLoader()
var specularTexture = textureLoader.load('../assets/textures/planets/Earth.png')
var normalTexture = textureLoader.load('../assets/textures/planets/EarthNormal.png')

var planetMaterial = new THREE.MeshPhongMaterial()
planetMaterial.specularMap = specularTexture
planetMaterial.specular = new THREE.Color(0xff0000)
planetMaterial.shininess = 2
planetMaterial.normalMap = normalTexture
```

通常, `shininess` の値は小さいほうがよい効果が得られますが, ライティングの設定や
使用しているスペキュラマップによって, 求める効果を得るために試行錯誤が必要になる場合もあることに注意してください

## テクスチャの高度な利用
### 独自UVマップ
UVマッピングを使用すると特定のテクスチャのどの部分を対応させるかが指定できます.

- [07-uv-mapping.html](https://codepen.io/kesuiket/pen/zzNMoq)
- [07-uv-mapping-manual.html](https://codepen.io/kesuiket/pen/OgWBKZ)

UVマッピングのカスタマイズには Blender のようなプログラムを使用します.
UVマッピングが2次元で, それぞれ0から1の値を取るu座標とv座標からなるということを覚えておいてください

```js
geom.faceVertexUvs[0][0][0].x = 0.5
geom.faceVertexUvs[0][0][0].y = 0.7
geom.faceVertexUvs[0][0][1].x = 0.4
geom.faceVertexUvs[0][0][1].y = 0.1
geom.faceVertexUvs[0][0][2].x = 0.4
geom.faceVertexUvs[0][0][2].y = 0.5
```

### ラッピングの繰り返し
- [threejs docs - __Texture__](https://threejs.org/docs/#api/constants/Textures) Wrapping Modes
- [08-repeat-wrapping.html](https://codepen.io/kesuiket/pen/zzNMQz)

望ましい効果を得るには, テクスチャのラッピングを `THEE.RepeatWrapping` に設定する必要があります
```js
cube.material.map.wrapS = THREE.RepeatWrapping
cube.material.map.wrapT = THREE.RepeatWrapping
```

- `THREE.RepeatWrapping` ではテクスチャ全体が繰り返されます
- `THREE.MirroredRepeatWrapping` ではテクスチャ全体が繰り返されるたびに反転されます. これによりテクスチャの境目を滑らかします
- `THREE.ClampToEdgeWrapping` はデフォルトの設定です. テクスチャ全体が繰り返されることはなく, 一番端のピクセルだけが繰り返されます

```js
cube.material.map.repeat.set(repeatX, repeatY)
```

ここで `repeatX` 変数はテクスチャをx軸にそって何度繰り返すかを指定し, 
`repeatY` 変数はy軸ついて同様の指定をします.

```js
cube.material.map.needsUpdate = true
```

### canvas要素をテクスチャとして使用
#### canvas要素をテクスチャとして使用
最初のサンプルでは[Literally](http://literallycanvas.com/)ライブラリを使用して, 自由に絵が描けるインタラクティブな canvas を作成しています

- [09-canvas-texture.html](https://codepen.io/kesuiket/pen/NgdejN)

```html
<div class="fs-container">
  <div id="canvas-output" style="float: left;">
  </div>
</div>
```

```js
var canvas = document.createElement('canvas')
$('#canvas-output')[0].appendChild(canvas)
$('#canvas-output').literallycanvas({
  imageURLPrefix: '../libs/literally/img',
  imageSize: {width: 350, height: 350},
  primaryColor: 'white',
  backgrondColor: 'black',
})
```

canvas の描き込みの結果を入力として使用するテクスチャを作成する必要があります.
```js
function createMesh(geom) {
  var canvasMap = new THREE.Texture(canvas)
  var mat = new THREE.MeshPhongMaterial()
  mat.map = canvasMap
  var mesh = new THREE.Mesh(geom, mat)
  return mesh
}
```

```js
function render() {
  stats.update()
  
  cube.rotation.y += 0.01
  cube.rotation.x += 0.01
  
  cube.material.map.needsUpdate = true
  
  requestAnimationFrame(render)
  webGLRenderer.render(scene, camera)
}
```

#### canvas要素をバンプマップとして使用
バンプマップを使用すると簡単に小さな凹凸のある表面を作成できます.
マップのピクセルの明度が大きければ大きいほど, 凹凸は高くなります.

- [09-canvas-texture-bumpmap.html](https://codepen.io/kesuiket/pen/awpPRR)
- [wwwtyro/perlin.js](https://github.com/wwwtyro/perlin.js)

今回はノイズとして[パーリンノイズ](https://ja.wikipedia.org/wiki/%E3%83%91%E3%83%BC%E3%83%AA%E3%83%B3%E3%83%8E%E3%82%A4%E3%82%BA)を使用します.

```js
var ctx = canvas.getContext('2d')
function fillWithPerlin(perlin, ctx) {
  for (var x = 0; x < 512; x++) {
    for (var y = 0; y < 512; y++) {
      var base = new THREE.Color(0xffffff)
      var value = perlin.noise(x / 10, y / 10, 0)
      base.multiplyScalar(value)
      ctx.fillStyle = '#' + base.getHexString()
      ctx.fillRect(x, y, 1, 1)
    }
  }
}
```

```js
var bumpMap = new THREE.Texture(canvas)

var mat = new THREE.MeshPhongMaterial()
mat.color = new THREE.Color(0x77ff77)
mat.bumpMap = bumpMap
bumpMap.needsUpdate = true
```

### video要素をテクスチャとして使用
video要素の内容をcanvas要素上に描画して, それをテクスチャの入力として使うことを想像するかもしれません.
もちろんそれも可能ではありますが, Three.js はもともと（WebGLを通じて）video要素の使用を直接サポートしています.

- [three.js docs - __VideoTexture__](https://threejs.org/docs/#api/textures/VideoTexture)
- [11-video-texture.html](https://codepen.io/kesuiket/pen/rwjoXZ)

```html
<video
  id="video"
  style="display: none; position: absolute; left: 15px; top: 75px;"
  src="../assets/movies/Big_Buck_Bunny_small.ogv"
  controls="true"
  autoplay="true">
</video>
```

```js
var video = document.getElementById('video')
texture = new THREE.VideoTexture(vide)
texture.generateMipmaps = false
```
動画は正方形ではないのでマテリアルのミップマップ生成を無効にしておく必要があります.

```js
// *クロスオリジン対応を追記
video.setAttribute('crossorigin', 'anonymous');
```

残る作業はメッシュを作成してテクスチャを設定することだけです.
今回は `MeshBasicMaterial` と `MultiMaterial` を組み合わせて使用しました

```js
var materialArray = []
materialArray.push(new THREE.MeshBasicMaterial({color: 0x0051ba}))
materialArray.push(new THREE.MeshBasicMaterial({color: 0x0051ba}))
materialArray.push(new THREE.MeshBasicMaterial({color: 0x0051ba}))
materialArray.push(new THREE.MeshBasicMaterial({color: 0x0051ba}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture}))
materialArray.push(new THREE.MeshBasicMaterial({color: 0x0051ba}))

var faceMaterial = new THREE.MultiMaterial(materialArray)
var mesh = new THREE.Mesh(geom, faceMaterial)
```

サンプルではビデオを立方体の一面にだけ描画していますが, これは通常のテクスチャなので,
本章で学んだことはすべて適用できます.
例えば独自のUVマッピングを使用して立方体の各側面ごとにビデオを分割したり, 
video要素をバンプマップ法線マップとして使用することも可能です.

## まとめ
