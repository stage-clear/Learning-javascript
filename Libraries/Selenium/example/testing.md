# Testing

- use Mocha

```js
// test.js
const webdriver = require('selenium-webdriver');
const t = require('selenium-webdriver/testing');
const By = webdriver.By;
const assert = require('assert');

let driver ;

t.describe('Testing', () => {
  t.before(() => {
    driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();
    driver.get('http://www.google.co.jp').then(() => {
      return ;
    });
  });
  
  t.after(() => {
    driver.quit();
  });
  
  // Test 1
  t.it('This test is async.', (done) => {
    driver.wait(
      driver.findElement(By.css('body'), 5000)
    ).then(() => {
      return done(); // <-
    });
  });
  
  // Test2
  t.it('This test is fault', () => {
    assert.equal('', 'Oops');
  });
  
  // Test 3
  t.it('This test is clear', () => {
    assert.equal('Tadaaa', 'Tadaaa');
  });
});

```

```sh
$ mocha test.js --timeout 15000
```
