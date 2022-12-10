# [JavaScript Design Patterns: Command](https://www.joezimjs.com/javascript/javascript-design-patterns-command/)

```js
var EnableAlarm = function (alarm) {
  this.alarm = alarm;
};

EnableAlarm.prototype.execute = function () {
  this.alarm.enable();
};

var DisableAlarm = function (alarm) {
  this.alarm = alarm;
};
DisableAlarm.prototype.execute = function () {
  this.alarm.disable();
};

var SetAlarm = function (alarm) {
  this.alarm = alarm;
};
SetAlarm.prototype.execute = function () {
  this.alarm.set();
};
```

```js
var alarms = [/* array of alarms */];
var i = 0;
var len = alarms.length;

for (; i < len; i++) {
  var enable_alarm = new EnableAlarm(alarms[i]);
  var disable_alarm = new DisableAlarm(alarms[i]);
  var set_alarm = new SetAlarm(alarms[i]);
  
  new Button('Enable', enable_alarm);
  new Button('Disable', disable_alarm);
  new Button('Set', set_alarm);
}
```

```js
var makeCommand = function (object, methodName) {
  return {
    execute: function () {
      object[methodName]();
    },
  }
}

var alarms = [/* array of alarms */ ];
var i = 0;
var len = alarms.length;

for (; i < len; i++) {
  var enable_alarm = makeCommand(alarms[i], 'enable');
  var disable_alarm = makeCommand(alarms[i], 'disable');
  var set_alarm = makeCommand(alarms[i], 'set');

  new Button('enable', enable_alarm);
  new Button('disable', disable_alarm);
  new Button('set', set_alarm);
}
```

```js
var alarms = [/* array of alarms */ ];
var i = 0;
var len = alarms.length;

for (; i < len; i++) {
  new Button('enable', alarm.enable);
  new Button('disable', alarm.disable);
  new Button('set', alarm.set);
}
```
