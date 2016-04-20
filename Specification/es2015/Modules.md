モジュール
========

- 宣言的でシンプルなモジュールのインポートとエクスポートの文法
- 読み込み方法は同期にも非同期にも対応可能
- `import` や `export` はモジュールのトップレベル以外には書けない
  ( `if` や関数の中には書けない) 
- ES6モジュールは必ず strict モードとして実行される
- ES6モジュール内では、`this` が `undefined` になる


Export
------

### 基本構文

```javascript
export default 1;
export default NaN;
export default 'foo';
export default {foo: 'bar'};
export default ['foo', 'bar'];
export default () => {};
```

### 名前付きエクスポート


```javascript
// module.js
// メンバをエクスポート
export var foo = 'foo!';
export function bar() {}
export class Baz {
  baz() {}
}

// 参照はない
setTimeout(()=> foo = 'baz', 500);
```


### デフォルトエクスポート

- モジュール1つに対して、1つのメンバに限り名前指定不要でインポートできる

```javascript
// foo.js
export default 'foo!'

// bar.js
export default function() {
  console.log('bar!');
}

// baz.js
export default class {
  constructor() {
    console.log('Baz!');
  }
}
```

### Exporting Lists

```js
var foo = 'ponyfoo';
var bar = 'baz';
export {foo, bar};

// use `Alias`
export {foo as ponyfoo};

// use `Default`
export {foo as default, bar};
```

### Best Practices and export

```js
var api = {
  foo: 'bar',
  baz: 'ponyfoo'
};

exprot default api;
```


import
-------

### 基本構文

```js
import _ from 'lodash';
```

### 名前付きインポート

```javascript
// `destructuring assingment` を使う
import {foo, bar, Baz} from './module';
// `aliased` インポートする変数名の指定
import {foo as poo, bar} from './module';

import {default, map} from 'lodash';
import {default as _, map} from 'lodash';
import _, {map} from 'lodash';
```

### まとめてインポート

```js
import * as module from './module';
console.log(module.foo);// foo!

import * as _ from 'lodash';
```


### デフォルトインポート

```javascript
import a from './foo';
import b from './bar';
import c from './baz';

console.log(a); // foo!
b();// bar!
new c(); // Baz!
```


代替方法
------

- [Browserify](http://browserify.org/)
- [Babelify](https://github.com/babel/babelify)
- [webpack](https://webpack.github.io/)
- [System.js](https://github.com/systemjs/systemjs)


リンク
-----

- [ES6 Modules in Depth](https://ponyfoo.com/articles/es6-modules-in-depth)
