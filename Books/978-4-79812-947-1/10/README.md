# Node アプリケーションをテストする

## 単体テスト

- Node に組み込まれている assert モジュール
- nodeunit
- Mocha
- Vows
- shuoud.js


### assert モジュール

__equal を使って変数の内容をテストする__

__notEqualを使ってロジックの問題点を探す__

__その他の確認: strictEqual、notStrictEqual、deepEqual、noyDeepEqual__

__ok を使って値が真であることを非同期にテストする__

__送出されるエラーが正しいことをテストする__

__一群のテストを実行するロジックを追加する__


### nodeunit
TDD(テスト駆動開発)


__nodeunit のインストール__

```bash
$ npm install -g nodeunit
```

__nodeunit で Node アプリケーションをテストする__


### Mocha

__関数名__

| BDD        | TDD      |
|:-----------| :--------|
| describe   | suite    |
| it         | test     |
| before     | setup    |
| after      | teardown |
| beforeEach |          |
| afterEach  |          |


```javascript
// 基本構造
var memdb = require('..');
describe('memdb', function() {
  describe('.save(doc)', function() {
    it('should save the document', function() {
      // これは doc を保存するはず
    })
  })
})
```

```javascript
// TDDスタイルの exports インターフェイス
module.exports = {
  'memdb': {
    '.save(doc)': {
      'should save the document': function() {
        // ドキュメントを保存するはず
      }
    }
  }
}j;
```

__非同期ロジックをテストする__

__Mocha は複数のテストを並行して実行しない__


### Vows

```bash
$ npm install -g vows
```


### should.js

```bash
$ npm install should
```


## 受け入れテスト

### Tobi

Tobi で Web アプリケーションをテストする

```bash
$ npm install tobi
```

### Soda

__Soda と Selenium Server をインストールする__

```bash
$ npm install soda
```

__Soda と Selenium で Webアプリケーションをテストする__

__Soda と Sauce Labs で Webアプリケーションをテストする__
