require('dotenv').config();

const { config } = require('./wdio.shared.conf');

config.user = process.env.LAMBDATEST_USER;
config.key = process.env.LAMBDATEST_KEY;

config.capabilities = [
  {
    deviceName: 'iPhone 13 Pro',
    osVersion: '15',
    platformName: 'iOS',
    visual: true,
    network: true,
    video: true,
    build: 'Sample - DEV build',
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
config.connectionRetryTimeout = 40000;
config.connectionRetryCount = 0;
config.waitforTimeout = 20000;
config.timeout = 20000;
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
config.baseUrl = 'https://marcinkapturski.com/';

exports.config = config;
