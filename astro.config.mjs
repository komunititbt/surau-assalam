import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://komunititbt.github.io",
  base: "/surau-assalam", // Ini memberitahu Astro bahawa website berada dalam sub-folder
  output: "static",
  build: {
    format: "directory",
  },
});
