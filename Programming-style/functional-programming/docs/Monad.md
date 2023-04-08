# モナド Monads
モナドに関して、理解すべき２つの重要なコンセプトがあります。

| | 説明 |
|:-|:-|
|モナド（Monad）|モナド処理（Monadic operation）の抽象インターフェースを提供する|
|モナド（Monadic type）|モナドインターフェイスの実装|

## MaybeモナドとEitherモナド

- 不純性を論理的に分離する
- nullチェックのロジックを統合する
- 例外を投げる処理を統合する
- 関数の合成をサポートする
- デフォルト値の提供ロジックを一元化する

### Maybeでnullチェックを一元化
- `Just(value)`: 定義した値をラッピングするコンテナを表す
- `Nothing()`: 値を持たないコンテナ、または追加情報の必要がない失敗を表す。Nothingの場合でも、（この場合は存在しない）その値に関数を適用できる

[サンプルコード: JustおよびNothingの各サブクラスを作ったMaybeモナド](https://codesandbox.io/s/maybe-monads-g771rw?file=/src/maybe.ts)

## その他

- [モナド](https://bit.ly/43ex3VT)
