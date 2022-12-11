# [Bridge](https://designpatternsgame.com/patterns/bridge)
抽象化を実装から分離して、2 つが独立して変化できるようにします。

...例えば、実行時にそれぞれを選択する必要がある場合、抽象化とその実装の間のバインディングを避けたい。

## ES6
```js
class Printer {
  constructor (ink) {
    this.ink = ink
  }
}

class EpsonPrinter extends Printer {
  constructor (ink) {
    super(ink)
  }
  
  print () {
    return 'Printer: Epson, Ink: ' + this.ink.get()
  }
}

class HPprinter extends Printer {
  constructor (ink) {
    super(ink)
  }

  print () {
    return 'Printer: HP, Ink: ' + this.ink.get()
  }
}

class Ink {
  constructor (type) {
    this.type = type
  }
  
  get () {
    return this.type
  }
}

class AcrylicInk extends Ink {
  constructor () {
    super('acrylic-based')
  }
}

class AlcoholInk extends Ink {
  constructor () {
    super('alcohol-based')
  }
}

export { EpsonPrinter, HPprinter, AcrylicInk, AlcoholInk }
```

## ES5
```js
function EpsonPrinter (ink) {
  this.ink = ink();
}

EpsonPrinter.prototype.print = function () {
  return 'Printer: Epson, Ink: ' + this.ink;
};

function HPprinter (ink) {
  this.ink = ink();
}
HPprinter.prototype.print = function () {
  return 'Printer: HP, Ink: ' + this.ink;
};

function acrylicInk () {
  return 'acrylic-based';
}

function alcoholInk () {
  return 'alcohol-based';
}

module.exports = [EpsonPrinter, HPprinter, acrylicInk, alcoholInk];
```





