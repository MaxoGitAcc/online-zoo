import { defineConfig } from "vite";
import { resolve } from "path";
import { copyFileSync, mkdirSync, readdirSync } from "fs";

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
  plugins: [
    {
      name: "copy-assets",
      closeBundle() {
        // copy components
        mkdirSync("dist/assets/components", { recursive: true });
        copyFileSync(
          "assets/components/header.html",
          "dist/assets/components/header.html",
        );
        copyFileSync(
          "assets/components/footer.html",
          "dist/assets/components/footer.html",
        );

        mkdirSync("dist/assets/icons", { recursive: true });
        readdirSync("assets/icons").forEach((file) => {
          copyFileSync(`assets/icons/${file}`, `dist/assets/icons/${file}`);
        });

        const imagesDirs = [
          "animaCards",
          "smalss",
          "finalSection",
          "payAndFeed",
        ];
        imagesDirs.forEach((dir) => {
          mkdirSync(`dist/assets/images/${dir}`, { recursive: true });
          readdirSync(`assets/images/${dir}`).forEach((file) => {
            copyFileSync(
              `assets/images/${dir}/${file}`,
              `dist/assets/images/${dir}/${file}`,
            );
          });
        });

        readdirSync("assets/images").forEach((file) => {
          if (
            file.endsWith(".png") ||
            file.endsWith(".jpg") ||
            file.endsWith(".webp")
          ) {
            copyFileSync(`assets/images/${file}`, `dist/assets/images/${file}`);
          }
        });
      },
    },
  ],
});
