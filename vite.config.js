import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";
import fs from "node:fs/promises";
import { devServerHtmlScript } from "./scripts/dev-server-html-script.js";
import visualizer from "rollup-plugin-visualizer";

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const defaultConfig = {
    plugins: [
      react(),
      svgr(),
      visualizer(),
      {
        name: "index-html-build-replacement",
        apply: "serve", //   docs:
        //   https://vitejs.dev/guide/api-plugin.html#conditional-application
        async transformIndexHtml(html) {
          const tags = [];
          if (command === "serve") {
            //This is needed for dev server to run see documentation/dev-server-plugin-fix
            tags.push({
              tag: "script",
              attrs: { type: "module" },
              children: devServerHtmlScript,
              injectTo: "body-prepend",
            });
          }
          switch (mode) {
            case "contrast_dev": {
              const content = await fs.readFile(
                "./index-contrast.html",
                "utf8"
              );
              return { html: content, tags };
            }
            case "uncontrast_dev": {
              const content = await fs.readFile(
                "./index-uncontrast.html",
                "utf8"
              );
              return { html: content, tags };
            }
          }

          return html;
        },
      },
    ],
  };
  switch (mode) {
    case "contrast_dev":
    case "contrast_prod":
      return {
        ...defaultConfig,
        build: {
          rollupOptions: {
            output: {
              name: "index",
            },
            input: resolve(__dirname, "./index-contrast.html"),
          },
          outDir: "dist-contrast",
          name: "index",
        },
      };
    case "uncontrast_prod":
    case "uncontrast_dev":
      return {
        ...defaultConfig,
        build: {
          rollupOptions: {
            input: resolve(__dirname, "./index-uncontrast.html"),
          },
          outDir: "dist-uncontrast",
        },
      };

    default:
      return defaultConfig;
  }
});
