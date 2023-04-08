# 関数型プログラミング

|名前|説明|
|:-|:-|
|第一級関数|`First-class function`|
|純粋性・純粋関数|副作用のない関数|
|[参照透過性](docs/Referential-transparency.md)|「プログラムの構成要素が同じもの同士は等しい」という性質。<br>ある関数への引数が同じであれば、その関数は必ず同じ値を返さなければならない。<br>同じ関数で何度実行されても同じ値を返す。|
|合成関数|引数に与えられた関数を合成した関数に同じ値を引数に渡します|
|カリー化|２つ以上の引数を持つ関数を分解して、引数１つの関数の入れ子にする|
|部分適用|複数の引数を持つ関数に対して、その引数の一部を定数にして新しい関数を作り出す|
|パラメータ束縛|部分適用で束縛したパラメータ|
|[コンビネータ](docs/combinator.md)|関数など原始的なもの同士を組み合わせた高階関数であり、制御ロジックとして機能します。<br>コンビネータでは通常、変数を一切宣言せず、ビジネスロジックを含みません|
|ストリーム|ストリームとは、一連のイベントのことである。イベントはそれぞれペイロード値で構成される。ストリームは、イベント、イベントストリーム、オブザーバブル、シグナルとも呼ばれる。<br>値の並びの一部を遅延評価によって実現したデータ構造<br>→ フローベース|
|セル|セルには時間とともに変化する値が含まれる。セルは、ビヘイビア、プロパティ、シグナルとも呼ばれる|
|[ファンクター](docs/functor.md)|値をラッパーから持ち上げて（リフトし）、変更してからラッパーに戻すため関数をマッピングするためのデータ構造|
|[モナド](docs/monad.md)||
|恒等関数|`Identity function` <br>入力値をまったく同じ数値に変換して返す|

- [フォールトトレラント](https://bit.ly/3KIvlor)
- [命令型エラー処理の問題点](docs/try-catch-problems.md)

|クラス|ストリームを出力|セルを出力|値を出力|
|:-|:-|:-|:-|
| Stream | `map()`<br>`merge()` / `orElse()`<br>`snapshot()`<br>`filter()`<br>`never` / `new Stream()`| `hold()` | |
| Cell | `switchS()` | `map()`<br>`lift()`<br>`new Cell(定数)`<br>`switchC()` | `sample()` |


## 関数型プログラミングの JavaScript ライブラリ
- [Underscore.js](http://underscorejs.org/)
- [underscore-contrib](https://github.com/documentcloud/underscore-contrib)
- [lodash.js](https://lodash.com/)
- [Immutable.js](https://immutable-js.com/)
- [Ramda.js](https://ramdajs.com/)
- [RxJS](https://rxjs.dev/)
- [bilby.js](https://github.com/puffnfresh/bilby.js)

## 参考
- [【翻訳】あなたが求めていたリアクティブプログラミング入門](http://ninjinkun.hatenablog.com/entry/introrxja)
- [モナド則がちょっと分かった？](https://qiita.com/7shi/items/547b6137d7a3c482fe68)

## 参考書籍
- [JavaScript で学ぶ関数型プログラミング](../../Books/978-4-87311-660-0/)
- [JavaScript関数型プログラミング 複雑性を抑える発想と実践法を学ぶ](../..//Books/978-4-2950-0113-3/)
- [関数型プログラミングの基礎 JavaScriptを使って学ぶ](../../Books/978-4-86594-059-6/)
