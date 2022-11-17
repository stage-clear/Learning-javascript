# API References

## before / after

- `describe()` の外側で `before()`/`after()` ... テストプログラムの最初/最後に1回だけ起動
- `describe()` の外側で `beforeEach()`/`afterEach()` ... 全ての `it()` の前/後に1回ずつ起動
- `describe()` の内側で `before()`/`after()` ... `describe()` の最初/最後に1回だけ起動
- `describe()` の内側で `beforeEach()`/`afterEach()` ... `describe()` 内の全ての `it()` の前/後に1回ずつ起動

## only / skip
`only()`/`skip()` は、 `describe` または `it` にチェーンして使うことができます。

## timeout
