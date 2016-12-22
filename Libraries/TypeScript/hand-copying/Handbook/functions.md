# Functions
- [Typescript - Functions](https://www.typescriptlang.org/docs/handbook/functions.html)

## Introduction
## Functions

```typescript
// Named function
function add(x, y) {
  return x + y
}

// Anonymous function
let myAdd = function(x, y) {
  return x + y
}
```

```typescript
let z = 100
function addToZ(x, y) {
  return x + y + z
}
```

## Function Types
### Typing the function

```typescript
function add(x: number, y: number): number {
  return x + y
}

let myAdd = function(x: number, y: number) {
  return x + y
}
```

### Writing the function type
```typescript
let myAdd: (x: number, y: number) => number = 
  function( x: number, y:number): number {
    return x + y
  }
```

```typescript
let myAdd: (baseValue: number, increment: number) => number = 
  function(x: number, y: number): number {
    return x + y
  }
```

### Inferring the types

```typescript
// myAdd has the full function type
let myAdd = function(x: number, y: number): number {
  return x + y
}

// The parameters 'x' and 'y' have the type number
let myAdd: (baseValue: number, increment: number) => number = 
  function(x, y) {
    return x + y
  }
```

## Optional and Default Parameters
```typescript
function buildName(firstName: string, lastName: string) {
  return firstName + ' ' + lastName
}

let result1 = buildName('Bob')                  // error, too few parameters
let result2 = buildName('Bob', 'Adams', 'Sr.')  // error, too many parameters
let result3 = buildName('Bob', 'Adams')         // ah, just right
```

```typescript
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName
  } else {
    return firstName
  }
}

let result1 = buildName('Bob')                  // works correctly now
let result2 = buildName('Bob', 'Adams', 'Sr.')  // error, too many parameters
let result3 = buildName('Bob', 'Adams')         // ah, just right
```

```typescript
// Default-initalized parameters
function buildName(firstName: string, lastName?: string) {
  // ...
}

// and 
function buildName(firstName: string, lastName = 'Smith') {
  // ...
}
```

```typescript
function buildName(firstName = 'will', lastName: string) {
  return firstName + ' ' + lastName
}

let result1 = buildName('Bob')                  // error, too few parameters
let result2 = buildName('Bob', 'Adams', 'Sr.')  // error, too many parameters
let result3 = buildName('Bob', 'Adams')         // okay and returns "Bob Adams"
let result4 = buildName(undefined, 'Adams')     // okay and returns "Will Adams"
```

## Rest Parameters

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstname + ' ' + restOfName.join(' ')
}

let emplyeeName = buildName('Joseph', 'Samual', 'Lucas', 'MacKinzie')
```

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + ' ' + restOfName.join(' ')
}
let buildNameFun: (fname: string, ...rest: string[]) => string = buildName
```

## this
### this and arrow functions

```typescript
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    return function() {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 } // Error! this
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPikcer()

alert('card: ' + pickedCard.card + ' of ' + pickedCard.suit)
```

```typescript
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    // Note: the line below is now an arrow function,
    // arrowing us to capture 'this' right here.
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()

alert('card: ' + pickedCard.card + ' of ' + pickedCard.suit)
```

### this parameters

```typescript
function f (this: void) {
  // make suire `this` is unusable in this standalone function
}
```

```typescript
interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: string[]
  cards: number[]
  createCardPicker(this: Deck): () => Card
}

let deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  // NOTE: The function now explicitly specifies that its callee must be of type Deck
  createCardPicker: function(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      
      return { suit: this.suits[pickedSuit], cards: pickedCard % 13 }
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()

alert('card: ' + pickedCard.card + ' of ' + pickedCard.suit)
```
### _this parameters in callback_

```typescript
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) = void): void
}
```

```tyepscript
// Bad
class Handler {
  info: string
  onClickBad(this: handler, e: Event) {
    // oops, used this here. using this callback would crash at runtime
    this.info = e.message
  }
}

let h = new Handler()
uiElement.addClickListener(h.onClickBad) // Error!
```

```
// OK
class Handler {
  info: string
  onClickGood(this: void, e: Event) {
    // can't use this here because it's of type void!
    console.log('clicked!')
  }
}

let h = new Handler()
uiElement.addClickListener(h.onClickGood)
```

```typescript
class Handler {
  info: string
  onClickGood = (e: Event) => {
    this.info = e.message
  }
}
```

## Overloads

```typescript
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

function pickCard(x): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  }
  // Otherwise just let them pick the cards
  else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], card: x % 13 }
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 }, 
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4}
]
let pickedCard1 = myDeck[pickCard(myDeck)]
alert('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit)

let pickedCard2 = pickCard(15)
alert('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit)
```

```typescript
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

function pickCard(x: { suit: string; card: number; }[]): number
function pickCard(x: number): { suit: string; card: number }
function pickCard(x): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  }
  // Otherwise just let them pick the card
  else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], cardd: x % 13 }
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
]
let pickedCard1 = myDeck[pickCard(myDeck)]
alert('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit)

let pickedCard2 = pickCard(15)
alert('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit)
```
