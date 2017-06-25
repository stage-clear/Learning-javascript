# THREE.MMDLoader による 3Dモデルの制御

## MMD と THREE.MMDLoader
### THRER.MMDLoader とは
THREE.MMDLoader は MMD のデータを読み込んで Three.js のオブジェクトを生成します

### MMD とは

##### MMD の特徴
- IK (Inverse Kinematics)
- 物理演算
- セルシェーディング
- 輪郭線表示

### THREE.MMDLoader で扱える MMD のデータ

##### THREE.MMDLoader で扱える MMD のデータ
- __PMD, PMX__ - モデルデータ. PMXはPMDを拡張したフォーマットでPMDよりも高機能
- VPD - ポーズデータ
- VMD - モーションデータ. モデル, 表情, カメラなどのアニメーション情報を扱う

### ライセンスの諸注意

## THREE.MMDLoader の使い方
### 説明の方針
- [ソースコード](https://github.com/oreilly-japan/learning-three-js-2e-ja-support/tree/master/appendix-B)

### 説明の流れ
- モデルを表示させる
- ポーズと表情を変更する
- ダンスをさせる
- 音楽に合わせてダンスをさせる

### 使用するデータ
- モデルデータ - `./models/model/model.pmd`
- ポーズデータ - `./vpds/pose.vpd`
- ダンスモーションデータ - `./vmds/cance.vmd`
- カメラモーションデータ - `./vmds/camera.vmd`
- 音楽データ - `./audio/audio.mp3`
- デフォルトテクスチャ - `./models/default/*.bmp`

お手元で試す場合は, [まとめサイト](https://www6.atwiki.jp/vpvpwiki/) などから好みのデータを探して使用してください

- [サンプルで使っているモデル](http://pronama.azurewebsites.net/)

### THREE.MMDLoader と THREE.MMDHelper

__THREE.MMDLoader__<br>
MMD関連のデータを読み込み, パースして, Three.js のオブジェクトを生成するモジュールです

__THREE.MMDHelper__<br>
アニメーション処理やレンダリング処理などのためのヘルパーモジュールです. IKなどのMMDの特徴的な処理も内部で行います

### モデルの表示

```html
<script src="./js/build/three.min.js"></script>
<script src="./js/libs/charsetencoder.min.js"></script>
<script src="./js/libs/ammo.js"></script>

<script src="./js/loaders/TGALoader.js"></script>
<script src="./js/loaders/MMDLoader.js"></script>
<script src="./js/animation/CCDIKSolver.js"></script>
<script src="./js/animation/MMDPhysics.js"></script>
<script src="./js/libs/dat.gui.min.js"></script>
```

#### THREE.MMDLoader.setDefaultTexturePath( texturePath )
デフォルトトゥイーンテクスチャファイルが置かれているディレクトリのパスを指定します.
モデルオブジェクトを作成する前に実行する必要があります

#### THREE.MMDLoader.loadModel( modelFilePath, onLoad, onProgress, onError )
モデルファイルをを読み込み, MMDモデルを `SkinnedMesh` オブジェクトとして生成します

#### THREE.MMDHelper.add( object )
ヘルパーにMMDモデルオブジェクトを追加します

#### THREE.MMDHelper.setPhysics( object )
MMDモデルオブジェクトに物理演算を設定します.
モデルオブジェクトを, scene など他のオブジェクトに追加する前に呼び出す必要があります

#### THREE.MMDHelper.animate( deltaTime )
MMDモデルオブジェクトのアニメーション処理（スケルトン, モーフィング, IK, 物理演算など）を行います

#### THREE.MMDHelper.render( scene, camera )
`WebGLRenderer.render()` のラッパーです.
内部でアウトライン表示処理も行います

次のような Three.js を使った基本的なアニメーション処理に, 
- データファイルからオブジェクトを作成
- オブジェクトを scene に追加
- アニメーションフレームごとにアニメーションを処理してレンダリング処理

MMDオブジェクトのために, 以下の処理を追加・変更します

- `THREE.MMDHelper.add()` を使ってヘルパーにオブジェクトを追加する
- `THREE.MMDHelper.setPhysics()` を使ってオブジェクトに物理演算を設定する
- `THREE.MMDHelper.animate()` を呼び出してアニメーション処理を行う
- `WebGLRenderer.render()` ではなく `THREE.MMDHelper.render()` を呼び出してレンダリング処理を行う

```js
init()
animate()

function init() {
  var onProgress = function() {}
}
```
