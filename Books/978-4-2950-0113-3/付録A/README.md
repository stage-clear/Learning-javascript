# 付録A 本書で使用したJavaScriptライブラリ
## A.1 関数型JavaScriptライブラリ
これらのライブラリを読み込むことによって、カリー化、合成、メモ化、遅延評価、不変性などの機能をエミュレートすることができます。

### A.1.1 [Lodash](https://lodash.com/)
ユーティリティライブラリ
```
ブラウザ: <script src="lodash.js"></script>
Node.js: $npm i --save lodash
```

### A.1.2 [Ramda](http://ramdajs.com)
関数パイプラインの生成を可能にします。Ramdaの関数はすべて不変であり、副作用がありません。
さらに、すべての関数にカリー化の機能があり、パラメータはカリー化および合成に都合が良いように配置されます。

```
ブラウザ: <script src="ramda.js"></script>
Node.js: $npm install ramda
```

### A.1.3 [RxJS](https://github.com/Reactive-Extensions/RxJS)
リアクティブプログラミングとして知られているパラダイムを実装します。
オブザーバーパターン、イテレータパターン、および関数型プログラミングの最も良いアイデアを組み合わせて、非同期型やイベントベースのプログラミングを可能にします。

```
ブラウザ: www.jsdelivr.com/?=query=rxjs
Node.js: $npm install rx-node
```

## A.2 本書で使用したその他のライブラリ
### A.2.1 [Log4js](http://stritti.github.io/log4js/)
一般的なエンタープライズレベルのログ向けに使用され、代表的な `console.log` よりも数段協力です。
```
ブラウザ: <script src="log4.js"></script>
Node.js: $npm install log4js
```

### A.2.2 [QUnit](https://qunitjs.com/)
QUnitは、強力かつスリムで簡便なJavaScriptのユニットテスト用フレームワークです。
```
ブラウザ: <script src="qunit-x.xx.x.js"></script>
Node.js: $npm install -save-dev qunitjs
```

### A.2.3 [Sinon](http://sinonjs.org/)
Sinon.JSは、JavaScript向けのスタブであり、モック用のフレームワークです。

```
ブラウザ: <script src="sinon-x.x.x.js></script>
        <script src="sinon-qunit-x.x.x.js></script>
Node.js: $npm install sinon
         $npm install sinon-qunit
```

### A.2.4 [Blanket](http://blanketjs.org/)
Blanketは、JavaScriptのコードカバレッジツールです。

```
ブラウザ: <script src="blanket.js"></script>
Node.js: $npm install blanket
```

### A.2.5 [JSCheck](http://www.jscheck.org/)
JSCheckは、JavaScript向けの仕様駆動型（プロパティベース）のテスト用ライブラリです。
JSCheckは、関数のプロパティの記述から、ランダムなテストケースを生成します。生成されたテストケースは、関数のプロパティを検査するためのものです。

```
ブラウザ: <script src="jscheck.js"></script>
Node.js: $npm install jscheck
```
