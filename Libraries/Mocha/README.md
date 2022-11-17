# [Mocha](https://mochajs.org/)

## ブラウザで使う
```html
<link href="https://unpkg.com/mocha/mocha.css" rel="stylesheet" />
<script src="https://unpkg.com/chai/chai.js"></script>
<script src="https://unpkg.com/mocha/mocha.js"></script>
```

```html
<script>
  mocha.setup('bdd')
  expect = chai.expect
</script>

<script src="./__tests__/moduleA.test.js"></script>
<script src="./__tests__/moduleB.test.js"></script>
<script src="./__tests__/moduleC.test.js"></script>

<script>
  mocha.checkLeaks()
  mocha.globals(['jQuery'])
  mocha.run()
</script>
```
