import { defineConfig } from "astro/config";

export default defineConfig({
  // GANTI dengan domain sebenar anda (tanpa / di hujung)
  // Jika belum ada domain, guna: site: "https://USERNAME.github.io", base: "/surau-assalam"
  site: "https://komunititbt.github.io",
  output: "static",
  build: {
    format: "directory",
  },
});