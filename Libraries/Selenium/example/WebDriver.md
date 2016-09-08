# WebDriber

```js
/**
 * WebDriver
 * @see http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebDriver.html
 * @member actions()<ActionSequence>
 * @member call(fn, opt_scope, var_args)
 * @member close()
 * @member controlFlow()
 * @member executeAsyncScript(script, var_args)
 * @member executeScript(script, var_args)
 * @member findElement(locator)
 * @member findElements(locator)
 * @member get(url)
 * @member getAllWindowHandles()
 * @member getCapabilities()
 * @member getCurrentUrl()
 * @member getExecutor()
 * @member getPageSource()
 * @member getSession()
 * @member getTItle()
 * @member getWindowHandle()
 * @member manage()
 * @member navigate()
 * @member quit()
 * @member <T>schedule(command, description)
 * @member setFileDetector(detector)
 * @member sleep(ms)
 * @member swithTo()
 * @member takeScreenshot()
 * @member touchActions()<TouchSequence>
 * @member <T>wait(condition, opt_timeout, opt_message)
 * @member static WebDriber.attachToSession(executor, sessionId, opt_flow)
 * @member static WebDriber.createSession(executor, capabilities, opt_flow)
 */

const webdriver = require('selenium-webdriver');
const By = webdriver.By;

let driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

driver.get('http://www.yahoo.co.jp').then(() => {
  driver.actions()
    .click( 
      driver.findElement( By.js('var e = document.querySelectorAll(".emphasis li > a")[0]; return e;') )
    ).perform();

  // Take a screenshot. 
  driver.takeScreenshot().then((image, err) => {
    require('fs').writeFile('screenshot.png', image, 'base64', (err) => {
      console.log(err);
    });
  });

  driver.sleep(1000);
  driver.quit();
});
```
