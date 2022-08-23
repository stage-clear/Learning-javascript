# A 世の中の関数型 JavaScript

## A.1 JavaScript 関数型ライブラリ

## A.2 Functional JavaScript

[Functional JavaScript](http://osteele.com/sources/javascript/functional/)  

```js
map(function(n){ return n * n}, [1,2,3,4]);
//=> [2,3,6,8]

// Functional JavaScript の文字列リテラルを使うと同じ命令が次のように記述できる
map('n*n', [1,2,3,4]);

// Functional JavaScript は文字列リテラルを使用したカリー化も提供します.
var lessThan5 = rcurry('<', 5);
lessThan5(4);
//=> true
lessThan5(44);
//=> false
```

### A.2.1 Underscore-contrib

- [Underscore-contrib](https://github.com/documentcloud/underscore-contrib)
- [Lemonad](https://github.com/fogus/lemonad)

```js
var a = ['a','a','b','a'];
var m = _.explode('missisippi');

_.frequencies(a);
//=> {a:3, b:1}

_.frequencies(m);
//=> {p:2, s:4, i:4, m:1}
```

### A.2.2 RxJS

- [RxJS](https://github.com/Reactive-Extensions/RxJS)

```js
var codes = [
  38, // up
  38, // up
  40, // down
  40, // down
  37, // left
  39, // right
  37, // left
  39, // right
  66, // b
  65  // a
];

function isKonami(seq) {
  return seq.sequenceEqual(codes);
}

var keyPressStrem = $(document).keyupAsObservable()
  .map(function(e) { return e.keyCode; })
  .windowWithCount(10, 10);

keyPressStream
  .selectMany(isKonamiCode)
  .where(_.identity)
  .subscribe(function(){
    alert('30機持ってます');
  });
```

### A.2.3 Bilby

- [Bilby](https://github.com/puffnfresh/bilby.js)

```js
var animals = {
  bilby.environment();
};

function voice(type, sound) {
  return [type, 'が', sound, 'と言う'].join(' ');
}

function isA(thing) {
  return function (obj) {
    return obj.type == thing;
  }
}

function say(sound) {
  return function(obj) {
    console.log(voice(obj.type, sound));
  }
}

var animals = animals.method('speak', isA('猫'), say('にゃー'));

animals.speak({type, '猫'});
```

### A.2.4 [allong.es](http://allong.es/)
便利な関数コンビネータを提供します

```js
var iterators = require('./allong.es').iterators;
var take = iterators.take,
    map = iterators.map,
    drop = iterators.drop;

var ints = iterators.numbers();

var squares = take(drop(map(ints, function(){
  return n * n;
}), 100000), 100);
```
