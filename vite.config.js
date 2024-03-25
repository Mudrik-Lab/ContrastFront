import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import {resolve} from 'path';

const configs = {
  contrast: {
    entry: resolve(__dirname, "./src/contrast/main-contrast.jsx"),
    fileName: "main.js",
  },
  uncontrast: {
    entry: resolve(__dirname, "./src/uncontrast/main-uncontrast.jsx"),
    fileName: "main.js",
  },
};


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
});


