# Selenium

- use Node.js

## 1. Install the selenium-webdriver
```sh
$ npm -g install selenium-webdriver
```

## 2. Download the selenium-server
- [http://www.seleniumhq.org/download/](http://www.seleniumhq.org/download/)

Error:
> "java -jar selenium-server-standalone-x.x.x.jar"コマンドラインツールを使用するには、JDK をインストールする必要があります。  
> [Download](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

## 3. [Tests example](./example/)

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

## Error
### `Error: timeout of 2000ms exceeded. Ensure the done()`
```sh
$ mocha test/index.js --timeout 10000
```

### `Selenium is already running on port 4444. Or some other service is.`
```
$ lsof -i TCP

# it find the command as java to its PID
$ kill <PID>
```
