# Builder

```js
/**
 * Builder
 * @class
 * @member build()
 * @member buildAsync()
 * @member disableEnvironmentOverride()
 * @member forBrowser(name, opt_version, opt_platform)
 * @member getCapabilities()
 * @member getFirefixOptions()
 * @member getHttpAgent()
 * @member getServerUrl()
 * @member getWebDriverProxy()
 * @member getAlertBehavior(behavior)
 * @member setChromeOptions(options)
 * @member setControlFlow(flow)
 * @member setEdgeOptions(options)
 * @member setEnableNativeEvents(enabled)
 * @member setFirefoxOptions(options)
 * @member setIeOptions(options)
 * @member setLoggingPrefs(prefs)
 * @member setOperaOptions(options)
 * @member setProxy(config)
 * @member setSafariOptions(options)
 * @member setScrollBehavior(behavior)
 * @member usingHttpAgent(agent)
 * @member usingServer(url)
 * @member usingWebDriverProxy(proxy)
 * @member withCapabilities(capabilities)
 */

const webdriber = require('selenium-webdriber');

let driver = new webdriber.Builder()
  .forBrowser('chrome')
  .build();
```
