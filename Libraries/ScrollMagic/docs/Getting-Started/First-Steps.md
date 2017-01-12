# はじめに
[原文](https://github.com/janpaepke/ScrollMagic/wiki/Getting-Started-:-First-Steps)

## すべてのファイルの取得
ScrollMagic に必要なファイルは GSAP と jQuery です.
もし bower を使っているなら, 必要なファイルをダウンロードする手段を知るべきです.
以下からそれらを手動でダウンロードできます.

- ScrollMagic のダウンロードは[こちら](https://github.com/janpaepke/ScrollMagic/archive/master.zip)
- GSAP のダウンロードは[こちら](http://greensock.com/gsap)
- jQuery のダウンロードは[こちら](http://jquery.com/download)

## プロジェクトの準備
プロジェクトのルートフォルダに `index.html` ファイルがあるとします.
CSS と Javascript のためにフォルダを作成します (`/js` や `/css` のような).
ScrollMagic のダウンロードパッケージはドキュメントとサンプルが含まれています.
関連したファイルは `/js` フォルダの中に配置されています. それらのファイルは:

- __jquery.scrollmagic.js__
- __jquery.scrollmagic.min.js__
- __jquery.scrollmagic.debug.js__

上記のファイルをコピーしてプロジェクトの javascript フォルダの中に配置します. 
GSAP と jQuery も同様にします.

## インストール
はじめるために, HTMLの中で GSAP, jQuery と ScrollMagic への参照が必要となります.
習慣的には, `<body>` 終了タグの直前に JS ファイルを追加します.
そうすると, ページ読み込みをブロックされることはありません.

```html
<script src="path/to/js/gsap/TweenMax.min.js"></script>
<script src="path/to/js/jquery.min.js"></script>
<!-- 開発終了時は圧縮版に置き換えるべきです -->
<script src="path/to/js/jquery.scrollmagic.js"></script>
<!-- 開発終了時は削除すべきです -->
<script src="path/to/js/jquery.scrollmagic.debug.js"></script>
<script>
  // ここにコードを書きます
</script>
</body>
</html>
```

はじめる準備が整いました. 続いて[ScrollMagic の基本](./How-to-use-ScrollMagic.md)です.
