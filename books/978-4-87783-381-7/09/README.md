# オブジェクト
p5.js がベースとしている JavaScript のオブジェクトについて

## 9.1 オブジェクトを使う

### 9.1.1 プロパティの使い方

### 9.1.2 オブジェクトを使って線を描画する

```js
// DrawLine
function setup() {
  var pt, prev_pt;
  
  createCanvas(320, 320);
  
  for (var i = 0; i < 10; i++) {
    pt = generate_point();
    if (i > 0) {
      drawLine(pt, prev_pt);
    }
    pret_pt = pt;
  }
}

function draw() {
  
}

function drawLine(p1, p2) { // 2つのオブジェクトを受け取り直線を描画する
  line(p1.x, p1.y, p2.x, p2.y);
}

function generate_point() {
  var p = {};
  p.x = random(0, width); // プロパティ x を追加
  p.y = random(0, height); // プロパティ y を追加
  return p; 
}
```


### 9.1.3 より複雑なオブジェクトを扱う

```js
// DrawArc
function setup() {
  createCanvas(320, 320);
  
  for (var i = 0; i < 10; i++) {
    var a = generate_arc();
    drawArc(a);
  }
}

function draw() {
  
}

function drawArc(a) {
  arc(a.center.x, a.center.y, a.size.width, a.size.height, a.angle.start, a.angle.stop);
}

function generate_arc() {
  var a = {
    center: {
      x: 0,
      y: 0
    },
    size: {
      width: 20,
      height: 20
    },
    angle: {
      start: 0,
      stop: PI + QUARTER_PI
    },
  };

  a.center.x = random(0, width); // プロパティ x を変更
  a.center.y = random(0, height); // プロパティ y を変更
  
  return a;
}

```


## 9.2 メソッドを使う

```js
// DrawShape
function setup() {
  var s;
  var x, y;
  
  createCanvas(320, 320);
  background(240);
  
  for (var i = 0; i < 10; i++) {
    x = random(0, width);
    y = random(0, height);
    s = generate_shape(x, y);
    s.draw();
  }
}

function draw() {
  
}

function generate_shape(x, y) {
  var s;
  var shape = Math.floor(random(0, 3));
  
  if (shape === 0) s = generate_circle(x, y);
  else if (shape === 1) s = generate_rect(x, y);
  else if (shape === 2) s = generate_triangle(x, y);
  return s;
}

function generate_circle(x, y) {
  var c = {
    center: {},
    size: {
      width: 20,
      height: 20
    },
    draw: function() {
      ellipse(this.center.x, this.center.y, this.size.width, this.size.height);
    }
  };  
  
  c.center.x = x;
  c.center.y = y;

  return c;
}

function generate_rect(x, y) {
  var r = {
    center: {},
    size: {
      width: 20,
      height: 20
    },
    draw: function() {
      push();
      rectMode(CENTER);
      rect(this.center.x, this.center.y, this.size.width, this.size.height);
      pop();
    }
  };
  
  r.center.x = x;
  r.center.y = y;
  
  return r;
}

function generate_triangle(x, y) {
  var t = {
    p1: {},
    p2: {},
    p3: {},
    draw: function() {
      triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    }
  };
  
  t.p1.x = x;
  t.p1.y = y - 20;
  t.p2.x = x - 20 / Math.sqrt(2);
  t.p2.y = y + 20 / Math.sqrt(2);
  t.p3.x = x + 20 / Math.sqrt(2);
  t.p3.y = y + 20 / Math.sqrt(2);
  
  return t;
}
```


## 9.3 もう一つのオブジェクト生成方法 - `new`

```js
// NewRect

function setup() {
  createCanvas(320, 320);
  
  for (var i = 0; i < 10; i++) {
    var x = random(0, width); // 座標 x を乱数で生成
    var y = random(0, height); // 座標 y を乱数で生成
    var s = new Rect(x, y); // 四角形のオブジェクトを生成
    s.draw();
  }
}

function Rect(x, y) {
  this.center = {
    x: x,
    y: y
  };
  this.size = {
    width: 20,
    height: 20
  };
}

Rect.prototype.draw = function() {
  push();
  rectMode(CENTER);
  rect(this.center.x, this.center.y, this.size.width, this.size.height);
  pop();
};
```


## 9.4 プロトタイプベースのオブジェクト指向

### 9.4.1 クリオネをオブジェクトにする

```js
// ClieoneObject

function setup() {
  var c1 = new Clione(50, 50);
  var c2 = new Clione(20, 20);
  
  c1.draw();
  c2.draw();
}

function draw() {}

function Clione(x, y) {
  this.x = x;
  this.y = y;
}

Clione.prototype.draw = function() {
  push();
  translate(this.x, this.y);
  
  noStroke();
  fill(180, 180, 255);
  ellipse(0, 0, 25, 20);
  ellipse(0, 25, 20, 40);
  triangle(-10, -5, -5, -17, -2, -9);
  triangle(10, -5, 5, -17, +2, -9);
  quad(-10, 10, -30, 15, -20, 25, -5, 25);
  quad(+10, 10, +30, 15,  20, 25,  5, 25);
  fill(255, 0, 0, 70);
  ellipse(0, 0, 15, 13);
  ellipse(0, 20, 13, 27);
  pop();
};
```

## 9.4.2 `move` メソッドを追加する

```js
Clione.prototype.move = function() {
  this.x += Math.floor(random(-4, 4));
  this.y += Math.floor(random(-4, 4));
};
```

```js
function draw() {
    background(255);
    c1.draw();
    c2.draw();
    c1.move();
    c2.move();
}
```

## 9.5 継承

```js
function ClioneL(x, y) {
  this.uber = Clione.prototype;
  this.scale = 1.5;
  Clione.call(this, x / this.scale, y / this.scale);
}

ClioneL.prototype.constructor = ClioneL;
ClioneL.prototype.draw = function() {
  push();
  scale(this.scale);
  this.uber.draw.call(this);
  pop();
};

ClioneL.prototype.move = function() {
  this.uber.move.call(this);
};
```

`constructor` の代わりに `Object.create()` を使う場合。

```js
ClioneL.prototype = Object.create(Clione.prototype);
```


## 9.6 まとめ

