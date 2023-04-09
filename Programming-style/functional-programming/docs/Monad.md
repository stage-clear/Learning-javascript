# モナド
_<sup>Monads</sup>_<br>
モナドに関して、理解すべき２つの重要なコンセプトがあります。

|名前|説明|
|:-|:-|
|**モナド _（Monad）_**|モナド処理 _(Monadic operation)_ の抽象インターフェースを提供する|
|**モナド _（Monadic type）_**|モナドインターフェースの実装|

モナド型は、処理のチェーン化やその型の関数を入れ子にするとはどのようなことかということを定義します。<br>
そして、モナド型の全てが次に挙げるインターフェースに準拠しなければなりません。

|名前|説明|例|
|:-|:-|:-|
|**型コンストラクタ**|モナド型を生成する（型構築子）|コンストラクタ|
|**ユニット関数**|ある型の値をモナド構造 _（Monadic structure）_ に挿入する。モナド内部に実装された場合は、`of`関数と呼ぶ|`of` `unit` `wrap` `empty` `pure`|
|**バインド関数**|処理をチェーン化する（`map`や`flatMap`としても知られている）。|`map` `fmap` `flatMap`|
|**ジョイン（結合）処理**|モナド構造のレイヤーを単層に平坦化する。特にモナドを返す関数について複数個合成する際に重要|`join`|

## Maybe モナドと Either モナド

- 不純性を論理的に分離する
- null チェックのロジックを統合する
- 例外を投げる処理を統合する
- 関数の合成をサポートする
- デフォルト値の提供ロジックを一元化する

### Maybe で null チェックを一元化
- `Just(value)`: 定義した値をラッピングするコンテナを表す
- `Nothing()`: 値を持たないコンテナ、または追加情報の必要がない失敗を表す。Nothingの場合でも、（この場合は存在しない）その値に関数を適用できる

<sup>* Java8ではそれぞれ `Some` `None`</sup>

▶️ [Maybe モナド](https://codesandbox.io/s/maybe-monads-g771rw?file=/src/maybe.ts)

### Either モナドを使って失敗から回復する

- `Left(a)`: 起こりうるエラーメッセージを投げる例外オブジェクトを格納
- `Right(b)`: 成功値を格納

▶️ [Either モナド](https://codesandbox.io/s/either-monad-h4f56b?file=/src/either.ts)

## IO モナド

▶️ [IO モナド](https://codesandbox.io/s/io-monad-w9ks7m?file=/src/io.ts)

## その他
- [JavaScriptのモナド POSTD](https://postd.cc/monads-in-javascript/)
- [モナド則](https://www.sampou.org/haskell/a-a-monads/html/laws.html)
- [モナド](https://bit.ly/43ex3VT)
- [sodium-typescript-example](https://github.com/graforlock/sodium-typescript-examples/tree/petrol-pump/src)
