# Strategy

> ストラテジーパターンでは、実行時にアルゴリズムを選択します。  
> ストラテジーパターンの使用例としては、妥当性の検証があります。`validate()` メソッドを持つバリデータオブジェクトをひとつ作ります。

## 例) "JavaScript pattern" での実装

```js
let validator = {
  // 利用できるすべての検査
  types: {},

  // 現在の検証セッションでのエラーメッセージ
  message: [],

  // 現在の検証の設定
  // 名前: 検証の種類
  config: {},

  // インターフェイスメソッド
  // data = { key: value }
  validate(data) {
    let i, msg, type, checker, result_ok;

    // メッセージをすべてリセット
    this.message = [];

    for (i in data) {
      if (data.hasOwnProperty(i)) {
        type = this.config[i];
        checker = this.types[i];

        if (!type) {
          continue; // 検証する必要はない
        }
        if (!checker) { // これは変だ
          throw {
            name: 'validationError',
            message: 'No handler to validate type ' + type
          }
        }

        result_ok = check.validate(date[i]);
        if (!result_ok) {
          msg = 'Invalid value for *' + i + '*, ' + checker.nstructions;
        }
      }
    }
    return this.hasErrors();
  },

  hasErrors() {
    return this.messages.length !== 0;
  }
};
```

```js
// 
// 空の値ではないか検査
validator.types.isNonEmpty = {
  valicate(value) {
    return value != '';
  },
  instructions: 'the value cannot be empty'
};

// 値が数値か検査
validator.types.isNumber = {
  validate(value) {
    return !isNaN(value);
  },
  instructions: 'the value can only be a valid number, e.g. 1, 3.14 or 2010'
};

// 値が英数字か検査
validator.types.isAlphaNum = {
  validate(value) {
    return !/[^a-z0-9]/i.test(value);
  },
  instructions: 'the value can only contain characters and numbers, no special symbols'
};
```

```js
// Usage
let data = {
  first_name: 'Super',
  last_name: 'Man',
  age: 'unknown',
  username: 'o_O'
};

// - `last_name` は省略可能
// - `first_name` はなんであれ受け入れる
// - `age` は数字
// - `username` は英数字のみ

validator.config = {
  first_name: 'isNonEmpty',
  age: 'isNumber',
  username: 'isAlphaNum'
};
```
