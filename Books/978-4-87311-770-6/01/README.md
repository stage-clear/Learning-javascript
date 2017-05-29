# 初めての3Dシーン作成

Three.js を使用することで容易になる作業の一部:
- 単純あるいは複雑な3D形状の作成
- 3Dシーン上のオブジェクトのアニメーション移動
- オブジェクトへのテクスチャやマテリアルの適用
- シーンを照らすさまざまな光源の利用
- 3Dモデリングソフトウェアからのオブジェクトの読み込み
- 3Dシーンへの高度なポストプロセッシング効果の追加
- 独自に作成したカスタムシェーダーの使用
- ポイントクラウドの作成

数行の JavaScript で単純な3Dモデルからフォトリアリスティックなリアルタイムシーンまであらゆるものを作成できます.
[http://www.vill.ee/eye](http://www.vill.ee/eye)

- [iewebgl/iewebgl](https://github.com/iewebgl/iewebgl) - IE10以下を対象にWebGLのサポートを可能にします

## Three.js を使用する要件

- [Cloud9](https://c9.io/)
- [three.js / editor](https://threejs.org/editor/)

## ソースコードの取得

- Git リポジトリをクローン
- アーカイブをダウンロードして展開

### Git コマンドを使用してリポジトリをクローン

```
$ git clone https://github.com/oreilly-japan/learning-three-js-2e-ja-support
```

### アーカイブをダウンロードして展開

- [oreilly-japan/learning-three-js-2e-ja-support](https://github.com/oreilly-japan/learning-three-js-2e-ja-support)

### サンプルの確認
#### ほとんどの Unix/Mac システムで動作する Python ベースのウェブサーバー

```bash
$ python -m SimpleHTTPServer
```

#### Node.js で使用できる npm ベースのウェブサーバー

```bash
$ npm install -g http-server
$ http-server
```

```bash
$ npm install -g simple-http-server
$ nserver
```

#### Mac または Windows 用のポータブル版 Mongoose

- [Mongoose Binary](https://www.cesanta.com/products/binary)

#### Firefox と Chrome でセキュリティ例外を無効化

Chrome:

```bash
# Windows: 
chrome.exe --disable-web-security --user-data-dir=%UserProfile%\path\to\some\folder

# Linux:
google-chrome --disable-web-security --user-data-dir=$HOME/path/to/some/folder

# Mac:
open -a Google\ Chrome --args --disable-web-security --user-data-dir=$HOME/path/to/some/folder
```

Firefox:

URLバーに `about:config` と入力し, `危険性を承知の上で使用する` ボタンをクリックします.
すると Firefox の動作を調整するために利用できるすべてのプロパティが表示されます.
`security.fileuri.strict_origin_polycy` を `false` に変更します.

## HTML のスケルトンを作成

```html
<!doctype html>
<html>
  <head>
    <title>Example 01.01 - Basic skelton</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js"></script>
    <style>
      body {
        margin: 0;
        overflow hidden;
      }
    </style>
  </head>
  <body>
    <div id="WebGL-output">
    </div>

    <script>
      function init() {
      
      }

      window.onload = init
    </script>
  </body>
</html>
```

## 3Dオブジェクトの表示

- plane - 2次元の長方形で, 地面に相当する
- cube - 3次元の立方体で, 赤色で描画される
- sphere - 3次元の球体で, 青色で描画される
- camera - カメラは画面にはなにも表示されないが, 何を出力に含めるかを決定する
- axes - x, y, z軸. これは便利なデバッグ用のツールでオブジェクトが3D空間のどこに描画されるかを確認できる

サンプルの一番最初で `scene` と `camera`, `renderer` を定義しています.
`scene` オブジェクトは表示したいすべての物体と光源を保持して変更を監視するコンテナオブジェクトです.
`THREE.Scene` オブジェクトがなければ Three.js は何も描画できません.

- [サンプル 01-02](https://jsfiddle.net/stageclear/wzet7x4k/)

> [Three.js のソースコードドキュメント](https://threejs.org/)を読むと, WebGLベースのレンダラ以外にもレンダラがあることに気づくかもしれません.
> 他にも canvas ベースのレンダラやSVGベースのレンダラ, CSSベースのレンダラがあります.

`renderer` の背景色を `setClearColor()` を使用してほぼ真っ白に設定し, `setSize()` で描画すべきシーンの大きさがどのくらいかを `renderer` に通知します.
