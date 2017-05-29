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

<!doctype html>
<html>
  <head>
    <title>Example 01.01 - Basic skelton</title>
    <script src="../libs/three.js"></script>
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
  </body>
</html>
