# リビーリングモジュールパターン

```js
let myRevealingModule = function () {
  let privateVar = 'Ben';
  let publicVar = 'Hi there!';
  
  function privateFunction () {
    console.log('Name: ' + privateVar);
    return `Name: ${privateVar}`;
  }
  
  function publicSetName (strName) {
    privateVar = strName;
  }
  
  function publicGetName () {
    return privateFunction();
  }
  
  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  }
}();
```

```js
myRevealingModule.setName('Paul Kinlan');
```
