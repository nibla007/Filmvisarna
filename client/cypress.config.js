const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const baseUrl = "http://localhost:5173";

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)]
    })
  );
  return config;
}

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 15000,
    baseUrl,
    supportFile: false,
    specPattern: "**/*.feature",
    screenshotOnRunFailure: false,
    setupNodeEvents
  }
});