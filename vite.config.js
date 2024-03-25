import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import {resolve} from 'path';
import * as fs from 'fs:promises';

export default defineConfig(({command, mode, isSsrBuild, isPreview}) => {

    const defaultConfig = {
        plugins: [react(), svgr(),
            // Custom inline Vite plugin
            // Using Vite's transformIndexHtml() hook, for certain env flag, we overwrite index.html's content with another file.
            {
                name: 'index-html-build-replacement',
                // apply: 'build' // Only use apply if you need it only for that state. See docs: https://vitejs.dev/guide/api-plugin.html#conditional-application
                async transformIndexHtml(html) {
                    if (mode === 'contrast_prod') {
                        const htmlFile = await fs.readFile('./index-contrast.html', 'utf8')
                        console.log(htmlFile)
                        return htmlFile;
                    }
                    return  html;
                }
            }],
    };
    switch (mode) {
        case "contrast_prod":
            return {
                ...defaultConfig, build: {

                    rollupOptions: {

                        input: resolve(__dirname, './index-contrast.html'),
                    }, outDir: 'dist-contrast',
                },
                server: {
                    open: resolve(__dirname, './index2.html'),
                },

            };

        case "uncontrast_prod":
            return {
                ...defaultConfig,

                build: {
                    rollupOptions: {
                        input: resolve(__dirname, 'src/uncontrast/index-uncontrast.html'),

                    }, outDir: 'dist-uncontrast',

                },

            };

        default:
            return defaultConfig;
    }


});



