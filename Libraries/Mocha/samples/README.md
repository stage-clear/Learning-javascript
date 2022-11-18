# サンプル

## 基本的
```js
function add (x, y) {
  return x + y;
}

describe('add関数のテスト', function() {
  it('1+2は3である', function () {
    assert(add(1, 2) === 3) // Good
  })

  it('1+2は4である', function () {
    expect(add(1, 2)).equal(4) // Bad
  })
})
```

## 非同期
```js
function asyncTest (x, callback) {
  setTimeout(() => {
    callback({x})
  }, 3000)
}

mocha.timeout(5000)

describe('非同期関数のテスト', function () {
  it('asyncText', function (done) {
    asyncTest(40, (res) => {
      expect(res.x).equal(50)
      done()
    })
  })
})
```
