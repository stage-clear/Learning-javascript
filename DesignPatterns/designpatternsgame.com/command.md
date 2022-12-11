# [Command](https://designpatternsgame.com/patterns/command)
## 定義
リクエストをオブジェクトとしてカプセル化することで、異なるリクエストを持つクライアントをパラメータ化したり、リクエストをキューに入れたり、ログに記録したり、取り消し可能な操作をサポートしたりすることができるようになります。

## どんなときに使うか...
...処理すべきリクエストのキューがあるとき、またはそれらを記録したいとき。また、"元に戻す "アクションを持ちたいとき。

```js
// ES6
class Cockpit {
  constructor (instruction) {
    this.instruction = instruction
  }
  
  execute () {
    this.instruction.execute()
  }
}

class Turbine {
  constructor () {
    this.state = false
  }
  
  on () {
    this.state = true
  }
  
  off () {
    this.state = false
  }
}

class OnInstruction {
  constructor (turbine) {
    this.turbine = turbine
  }
  
  execute () {
    this.turbine.on()
  }
}

class OffInstruction {
  constructor (turbine) {
    this.turbine = turbine
  }
  
  execute () {
    this.turbine.off()
  }
}

export { Cockpit, Turbine, OnInstruction, OffInstruction }
```

```js
// ES5
function Cockpit (instruction) {
  this.instruction = instruction
}

Cockpit.prototype.execute = function () {
  this.instruction.execute();
};

function Turbine () {
  this.speed = 0;
  this.state = false;
}

Turbine.prototype.on = function () {
  this.state = true;
  this.speed =  100;
};

 Turbine.prototype.off = function () {
   this.speed = 0;
   this.state = false;
 };
 
 Turbine.prototype.speedDown = function () {
   if (!this.state) return ;
   
   this.speed -= 100;
 };
 
 Turbine.prototype.speedUp = function () {
   if (!this.state) return ;
   
   this.speed += 100;
 };
 
 function OnInstruction (turbine) {
   this.turbine = turbine;
 }
 
 OnInstruction.prototype.execute = function () {
   this.turbine.on();
 };
 
 function OffInstruction (turbine) {
   this.turbine = turbine;
 }
 
 OffInstruction.prototype.execute = function () {
   this.turbine.off();
 };
 
 function SpeedUpInstruction (turbine) {
   this.turbine = turbine;
 }
 
 SpeedUpInstruction.prototype.execute = function () {
   this.turbine.speedUp();
 };
 
 function SpeedDownInstruction (turbine) {
   this.turbine = turbine;
 }
 
 SpeedDownInstruction.prototype.execute = function () {
   this.turbine.speedDown();
 };
 
 module.exports = [Cockpit, Turbine, OnInstruction, OffInstruction, SpeedUpInstruction, SpeedDownInstruction];
 ```
