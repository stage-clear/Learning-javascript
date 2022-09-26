# サブクラス化

```js
let Person = function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = 'male';
}

let clark = new Person('Clark', 'Kent');

let Superhero = function (firstName, lastName, powers) {
  Person.call(this, firstName, lastName);

  this.powers = powers;
}

Superhero.prototype = Object.create(Person.prototype);

let superman = new Superhero('Clark', 'Kent', ['flight', 'heat-vision']);
console.log(superman);
```
