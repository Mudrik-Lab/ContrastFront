import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import {resolve} from 'path';
 import fs from "node:fs/promises";

export default defineConfig(({command, mode, isSsrBuild, isPreview}) => {

    const defaultConfig = {
        plugins: [react(), svgr(),   {
                name: 'index-html-build-replacement',
                apply: 'serve' ,
                //   docs:
                //   https://vitejs.dev/guide/api-plugin.html#conditional-application
                   async transformIndexHtml(html) {
                    if (mode === 'contrast_prod') {
                         const htmlFile = await fs.readFile('./index-contrast.html', 'utf8')
                        return htmlFile;
                    }

                    return  html;
                }
            }
            ],
    };
    switch (mode) {
        case "contrast_prod":
            return {
                ...defaultConfig, build: {
                    rollupOptions: {
                        input: resolve(__dirname, './index-contrast.html'),
                    },
                    outDir: 'dist-contrast',
                },

            };

        case "uncontrast_prod":
            return {
                ...defaultConfig,
                build: {
                    rollupOptions: {
                        input: resolve(__dirname, './index-uncontrast.html'),

                    },
                    outDir: 'dist-uncontrast',

                },

            };

        default:
            return defaultConfig;
    }


});



