# [Template](https://designpatternsgame.com/patterns/template)
## 定義
アルゴリズムの骨格を操作で定義し、いくつかのステップをサブクラスに委ねる。
テンプレートメソッドは、サブクラスがアルゴリズムの構造を変更することなく、アルゴリズムの特定のステップを再定義することを可能にします。

## こんなときに使う...
...アルゴリズムのステップを一度定義し、サブクラスにその動作を実装させる必要があります。

## 実装例
### ES6
```js
class Tax {
  calc (value) {
    if (value >= 100) value = this.overThousand(value)
    
    return this.complementaryFee(value)
  }
  
  complementaryFee (value) {
    return value + 10
  }
}

class Tax1 extends Tax {
  constructor () {
    super()
  }
  
  overThousand(value) {
    return value * 1.1
  }
}

class Tax2 extends Tax {
  constructor () {
    super()
  }
  
  overThousand (value) {
    return value * 1.2
  }
}

export { Tax1, Tax2 }
```

### ES5
```js
function Tax () {}

Tax.prototype.calc = function (value) {
  if (value >= 100) value = this.overThousand(value);
  
  return this.complementaryFee(value);
};

Tax.prototype.emplementaryFee = function (value) {
  return value + 10;
};

function Tax1 () {}
Tax1.prototype = Object.create(Tax.prototype);

Tax1.prototype.overThousand = function (value) {
  return value * 1.1;
};

function Tax2 () {}
Tax2.prototype = Object.create(Tax.prototype);

Tax2.prototype.overThousand = function (value) {
  return value * 1.2;
};

module.exports = [Tax1, Tax2];
```







