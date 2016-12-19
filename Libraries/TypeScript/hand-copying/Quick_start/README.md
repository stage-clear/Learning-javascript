# Try "Quick start"

## Installing TypeScript
<sup>_TypeScript をインストールする_</sup>

```sh
$ npm install -g typescript
```

## Building your first TypeScript file
<sup>_はじめての TypeScript ファイルを作成する_</sup>

次の JavaScript コードを `greeter.ts` として保存します。
```js
// greeter.ts
function greeter(person) {
  return 'Hello, ' + person
}

var user = 'Jane User'

document.body.innerHTML = greeter(user)
// > "Hello, Jane User"
```

## Compiling your code
<sup>_コードをコンパイル_</sup>

```sh
$ tsc greeter.ts
// There is the output file as 'grtter.js'
```

## Type annotations
<sup>_型注釈_</sup>

```js
function greeter(person: string) {
  return 'Hello, ' + person
}

var user = 'Jane User'
document.body.innerHTML = greeter(user)
// > "Hello, Jane User"
```

## インターフェイス
<sup>_Interfaces_</sup>

```js
interface Person {
  firstName: string
  lastName: string
}

function greeter(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName
}

var user = {
  firstName: 'Jane',
  lastName: 'User'
}

document.body.innerHTML = greeter(user)
// > "Hello, Jane User"
```

## Classes
<sup>_クラス_</sup>

```js
class Student {
  fullName: string
  constructor(public firstName, public middleInitial, public lastName) {
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName
  }
}

interface Person {
  firstName: string
  lastName: string
}

function greeter(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName
}

var user = new Student('Jane', 'M.', 'User')

document.body.innerHTML = greeter(user)
// > "Hello, Jane User"
```

## Running your TypeScript web app 
<sup>_TypeScript アプリを実行する_</sup>

```html
<!-- greeter.html -->
<!doctype html>
<html>
  <head>
    <title>TypeScript Greeter</title>
  </head>
  <body>
    <script src="gteeter.js"></script>
  </body>
</html>
```
