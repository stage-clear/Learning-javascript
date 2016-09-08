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

## Links
- [UIテストの自動化！Node.jsとSeleniumでWebアプリのUIテスト環境構築](https://ics.media/entry/5759/2)
- [Selenium WebDriverで実践的テストケースを作成する（node.js編）](http://solutionware.jp/blog/2016/03/30/selenium-webdriver%E3%81%A7%E5%AE%9F%E8%B7%B5%E7%9A%84%E3%83%86%E3%82%B9%E3%83%88%E3%82%B1%E3%83%BC%E3%82%B9%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B%EF%BC%88node-js%E7%B7%A8%EF%BC%89/)
