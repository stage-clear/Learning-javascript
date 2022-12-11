# [Prototype](https://designpatternsgame.com/patterns/prototype)

## 定義
プロトタイプのインスタンスを使って作成するオブジェクトの種類を指定し、このプロトタイプをコピーして新しいオブジェクトを作成します。

## こんなときに使う...
...インスタンス化するクラスは、実行時にのみ利用可能です。

## 実装例
### ES6
```js
class Sheep {
  constructor (name, weight) {
    this.name = name
    this.weight = weight
  }
  
  clone () {
    return new Sheep(this.name, this.weight)
  }
}

export default Sheep
```

### ES5
```js
function Sheep(name, weight) {
  this.name = name;
  this.weight = weight;
}

Sheep.prototype.clone = function () {
  return new Sheep(this.name, this.weight);
};

module.exports = Sheep;
```

