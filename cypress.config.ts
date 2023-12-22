import { defineConfig } from "cypress";

// intergrate to Github Actions: https://vercel.com/guides/how-can-i-use-github-actions-with-vercel
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
