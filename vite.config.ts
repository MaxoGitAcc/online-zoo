import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        landing: resolve(__dirname, "pages/landing/index.html"),
        map: resolve(__dirname, "pages/map/index.html"),
        zoos: resolve(__dirname, "pages/zoos/index.html"),
        contact: resolve(__dirname, "pages/contact/index.html"),
        signin: resolve(__dirname, "pages/signin/index.html"),
        register: resolve(__dirname, "pages/register/index.html"),
      },
    },
  },
});