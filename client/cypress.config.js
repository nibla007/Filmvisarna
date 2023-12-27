import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";

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

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 25000,
    baseUrl,
    supportFile: false,
    specPattern: "**/*.feature",
    screenshotOnRunFailure: false,
    setupNodeEvents
  }
});