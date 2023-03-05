const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

const setupNodeEvents = async (on, config) => {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  return config;
};

module.exports = defineConfig({
  env: {
    home_page: "http://localhost:3000",
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 5000,
  chromeWebSecurity: false,
  fixturesFolder: false,
  e2e: {
    hideXHRInCommandLog: true,
    setupNodeEvents,
    specPattern: "**/*.feature",
    baseUrl: "http://localhost:3000",
    excludeSpecPattern: ["*.js"],
  },
});
