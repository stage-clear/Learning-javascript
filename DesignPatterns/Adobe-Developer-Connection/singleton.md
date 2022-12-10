# [JavaScript Design Patterns: Singleton](https://www.joezimjs.com/javascript/javascript-design-patterns-singleton/)
- [JavaScriptデザインパターン – 第1部：シングルトン、コンポジット、ファサード](http://www.adobe.com/jp/devnet/html5/articles/javascript-design-patterns-pt1-singleton-composite-facade.html)

```js
let Singleton = {
  prop: 1,
  another_prop: 'value',
  method: function () { /*...*/ },
  another_method: function () { /*...*/ }
};
```

### プライベートなプロパティやメソッドを扱う例:
```js
// プライベートなプロパティやメソッドを作成する場合は、
// クロージャおよび自己実行型匿名関数（即時関数）を使用します
let Singleton = (function () {
  let private_prop = 0;
  let private_method = () => {
    console.log('This is private');
  };
  
  return {
    prop: 1,
    another_prop: 'value',
    method () {
      private_method();
      return private_prop;
    }
  };
})();
```

### シングルトンを使用した名前空間の定義:
```js
let Namespace = {
  Util: {
    util_method1 () { /*...*/ },
    util_method2 () { /*...*/ }
  },
  Ajax: {
    ajax_method () { /*...*/ }
  },
  some_method () { /*...*/ }
};

Namespace.Util.util_method();
Namespace.Ajax.ajax_method();
Namespace.some_method();
```
