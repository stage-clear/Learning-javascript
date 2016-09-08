# Examples

### Example 1:
```js
const webdriver = require('selenium-webdriver');
let driver ;

driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

driver.get('http://www.google.co.jp').then(() => {
  driver.quit();
});
```

```sh
$ node index
```

### Simple test 2:
```js
const webdriber = require('selenium-webdriver');
const t = require('selenium-webdriver/testing');
const By = webdriber.By;

let driver ;

t.describe('Test 1', () => {
  let loaded = false;
  
  t.before(() => {
    driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();

    driver.get('http://www.google.co.jp').then(() => {
      loaded = true;
    });
  });
  
  t.after(() => {
    // driver.quit();
  });
});
```

```sh
$ mocha index

# if you got "Error: timeout of 2000ms exceeded. Ensure the done()", set the timeout time.
$ mocha index --timeout 10000
```
