exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  baseUrl: 'http://localhost/',

  specs: [ 'spec/**/*_spec.js' ],
  exclude: [],

  capabilities: {
    browserName: 'chrome'
  },

/*
multiCapabilities: [
  {
    'browserName': 'firefox'
  },
  {
    'browserName': 'chrome'
  }
],
*/

  framework: 'jasmine',
  jasmineNodeOpts: {
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },
};