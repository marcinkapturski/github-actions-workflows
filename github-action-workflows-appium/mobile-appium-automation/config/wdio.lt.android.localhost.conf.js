require('dotenv').config();

const { config } = require('./wdio.shared.conf');

config.user = process.env.LAMBDATEST_USER;
config.key = process.env.LAMBDATEST_KEY;

config.capabilities = [
  {
    platformName: 'android',
    deviceName: 'Galaxy S20',
    platformVersion: '10',
    visual: true,
    network: true,
    video: true,
    build: 'Sample - LOCALHOST build',
    name: process.env.TEST_TYPE,
    project: 'Sample',
    deviceOrientation: 'portrait',
    autoGrantPermissions: true,
    autoAcceptAlerts: true,
    isRealMobile: true,
    console: true,
    coloredLogs: true,
    path: '/wd/hub',
    hostname: 'mobile-hub.lambdatest.com',
    port: 80,
    logFile: './mobile-appium-automation',
  },
];
config.connectionRetryTimeout = 4200000;
config.connectionRetryCount = 0;
config.waitforTimeout = 90000;
config.timeout = 90000;
config.specs = [['../features/**']];
config.cucumberOpts.require = ['./mobile-appium-automation/step-definitions/**.js'];
config.services = [
  [
    'lambdatest',
    {
      tunnel: true,
    },
  ],
];
config.baseUrl = 'http://localhost.lambdatest.com:3000/';

exports.config = config;
