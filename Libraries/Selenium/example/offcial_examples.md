# Offcial Examples
- [Official Tutorials](http://seleniumhq.github.io/selenium/docs/api/javascript/)

## Introcuction
### Official example: Usage :heavy_check_mark:
```js
// example.js
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

let driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilites.chrome())
  .build();

driver.get('http://www.google.co.jp');
driver.findElement(By.name('q')).sendKeys('webdriver'); 
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google 検索'), 1000); 
driver.quit();
```

```sh
$ node example.js
```

### Offcial Example 2: Using the Builder API :heavy_check_mark:
- It is required geckodriver. ([download](https://github.com/mozilla/geckodriver/releases/))

```js
// example.js
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

let driver = new webdriver.Builder()
  .forBrowser('firefox')
  .setChromeOptions()
  .setFirefoxOptions()
  .build();
```

```sh
$ node example.js
# SELENIUM_BROWSER=chrome node example.js
# SELENIUM_BROWSER=safari node example.js
```

### Offcial Example: The Standalone Selenium Server :heavy_check_mark:
```sh
$ java -jar selenium-server-standalone-x.x.x.jar
```

```js
// example.js
const webdriver = require('selenium-webdriver');

let driver = new webdriver.Builer()
  .forBrowser('firefox')
  .usingServer('http://localhost:4444/wd/hub')
  .build();
```

```sh
$ SELENIUM_REMOTE_URL="http://localhost:4444/wd/hub" node example.js
```

## class Builder
```js
// example.js
const webdriver = require('selenium-webdriber');

let driber = new webdriber.Builder()
  .forBrowser('chrome')
  .build();
```

```sh
$ SELENIUM_BROWSER=chrome:36 SELENIUM_REMOTE_URL="http://localhost:4444/wd/hub" node example.js
```
