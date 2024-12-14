import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'ryyehx',
  e2e: {
    setupNodeEvents(on, config) {
      // Setup Node events for e2e testing (if any)
    },
    baseUrl: "http://localhost:8080/",
    // specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Define e2e test pattern if needed
  },

  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
    // specPattern: "cypress/component/**/*.{js,jsx,ts,tsx}", // Pattern for component tests
  },
});
