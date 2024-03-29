# デザインパターン
|生成|||
|:-|:-|:-:|
|[抽象ファクトリ](abstract-factory.md)|具象クラスの細部を明らかにせずにクラスのインスタンスを作成する|**`Object`**|
|[ビルダー](builder.md)|オブジェクトの作成過程を表現形式と切り離す。常に同じタイプのオブジェクトを作成する|**`Object`**|
|[ファクトリメソッド](factory.md)|渡されたデータやイベントに派生クラスのインスタンスを作成する|**`Class`**|
|[プロトタイプ](prototype.md)|コピーの際に、完全に初期化されたインスタンスを利用する|**`Object`**|
|[シングルトン](singleton.md)|グローバルからアクセスできるインスタンスが1つしかないクラス|**`Object`**|
- [コンストラクタ](constructor.md)
- [モジュール](module.md)
- [リビーリングモジュール](revealing-module.md)
- [サブクラス化](subclass.md)
- [ミックスイン](mixin.md)

|構造|||
|:-|:-|:-:|
|[アダプター](adapter.md)|異なるクラスのインターフェイスを対応させて、インターフェイスが対応していないクラス同士でも組み合わせて使えるようにする|**`Class`**|
|[ブリッジ](bridge.md)|オブジェクトのインターフェイスを実装から切り離し、インターフェイスと実装をそれぞれ独自に変更できるようにする|**`Object`**|
|[コンポジット](composite.md)|個々のオブジェクトとオブジェクトを合成したものの構造を一様に扱うことで、別々に扱うよりも多くのことができる|**`Object`**|
|[デコレータ](decorator.md)|オブジェクトに動的に処理を追加する|**`Object`**|
|[ファサード](facade.md)|1つのクラスがサブシステム全体の複雑性を隠蔽する|**`Object`**|
|[フライウェイト](flyweight.md)|いたるところで使われている情報を効率的に共有するために、小さなサイズのインスタンスを利用する|**`Object`**|
|[プロキシ](proxy.md)|本物のオブジェクトの代わりとなる代理オブジェクト|**`Object`**|

|振る舞い|||
|:-|:-|:-:|
|[インタプリタ](interpreter.md)|アプリケーションに言語的要素を追加し、対象とする言語の文法に対応する|**`Class`**|
|[テンプレートメソッド](template-method.md)|メソッド内にアルゴリズムのかたまりを作り、サブクラスのステップを遅延させる|**`Class`**|
|[責任の連鎖パターン](chain-of-responsibility.md)|一連のオブジェクトの中でリクエストを順番に渡していき、その要求を対処できるオブジェクトを見つける方法|**`Object`**|
|[コマンド](command.md)|コマンドの実行動作をコマンド発効する立場から切り離す|**`Object`**|
|[イテレータ](iterator.md)|コレクションの内部動作について知ることなく、そのコレクションの要素に順番にアクセスしていく|**`Object`**|
|[メディエータ](mediator.md)|クラス間のやりとりを簡素化し、クラス同士が直接参照し合うのを防ぐ|**`Object`**|
|[メメント](memento.md)|オブジェクトの内部状態を記録し、後でそれを復元できるようにする|**`Object`**|
|[オブザーバ](observer.md)|変更をたくさんのクラスに通知し、クラス間の一貫性を保証する方法|**`Object`**|
|[ステート](state.md)|状態が変わったときにオブジェクトの振る舞いを変える|**`Object`**|
|[ストラテジー](strategy.md)|クラス内部のアルゴリズムをカプセル化し、アルゴリズムの選択をクラスの実装から独立させる|**`Object`**|
|[ビジター](visitor.md)|クラスを変更することなく、そのクラスに新たなオペレーションを追加する|**`Object`**|
- [発行/購読パターン](https://github.com/kesuiket/js-snippets/blob/master/codes/eventEmitter/pubsub.js)

## 参考書
- [JavaScript Design Patterns - Joe Zim's JavaScript Corner](https://www.joezimjs.com/tag/design-patterns/)
- [JavaScript Design Patterns - DoFactory](https://www.dofactory.com/javascript/design-patterns/)
  - [The #1 JS Success Platform DoFactory](https://www.dofactory.com/products/dofactory-js)
- [Design Patterns Game](https://designpatternsgame.com/patterns/)
- [Design Patterns - sourcemaking.com](https://sourcemaking.com/design_patterns/)
