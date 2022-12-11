# [Adapter](https://designpatternsgame.com/patterns/adapter)

```js
// ES6
class Soldier {
  constructor (level) {
    this.level = level
  }
  
  attack () {
    return this.level * 1
  }
}

class Jedi {
  constructor (level) {
    this.level = level
  }
  
  attackWithSaber () {
    return this.level * 100
  }
}

class JediPattern {
  constructor (jedi) {
    this.jedi = jedi
  }
  
  attack () {
    return this.jedi.attackWithSaber()
  }
}

export { Soldier, Jedi, JediPattern }
```

```js
// ES5
function Soldier (lvl) {
  this.lvl = lvl;
}

Soldier.prototype.attack = function () {
  return this.lvl * 1;
};

function Jedi (lvl) {
  this.lvl = lvl;
}

Jedi.prototype.attackWithSaber = function () {
  return this.lvl * 100;
};

function JediPattern (jedi) {
  this.jedi = jedi;
}

JediPattern.prototype.attack = function () {
  return this.jedi.attackWithSaber();
};

module.exports = [Soldier, Jedi, JediPattern];
```
