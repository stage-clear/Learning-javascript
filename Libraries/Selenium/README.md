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


## 4. Error and Trable shooting
### :astonished: Error: timeout of 2000ms exceeded. Ensure the done()
```sh
$ mocha test/index.js --timeout 10000
```

### :astonished: Selenium is already running on port 4444. Or some other service is.
```
$ lsof -i TCP

# it find the command as java to its PID
$ kill <PID>
```
