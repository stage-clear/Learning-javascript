# Try "Quick start"

## TypeScript をインストールする
<sup>_Installing TypeScript_</sup>

```sh
$ npm install -g typescript
```

## はじめての TypeScript ファイルを作成する
<sup>_Building your first TypeScript file_</sup>

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

## コードをコンパイル
<sup>_Compiling your code_</sup>

```sh
$ tsc greeter.ts
// There is the output file as 'grtter.js'
```

## 型注釈
<sup>_Type annotations_</sup>

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

## クラス
<sup>_Classes_</sup>

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

## 走らせる 
<sup>_Running your TypeScript web app_</sup>

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
