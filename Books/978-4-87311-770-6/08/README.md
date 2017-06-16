# 高度なメッシュとジオメトリ

__グループ化とマージ__<br>
これによって既存のオブジェクトから新しいメッシュやジオメトリを作り出すことができます.

__外部から読み込み__<br>
例えば, Blendar を使用して Three.js がサポートしている形式でメッシュを書き出す方法について紹介します.

## ジオメトリのグループ化とマージ

### 複数のオブジェクトをまとめてグループ化
- [01-grouping.html](https://codepen.io/kesuiket/pen/RgoBpY)

```js
sphere = createMesh(new THREE.SphereGeometry(5, 20, 10))
cube = createMesh(new THREE.BoxGeometry(6, 6, 6))

group = new THREE.Group()
group.add(sphere)
group.add(cube)

scene.add(group)
```

```js
var arrow = new THREE.ArrowHelper(
  new THREE.Vector3(0, 1, 0), group.position, 0x0000ff
)
scene.add(arrow)
```

グループを使用していても個別のジオメトリの位置を参照したり変更したりすることは可能です.
ただし, 位置や回転, 平行移動などはすべて親オブジェクトからの相対座標で指定されること言うことに注意が必要です.

### 複数のメッシュをひとつのメッシュにマージ
- [02-merging.html](https://codepen.io/kesuiket/pen/NgbJPJ)

```js
var geometry = new THREE.Geometry()
for (var i = 0; i < controls.numberOfObjects; i++) {
  var cubeMesh = addCube()
  cubeMesh.updateMatrix()
  geometry.merge(cubleMesh.geometry, cubeMesh.matrix)
}
scene.add(new THREE.Mesh(geometry, cubeMaterial))
```

マージされた `THREE.Geometry` オブジェクトが正しく配置され回転されるように, 
`merge()` には `THREE.Geometry` だけでなく, 変換行列も渡さなければいけません.
この行列を `merge()` に渡すと, マージした立方体がtadasikuhaitisaremasu.

コードを見るといくつか欠点があることがわかります.<br>
まず, 最終的に残るジオメトリはひとつだけなので, 立方体それぞれに個別のマテリアルを設定することはできなくなります.
ただしこれについては `THREE.MultiMaterial` を利用することでいくぶん解決できます.<br>
もっとも大きな欠点は立方体を個別に制御できなくなることです.
特定の立方体を移動, 回転, 拡大縮小したいと思ったとしても（適切な面と頂点と位置を個別に見つけ出さない限り）不可能です.

### 外部リソースからのジオメトリの読み込み

##### Three.js がサポートしているファイルフォーマット
- `JSON`
- `OBJ` および `MTL`
- `Collada`
- `STL`
- `CTM`
- `VTK`
- `AWD`
- `Assimp`
- `Babylon`
- `PDB`
- `PLY`

### Three.js のJSONフォーマットの保存と読み込み
#### `THREE.Mesh` の保存と読み込み
- [03-load-save-json-object.html](https://codepen.io/kesuiket/pen/awBxWR)

次のコードのように書けば `THREE.Mesh` をJSON形式でエクスポートできます
```js
var result = knot.toJSON()
localStorage.setItem('json', JSON.stringify(result))
```

読み込み直す場合は

```js
var json = localStorage.getItem('json)

if (json) {
  var loadedGeometry = JSON.parse(json)
  var loader = new THREE.ObjectLoader()
  
  loadedMesh = loader.parse(loadedGeometry)
  loadedMesh.position.x = -= 50
  scene.add(loadedMesh)
}
```

複雑なメッシュを作成するために利用できる3Dプログラムはあたくさんあります.
その中でもオープンソースで有名なものが[Blender](https://www.blender.org/)です.
Three.js にはBlender用の（それ以外にもMayaや3D Studio Max用の）エクスポーターがあり,
それを使用することでBlenderからThree.jsのJSONフォーマットを直接エクスポートできます.

### Blender の利用
#### Blender に Three.js エクスポーターをインストール
- [Blender](https://www.blender.org/)

#### Blender でのモデルの読み込みと書き出し
- [05-blender-from-json.html]()

```js
var loader = new THREE.JSON.Loader()
loader.texturePath = '../assets/modles/'
loader.load('../assets/modles/misc_chair01.js', function(geometry, mat) {
  mesh = new THREE.Mesh(geometry, mat[0])
  
  mesh.scale.x = 15
  mesh.scale.y = 15
  mesh.scale.z = 15
  
  scene.add(mesh)
})
```

`texturePath` プロパティにテクスチャを見つけるためのパス（ページからの相対パス）をしています.
（今回は misc_chair1.js と同じディクレトリにあるため本来であれば指定する必要はありません.）

### 3Dファイルフォーマットからのインポート
#### OBJフォーマットとMTLフォーマット
OBJファイルはジオメトリを定義し, MTLファイルはそこで使用されているマテリアルを定義します.

- [06-load-obj.html](https://codepen.io/kesuiket/pen/BZQeLm)

```html
<script src="../libs/loaders/OBJLoader.js"></script>
```

```js
var loader = new THREE.OBJLoader()
loader.load('../assets/models/pinecone.obj', function(loadedMesh) {
  var material = new THREE.MeshLambertMaterial({
    color: 0x5c3a21,
  })
  
  // loadedMesh はメッシュのグループです
  // それぞれのメッシュに対してマテリアルを設定し
  // three.js が描画するために必要な情報を計算します
  loadedMesh.children.forEach(function() {
    child.material = material
    child.geometry.computeFaceNormal()
    child.geometry.computeVertexNormals()
  })
  
  mesh = loadedMesh
  loadedMesh.scale.set(100, 100, 100)
  loadedMesh.rotation.x = -0.3
  scene.add(loadedMesh)
})
```

> このサンプルでは `computeFaceNormals` と `computeVertexNromals` も呼び出しています.
> これによって使用しているマテリアルが正しく描画されることが保証されます

- [07-load-obj-mtl.html](https://codepen.io/kesuiket/pen/WOoBKY) OBJLoader に加えて MTLLoader を使用

```html
<script src="../libs/loaders/OBJLoader.js"></script>
<script src="../libs/loaders/MTLLoader.js"></script>
```

```js
var mtlLoader = new THREE.MTLLoader()
mtlLoader.setPath('../assets/models/)
mtlLoader.load('butterfly.mtl', function(materials) {
  materials.preload()
  
  var objLoader = new THREE.OBJLoader()
  objLoader.setMaterial(materials)
  objLoader.setPath('../assets/models/')
  objLoader.load('butterfly.obj', function(object) {
    var wing2 = object.children[5]
    var wing1 = object.children[4]
    
    wing1.material.opacity = 0.6
    wing1.material.transparent = true
    wing1.material.depthTest = false
    wing1.material.side = THREE.DoubleSide
    
    wing2.material.opacity = 0.6
    wing2.material.depthTest = false
    wing2.material.transparent = true
    wing2.material.side = THREE.DoubleSide
    
    object.scale.set(140, 140, 140)
    mesh = object
    scene.add(mesh)
    
    object.rotation.x = 0.2
    object.rotation.y = -1.3
  })
})
```

まず注意点としてOBJファイルとMTLファイル, そして必要なテクスチャファイルを受け取ったら
初めにMTLファイルがどのようにテクスチャを参照しているか確認する必要があるということを忘れないでください.

MTLファイルへの参照は絶対パスでなく相対パスでなければいけません.

OBJファイルとMTLファイルを同時に使用する場合は `MTLLoader` のコールバック内で `OBJLoader` を使用します.

さらに今回の例で使用しているモデルは少し複雑なので, OBJLoader のコールバックの中で
マテリアルの特定のプロパティをいくつか設定し, 次のような描画上の問題に対応しています

- ソースファイルの透明度が正しく設定されず, 翼が表示されませんでした. そのため `opacity` と `transparent` を自分で設定して問題を解決しました
- デフォルトではオブジェクトの片面だけを描画します. 翼は両側から見られる可能性があるので, `side` プロパティの値を `THREE.DoubleSide` に設定する必要があります
- 翼が重なって表示されるときに見た目上の問題が生じたため, `depthTest` プロパティを `false` に設定することで対応しました. この設定はパフォーマンスに少し影響を与えますが, 描画上の問題を解決できる場合が多くあります

### Collada モデルの読み込み
Collada モデル（拡張子は `.dae`）はシーンとモデルを定義するために広く利用されている, OJB/MTLとはまた別のフォーマットです.
Collada ではジオメトリだけでなくマテリアルも定義できます.
それどころか光源を定義することさえ可能です.

```html
<script src="../libs/loaders/ColladaLoader.js"></script>
```

```js
var mesh
loader.load('../assets/models/dae/Truck_dae.dae', function(result) {
  mesh = result.scene.children[0].children[0].clone()
  mesh.scale.set(4, 4, 4)
  scene.add(mesh)
})
```

大きく異なるのはコールバック関数に渡されるオブジェクトの形式です `result` は次のような構造を持ちます

```js
var result = {
  scene: scene,
  morphs: morphs,
  skins: skings,
  animations: animData,
  kinematics: kinimetics,
  dae: {
    ...
  }
}
```

まずこの `scene` をコンソールに出力して興味があるメッシュがどこになるのかを確認したところ,
`result.scene.children[0].children[0]` にありました.
メッシュの位置が確認できると, 残る作業は `scale` を設定して妥当な大きさにし, シーンに追加するだけです.

> このモデルを読み込んだ時はマテリアルが正しく描画されませんでした.
> これはテクスチャに `.tga` フォーマットが使用されていたためです. `.tga`フォーマットは WebGLでサポートされていません
> この問題の解決するために `.tga` ファイルを `.png` に変換し, さらに `.dae` モデルのXMLを編集して
> `.png` ファイルを指すように変更しました。

#### STLモデル, CTMモデル, VTKモデル, AWDモデル, Assimpモデル, VRMLモデル, Babylonモデル
これらの利用は次のとおりすべて同じような手順になるのでまとめて簡単に見ていきます

1. `[NameOfFormat]Loader.js` をウェブページに読み込みます
2. `[NameOfFormat]Loader.load()`を使用してURLを読み込みます
3. コールバックに渡される結果がどのような構造か確認して, 結果を描画します

- [09-load-STL.html]()
- [10-load-CTM.html]()
- [11-load-vtk.html]()
- [14-load-awd.html]()
- [15-load-assimp.html]()
- [16-load-vrml.html]()
- [14-load-babylon.html]()

<sup>（Babylonローダーは他と少し異なる. `THREE.Mesh` や `THREE.Geometry` を単独で読み込むのではなく, 光源を含むシーン全体を読み込む）</sup>

#### 蛋白質構造データバンクの蛋白質構造を表示
[蛋白質構造データバンク](http://www.rcsb.org/)にはさまざまな分子や蛋白質の詳細な情報が含まれています.
PDBフォーマットで記述されたこれらの分子構造をダウンロードすることもできます.

- [12-load-pdb.html](https://codepen.io/kesuiket/pen/VWmJNV)

```html
<script src="../libs/loaders/PDBLoader.js"></script>
```

```js
var loader = new THREE.PDBLoader()
var group = new THREE.Group()
loader.load('../assets/modles/aspirin.pdb', function(geometry, geometryBonds) {
  var i = 0
  
  geometry.vertices.forEach(function(option) {
    var sphere = new THREE.SphereGeometry(0.2)
    var material = new THREE.MeshPhongMaterial({
      color: geometry.colors[i++],
    })
    var mesh = new THREE.Mesh(sphere, material)
    mesh.position.copy(position)
    group.add(mesh)
  })
  
  for (var j = 0; j < geometryBonds.vertices.length; j += 2) {
    var path = new THREE.CatmullRomCurve3([
      geometryBonds.vertices[j],
      geometryBonds.vertices[j + 1],
    ])
    var tube = new THREE.TubeGeometry(path, 1, 0.04)
    var material = new THREE.MeshPhongMaterial({
      color: 0xcccccc
    })
    var mesh = new THREE.Mesh(tube, material)
    group.add(mesh)
  }
  scene.add(group)
})
```

この特殊なローダーのコールバック関数は `geometry` と `geometryBonds` という2つの引数を受け取ります.
`geometry` 引数の頂点は蛋白質内の個々の原子の位置を示しています.
`geometryBonds` はそれら原子間の結合を示しています.

```js
var sphere = new THREE.SphereGeometry(0.2)
var material = new THREE.MeshPhongMaterial({
  color: geometry.color[i++]
})
var mesh = new THREE.Mesh(sphere, material)
mesh.position.copy(position)
group.add(mesh)

// 結合部分
var path = new THREE.CatmullRomCurve3([
  geometryBonds.vertices[j],
  geometryBonds.vertices[j + 1],
])
var tube =  new THREE.TubeGeometry(path, 1, 0.04)
var material = new THREE.MeshPhongMaterial({
  color: 0xcccccc,
})
var mesh = new THREE.Mesh(tube, material)
group.add(mesh)
```

#### PLYモデルからパーティクルシステムを作成
- [13-load-PLY.html](https://codepen.io/kesuiket/pen/rwWXqZ)

```js
var loader = new THREE.PLYLoader()
var group = new THREE.Group()

loader.load('../assets/models/test.ply', function(geometry) {
  var material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.4,
    opacity: 0.6,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: generateSprite(),
  })
  
  group = new THREE.Points(geometry, material)
  gorup.sortParticles = true
  
  scene.add(group)
})
```

## まとめ
まず覚えておくべきなのはオブジェクトをグループ化したとしても依然個別のオブジェクトとしても利用できるということです.

グループ化でなく, ジオメトリをマージすることもできます.
ただしこの方法を使用すると個々のジオメトリは失われ, 全体でひとつの新しいジオメトリになります.
これは何千ものジオメトリを描画する必要がありパフォーマンス上の問題が起きているような場合に特に有用です.

Three.js は数多くの外部フォーマットをサポートしています.<br>
モデルが正しく表示されない場合はマテリアルの設定が原因であることが多くあります.
利用されているテクスチャのフォーマットに非対応であったり, 透明度に不正な値が設定されていたり,
テクスチャ画像への不適切なリンクが含まれたフォーマットであったりする場合です.

