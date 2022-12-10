# Singleton ([Design Patterns Game](https://designpatternsgame.com/patterns/singleton))

```js
// ES6
class Person {
  constructor () {
    if (typeof Person.instance === 'object') {
      return Person.instance;
    }
    
    Person.instance = this;
    
    return this;
  }
}

export default Person;
```

```js
// ES5
function Person () {
  if (typeof Person.instance === 'object') return Person.instance;
  
  Person.instance = this;
  
  return this;
}

module.exports = Person;
```
