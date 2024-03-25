import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({command, mode, isSsrBuild, isPreview}) => {
  console.log({command, mode, isSsrBuild, isPreview})

    const defaultConfig = {
        plugins: [react(), svgr()],
    };


    return {
        ...defaultConfig

    };
});



