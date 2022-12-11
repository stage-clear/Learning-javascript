# [Flyweight](https://designpatternsgame.com/patterns/flyweight)

## 定義
共有を使って、大量の細かいオブジェクトを効率的にサポートする。

## こんなときに使う
...アプリケーションが多くのスモールオブジェクトを使用し、その保存にコストがかかるか、またはその識別が重要でない場合。

## 実装例
### ES6
```js
class Color {
  constructor (name) {
    this.name = name
  }
}

class colorCreator {
  constructor () {
    this.colors = {}
  }
  
  create (name) {
    let color = this.colors[name]
    if (color) return color
    
    this.colors[name] = new Color(name)

    return this.colors[name]
  }
}

export { colorCreator }
```

### ES5
```js
function Color (name) {
  this.name = name
}

var colorCreator = {
  color: {},
  create: function (name) {
    var color = this.colors[name];
    if (color) return color;
    
    this.colors[name] = new Color(name);
    
    return this.colors[name];
  }
};

module.exports = colorCreator;
```
