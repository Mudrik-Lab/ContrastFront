import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import {resolve} from 'path';

export default defineConfig(({command, mode, isSsrBuild, isPreview}) => {

    const defaultConfig = {
        plugins: [react(), svgr()],
    };
    switch (mode) {
        case "contrast_prod":
            return {
                ...defaultConfig,

                  build: {
                    rollupOptions: {

                        input: resolve(__dirname, 'src/contrast/index-contrast.html'),

                    }, outDir: 'dist-contrast',
                }, server: {
                    open: resolve(__dirname, 'src/contrast/index-contrast.html'),
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



