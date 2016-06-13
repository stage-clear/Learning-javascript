# this

## Arror functions 
- [Reference link](http://rainsoft.io/when-not-to-use-arrow-functions-in-javascript/)

### Object literal

```js
let a = {
  name: 'a',
  run: () => {
    console.log(`[${a.name}]`, '`this` is `window` = ', this === window);
  }
};
a.run();
```

```js
let b = {
  name: 'b',
  run() {
    console.log(`[${this.name}]`, '`this` is `b` = ', this === b);
  }
};
b.run();
```

## Object prototype

```js
function C(name) {
  this.name = name;
}
C.prototype.run = () => {
  console.log(`[${c.name}]`, '`this` is `window` = ', this === window);
}
let c = new C('c');
c.run();
```

```js
function D(name) {
  this.name = name;
}
D.prototype.run = function() {
  console.log(`[${this.name}]`, '`this` is `d` = ', this === d);
}
let d = new D('d');
d.run();
```

### Callback functions
```html
<button id="button1">button1</button>
<button id="button2">button2</button>
```
```js
let button1 = document.getElementById('button1');
button1.addEventListener('click', () => {
  console.log(`[${button1.id}]`, '`this` is `window`', this === window);
});
button1.click();
```

```js
let button2 = document.getElementById('button2');
button2.addEventListener('click', function() {
  console.log(`[${this.id}]`, '`this` is `button2`', this === button2);
});
button2.click();
```


## 参考リンクなど

- [じゃあ this の抜き打ちテストやるぞー](http://qiita.com/KDKTN/items/0b468a07410d757ac609)
