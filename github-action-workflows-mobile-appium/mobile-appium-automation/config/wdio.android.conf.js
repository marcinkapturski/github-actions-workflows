const { config } = require('./wdio.shared.conf');

config.capabilities = [
  {
    platformName: 'Android',
    'appium:platformVersion': '12.0',
    'appium:deviceName': 'emulator-5554',
    'appium:automationName': 'UIAutomator2',
    'appium:browserName': 'chrome',
  },
];
config.connectionRetryTimeout = 4200000;
config.connectionRetryCount = 0;
config.waitforTimeout = 90000;
config.timeout = 90000;
config.specs = [['../features/**']];
config.cucumberOpts.require = ['./mobile-appium-automation/step-definitions/**.js'];
config.baseUrl = 'http://localhost:3000';
config.services = [
  [
    'appium',
    {
      args: {
        address: 'localhost',
        port: 4723,
      },
      logPath: './',
    },
  ],
];

exports.config = config;
