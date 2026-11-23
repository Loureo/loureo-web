import { resolve } from "node:path";
import { defineConfig } from "vite";

// Multi-page static site: the studio at /, each product under its own folder.
export default defineConfig({
  build: {
    target: "es2022",
    rollupOptions: {
      input: {
        studio: resolve(__dirname, "index.html"),
        almenara: resolve(__dirname, "almenara/index.html"),
      },
    },
  },
});
