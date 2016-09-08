# By

```js
const webdriver = require('selenium-webdriver');
const By = webdriver.By; // <-

let driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

driver.get('https://www.wikiwand.com/ja/JavaScript').then(() => {
  // by className
  driver.findElement(By.className('first-paragraph')).getText().then((text) => {
    console.log(`[by className] ${text}`);
  });

  // by css
  driver.findElement(By.css('.first-paragraph')).getText().then((text) => {
    console.log(`[by css] ${text}`);
  });

  // by id
  driver.findElement(By.id('.E6.A6.82.E8.A6.81')).getText().then((text) => {
    console.log(`[by id] ${text}`);
  });

  // by linkText
  driver.findElement(By.js('var e = document.querySelectorAll("h2")[3]; return e;')).getText().then((text) => {
    console.log(`[by js] ${text}`);
  });

  // by linkText
  driver.findElement(By.linkText('パラダイム')).getText().then((text) => {
    console.log(`[by linkText] ${text}`);
  });

  // by name
  driver.findElement(By.name('keywords')).getTagName().then((res) => {
    console.log(`[by name] ${res}`);
  });

  // by partialLinkText
  driver.findElement(By.partialLinkText('ブレンダン・アイク')).getText().then((res) => {
    console.log(`[by partialLinkText] ${res}`);
  });

  // by tagName
  driver.findElement(By.tagName('h1')).getText().then((res) => {
    console.log(`[by tagName] ${res}`);
  });

  // by XPath
  driver.findElement(By.xpath('id(".E6.96.87.E6.B3.95")')).getText().then((res) => {
    console.log(`[by xpath] ${res}`);
  });
});
```
